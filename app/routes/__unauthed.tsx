import { Outlet } from '@remix-run/react';
import { LoaderFunction, redirect } from '@remix-run/server-runtime';
// import GlobalLayout from '~/components/layouts/GlobalLayout';
import LoggedOutLayout from '~/components/layouts/LoggedOutLayout';
import { userFromRequest } from '~/web/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await userFromRequest(request);

  // トップページにリダイレクト
  if (user) return redirect('/');

  return null;
};

export default function UnauthedLayout() {
  return (
    <LoggedOutLayout>
      <Outlet />
    </LoggedOutLayout>
  );
}
