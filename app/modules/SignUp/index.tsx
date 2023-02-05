import classNames from 'classnames';
import { Form, Link, useActionData, useTransition } from '@remix-run/react';
import FullInput from '~/components/FullInput';

export default function SignUp() {
  const errors = useActionData() || {};
  const { state, submission } = useTransition();
  const isLoading = (state === 'submitting' || state === 'loading') && !!submission;

  return (
    <div className="max-w-lg w-full mx-auto h-full flex items-center justify-center">
      <Form
        method="post"
        action="/signup"
        className="p-10 card bg-base-200 w-full flex flex-col space-y-4"
      >
        <h1 className="text-xl text-center">Please sign up</h1>

        <FullInput
          label="メールアドレス"
          name="email"
          type="text"
          required
          placeholder="gachame@mail.com"
          errors={errors}
        />

        <FullInput
          label="名前"
          name="name"
          type="text"
          required
          placeholder="ガチャミーくん"
          errors={errors}
        />

        <FullInput
          label="年齢"
          name="age"
          type="number"
          required
          placeholder="20"
          errors={errors}
        />

        <article className="flex align-middle">
          <FullInput
            className="mr-5"
            label="男性"
            name="gender"
            type="radio"
            required
            value={0}
            errors={errors}
          />

          <FullInput
            className="mr-5"
            label="女性"
            name="gender"
            type="radio"
            required
            value={1}
            errors={errors}
          />

          <FullInput
            label="秘密"
            name="gender"
            type="radio"
            required
            defaultChecked
            value={2}
            errors={errors}
          />
        </article>

        <FullInput
          label="パスワード"
          name="password"
          type="password"
          placeholder="**************"
          required
          errors={errors}
        />

        <FullInput
          label="パスワード確認用"
          name="passwordConfirmation"
          type="password"
          placeholder="**************"
          required
          errors={errors}
          className="pb-4"
        />

        <button
          type="submit"
          className={classNames('btn btn-primary mt-8', {
            loading: isLoading,
          })}
          disabled={isLoading}
        >
          {!isLoading && '新規登録'}
        </button>

        <Link to="/login" className="link text-center">
          Or login instead
        </Link>
      </Form>
    </div>
  );
}
