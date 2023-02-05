import { Outlet, useLoaderData } from '@remix-run/react';
import { DataFunctionArgs, SerializeFrom } from '@remix-run/server-runtime';
import LoggedInLayout from '~/components/layouts/LoggedInLayout';
import LoggedOutLayout from '~/components/layouts/LoggedOutLayout';
import Login from '~/modules/Login';
import { userFromRequest } from '~/web/auth.server';

export type AuthedRouteData = SerializeFrom<typeof loader>;

export const loader = async ({ request }: DataFunctionArgs) => {
  const user = await userFromRequest(request);

  return { user };
};

export default function AppPage() {
  const { user } = useLoaderData<AuthedRouteData>();

  if (!user)
    return (
      <LoggedOutLayout>
        <Login />
      </LoggedOutLayout>
    );

  return (
    <LoggedInLayout user={user}>
      <Outlet />
    </LoggedInLayout>
  );
}
