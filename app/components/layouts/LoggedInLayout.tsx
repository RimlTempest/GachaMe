import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Form, NavLink } from '@remix-run/react';
import { ReactNode } from 'react';
import { UserProvider } from '~/hooks/useUser';
import { AuthedRouteData } from '~/routes/__authed';

export default function LoggedInLayout({
  user,
  children,
}: {
  user: AuthedRouteData['user'];
  children: ReactNode;
}) {
  const [animationParent] = useAutoAnimate<HTMLDivElement>();

  return (
    <UserProvider user={user}>
      <div className="flex flex-col h-screen w-full">
        <nav className="max-w-6xl mx-auto flex w-full justify-between shrink-0 py-8">
          <p>Welcome, {user.name}!</p>

          <ul className="flex flex-row space-x-4 items-center">
            <li>
              <NavLink to="/games" prefetch="intent">
                Games
              </NavLink>
            </li>

            <li>
              <NavLink to="/profile" prefetch="intent">
                Profile
              </NavLink>
            </li>

            <li>
              <Form method="post" action="/logout">
                <button type="submit" className="btn btn-secondary">
                  Logout
                </button>
              </Form>
            </li>
          </ul>
        </nav>

        <div className="contents" ref={animationParent}>
          {children}
        </div>
      </div>
    </UserProvider>
  );
}
