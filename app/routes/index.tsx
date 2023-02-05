// import { LoaderFunction, redirect } from '@remix-run/server-runtime';
import type { MetaFunction } from '@remix-run/server-runtime';
import HomeLayout from '~/components/layouts/HomeLayout';

import Index from '~/modules/Index';
// トップページにリダイレクト
//export const loader: LoaderFunction = async () => redirect('/');

export const meta: MetaFunction = () => ({
  title: 'GachaMe',
  description: 'GachaMeへようこそ!',
});

export default function IndexPage() {
  return (
    <HomeLayout>
      <Index />
    </HomeLayout>
  );
}
