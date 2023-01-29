import { Game, GameConsumption, GameGenre, GameMaker } from "@prisma/client";
import prisma from "./utils/prisma.server";

// ゲーム情報

/** ゲーム情報作成
 * @param {string} userId - ユーザID
 * @param {string} gameParams - ゲーム情報
 * @return {Promise<Game>} ゲーム一覧
 */
export async function createGame(
  userId: string,
  gameParams: {
    title: string; // ゲームタイトル
    content: string; // ゲーム内容
    image: string; // ゲーム画像
    evaluation: number; // ゲーム評価
    interest: number; // ゲーム興味度
    price: number; // 値段
    character: string; // 推しキャラ
    characterImage: string; // 推しキャラ画像
    memo: string; // メモ
  }
): Promise<Game> {
  return prisma.game.create({
    data: { ...gameParams, user: { connect: { id: userId } } },
  });
}

/** ゲーム一覧取得
 * @param {string} userId - ユーザID
 * @return {Promise<Game[]>} ゲーム一覧
 */
export async function getGames(userId: string): Promise<Game[]> {
  if (!userId) return [];

  return prisma.game.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });
}

/** ゲーム削除
 * @param {string} userId - ユーザID
 * @param {string} id - ゲームID
 * @return {Promise<boolean>} 削除フラグ
 */
export async function deleteGame(userId: string, id: string): Promise<boolean> {
  return (
    (await prisma.game.deleteMany({ where: { id, userId: userId } })).count > 1
  );
}

// ゲームジャンル情報

/** ゲームジャンル情報作成
 * @param {string} gameId - ゲームID
 * @param {string} genre - ジャンル名
 * @return {Promise<GameGenre>} ゲームジャンル
 */
export async function createGameGenre(
  gameId: string,
  genre: string // ジャンルタイトル
): Promise<GameGenre> {
  return prisma.gameGenre.create({
    data: { genre, game: { connect: { id: gameId } } },
  });
}

/** ゲームジャンル一覧取得
 * @param {string} gameId - ユーザID
 * @return {Promise<GameGenre[]>} ゲームジャンル一覧
 */
export async function getGameGenres(gameId: string): Promise<GameGenre[]> {
  if (!gameId) return [];

  return prisma.gameGenre.findMany({
    where: { gameId },
    orderBy: { createdAt: "asc" },
  });
}

// ゲームメーカー情報

/** ゲームメーカー情報作成
 * @param {string} gameId - ゲームID
 * @param {string} maker - メーカー名
 * @param {string} image - メーカー画像
 * @return {Promise<GameMaker>} ゲームメーカー
 */
export async function createGameMaker(
  gameId: string,
  maker: string, // メーカー名
  image: string // メーカー画像
): Promise<GameMaker> {
  return prisma.gameMaker.create({
    data: { maker, image, game: { connect: { id: gameId } } },
  });
}

/** ゲームメーカー一覧取得
 * @param {string} gameId - ユーザID
 * @return {Promise<GameMaker[]>} ゲームメーカー一覧
 */
export async function getGameMakers(gameId: string): Promise<GameMaker[]> {
  if (!gameId) return [];

  return prisma.gameMaker.findMany({
    where: { gameId },
    orderBy: { createdAt: "asc" },
  });
}

// ゲーム消化情報

/** ゲーム消化情報作成
 * @param {string} gameId - ゲームID
 * @param {string} maker - メーカー名
 * @param {string} image - メーカー画像
 * @return {Promise<GameConsumption>} ゲーム消化情報
 */
export async function createGameConsumption(
  gameId: string,
  consumptionParams: {
    status: boolean; // 消化済みフラグ
    progress: number; // 進捗度
    fun: number; // 面白さ度
    recommend: number; // おすすめ度
    impression: string; // 感想
  }
): Promise<GameConsumption> {
  return prisma.gameConsumption.create({
    data: { ...consumptionParams, game: { connect: { id: gameId } } },
  });
}

/** ゲーム消化情報取得
 * @param {string} gameId - ユーザID
 * @return {Promise<GameConsumption[]>} ゲーム消化情報一覧
 */
export async function getGameConsumptions(
  gameId: string
): Promise<GameConsumption[]> {
  if (!gameId) return [];

  return prisma.gameConsumption.findMany({
    where: { gameId },
    orderBy: { createdAt: "asc" },
  });
}
