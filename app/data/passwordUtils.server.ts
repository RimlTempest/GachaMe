import argon from "argon2";

/** パスワードを暗号化
 * @param {string} password - パスワード
 * @return {Promise<string>} 暗号化済みのパスワード
 */
export async function encryptPassword(password: string): Promise<string> {
  return argon.hash(password);
}

/** パスワードを検証
 * @param {string} hash - 暗号化済みのパスワード
 * @param {string} password - パスワード
 * @return {Promise<string>} パスワードが一致するか
 */
export async function verifyPassword(
  hash: string,
  password: string
): Promise<boolean> {
  return argon.verify(hash, password);
}
