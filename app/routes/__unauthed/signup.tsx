import { Gender } from '@prisma/client';
import type { ActionFunction, LoaderFunction, MetaFunction } from '@remix-run/server-runtime';
import { redirect } from '@remix-run/server-runtime';
import { createUser } from '~/data/users.server';
import SignUp from '~/modules/SignUp';
import { authenticate, userFromRequest } from '~/web/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await userFromRequest(request);

  // トップページにリダイレクト
  if (user) return redirect('/');

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const result = await createUser({
    email: form.get('email') as string,
    name: form.get('name') as string,
    password: form.get('password') as string,
    passwordConfirmation: form.get('passwordConfirmation') as string,
    gender: form.get('gender') as Gender,
    age: form.get('age') as unknown as number,
    allowSensitive: form.get('allowSensitive') as unknown as boolean,
  });

  if (result.errors) return result.errors;

  return authenticate(result.data);
};

export const meta: MetaFunction = () => ({
  title: 'GachaMe',
  description: 'GachaMeへようこそ!',
});

export default function SignUpPage() {
  return <SignUp />;
}
