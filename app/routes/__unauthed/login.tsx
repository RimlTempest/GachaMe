import type { ActionFunction, LoaderFunction, MetaFunction } from '@remix-run/server-runtime';
import { redirect } from '@remix-run/server-runtime';
import { login, LoginParams } from '~/data/auth.server';
import Login from '~/modules/Login';
import { authenticate, userFromRequest } from '~/web/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await userFromRequest(request);

  // トップページにリダイレクト
  if (user) return redirect('/');

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = Object.fromEntries(await request.formData());
  const result = await login(form as LoginParams);

  if (result.errors) return { errors: result.errors, original: form };

  return authenticate(result.data, form.redirectUrl as string);
};

export const meta: MetaFunction = () => ({
  title: 'GachaMe',
  description: 'GachaMeへようこそ!',
});

export default function LoginPage() {
  return <Login />;
}
