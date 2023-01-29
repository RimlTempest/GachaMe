import { User } from "@prisma/client";
import { InferType, object, string } from "yup";
import { encryptPassword, verifyPassword } from "./passwordUtils.server";
import prisma from "./utils/prisma.server";
import { DataResult } from "./utils/types";
import errorsFromSchema from "./validate.server";

const createUserParams = object({
  email: string().email().required(),
  name: string().required(),
  password: string().required(),
  passwordConfirmation: string().required(),
});

export type CreateUserParams = InferType<typeof createUserParams>;

/** email からユーザを検索する、存在しなければnullを返す
 * @param {string}  email - メールアドレス
 * @return {Promise<Omit<User, "password"> | null>} パスワードを除いたユーザ情報
 */
export async function findUserByEmail(
  email: string
): Promise<Omit<User, "password"> | null> {
  const user = await prisma.user.findUnique({ where: { email } });

  if (user) user.password = "";

  return user;
}

/** ユーザの作成
 * @param {string} email - メールアドレス
 * @param {string} name - 名前
 * @param {string} password - パスワード
 * @param {string} passwordConfirmation - パスワード再確認用
 * @return {Promise<DataResult<Omit<User, "password">>>} ユーザ情報
 */
export async function createUser({
  email,
  name,
  password,
  passwordConfirmation,
}: CreateUserParams): Promise<DataResult<Omit<User, "password">>> {
  const errors = errorsFromSchema(createUserParams, {
    email,
    name,
    password,
    passwordConfirmation,
  });

  if (errors) return { errors };

  if (password !== passwordConfirmation) {
    return {
      errors: { passwordConfirmation: "パスワードが違います。" },
    };
  }

  if (await findUserByEmail(email)) {
    return {
      errors: { email: "登録済みのユーザです。" },
    };
  }

  const encryptedPassword = await encryptPassword(password);
  const user = await prisma.user.create({
    data: { email, name, password: encryptedPassword },
  });

  user.password = "";

  return { data: user };
}

// ユーザ情報の更新用オブジェクト
const updateUserParams = object({
  email: string().email(),
  name: string(),
  currentPassword: string().required(),
  newPassword: string(),
  passwordConfirmation: string(),
});

export type UpdateUserParams = InferType<typeof updateUserParams>;

/** ユーザ情報の更新
 * @param {User} user - ユーザ情報
 * @param {string} email - メールアドレス
 * @param {string} name - 名前
 * @param {string} currentPassword - 現在のパスワード
 * @param {string} newPassword - 新規のパスワード
 * @param {string} passwordConfirmation - パスワード再確認用
 * @return {Promise<DataResult<Omit<User, "password">>>} ユーザ情報
 */
export async function updateUser(
  user: User,
  {
    email,
    name,
    currentPassword,
    newPassword,
    passwordConfirmation,
  }: UpdateUserParams
): Promise<DataResult<Omit<User, "password">>> {
  if (newPassword !== passwordConfirmation) {
    return { errors: { passwordConfirmation: "パスワードが違います。" } };
  }

  const errors = errorsFromSchema(updateUserParams, {
    email,
    name,
    currentPassword,
    newPassword,
  });

  if (errors) return { errors };

  if (!(await verifyPassword(user.password, currentPassword))) {
    return { errors: { currentPassword: "パスワードが違います。" } };
  }

  const encryptedPassword = newPassword
    ? await encryptPassword(newPassword)
    : undefined;
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { email, name, password: encryptedPassword },
  });

  if (updatedUser) updatedUser.password = "";

  return { data: updatedUser };
}

/** ユーザ情報の削除
 * @param {User} user - ユーザ情報
 * @return {Promise<Omit<User, "password">>} ユーザ情報
 */
export async function deleteUser(user: User): Promise<Omit<User, "password">> {
  const [_, deletedUser] = await prisma.$transaction([
    prisma.game.deleteMany({ where: { userId: user.id } }),
    prisma.user.delete({ where: { id: user.id } }),
  ]);

  if (deletedUser) deletedUser.password = "";

  return deletedUser;
}
