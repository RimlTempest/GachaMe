import { RemixServer } from '@remix-run/react';
import type { EntryContext, HandleDataRequestFunction } from '@remix-run/node';
import { renderToString } from 'react-dom/server';
import { getServerEnvVar } from './lib/env.server';

if (!getServerEnvVar('SECRET_KEY_BASE')) {
  throw new Error('Please provide a SECRET_KEY_BASE env var!');
}

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const markup = renderToString(<RemixServer context={remixContext} url={request.url} />);

  responseHeaders.set('Content-Type', 'text/html');

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}

export const handleDataRequest: HandleDataRequestFunction = (
  response: Response,
  // same args that get passed to the action or loader that was called
  { request, params, context },
) => {
  response.headers.set('x-custom', 'yay!');
  return response;
};
