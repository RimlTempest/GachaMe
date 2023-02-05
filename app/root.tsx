import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useMatches,
} from '@remix-run/react';
import { DataFunctionArgs } from '@remix-run/server-runtime';
import acceptLanguage from 'accept-language-parser';
import React from 'react';
import GlobalLayout from './components/layouts/GlobalLayout';
import { ToastsRenderer } from './hooks/useToast';
import { CLIENT_ENV_VARS } from './lib/env.server';
import styles from './styles/index.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

// Load the locale from the Accept-Language header to later
// inject it on the app's context
function localeFromRequest(request: Request): string {
  const languages = acceptLanguage.parse(request.headers.get('Accept-Language') as string);

  // If somehow the header is empty, return a default locale
  if (languages?.length < 1) return 'en-us';

  // If there is no region for this locale, just return the country code
  if (!languages[0].region) return languages[0].code;

  return `${languages[0].code}-${languages[0].region.toLowerCase()}`;
}

export const loader = async ({ request }: DataFunctionArgs) => {
  return { locale: localeFromRequest(request), ENV: CLIENT_ENV_VARS };
};

export type RootLoaderType = Awaited<ReturnType<typeof loader>>;

export function useRootLoaderData(): RootLoaderType {
  return useMatches()[0].data as RootLoaderType;
}

export default function App() {
  const { ENV } = useLoaderData();

  return (
    <Document>
      <script
        // Set the variables for our `envVars` modules
        dangerouslySetInnerHTML={{
          __html: `window.ENV = ${JSON.stringify(ENV)}`,
        }}
      />

      <GlobalLayout>
        <Outlet />
      </GlobalLayout>
      <ToastsRenderer />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  // This is where you would log server side errors to your error handling tool
  console.error('Error', error);

  return (
    <Document title="Error!">
      <GlobalLayout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>Hey, developer, you should replace this with what you want your users to see.</p>
        </div>
      </GlobalLayout>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = <p>Oops! Looks like you tried to visit a page that you do not have access to.</p>;
      break;
    case 404:
      message = <p>Oops! Looks like you tried to visit a page that does not exist.</p>;
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <GlobalLayout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </GlobalLayout>
    </Document>
  );
}

function Document({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <React.StrictMode>
      <html className="bg-base-100" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          {title ? <title>{title}</title> : null}
          <Meta />
          <Links />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </React.StrictMode>
  );
}
