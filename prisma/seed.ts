import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const gachame = await prisma.user.upsert({
    where: { email: "gachame@prisma.io" },
    update: {},
    create: {
      email: "gachame@prisma.io",
      name: "Test",
      password: "test",
      age: 20,
      gender: "MALE",
      // プロフィール作成
      Profile: {
        create: {
          nickName: "Gachame",
          selfIntroduction: "自己紹介",
          image: "https://avatars.githubusercontent.com/u/38300385?s=120&v=4",
        },
      },
      Games: {
        create: [
          // 未消化ゲーム情報
          {
            title: "ファイナルファンタジーX/X-2 HD Remaster",
            description:
              "大都市ザナルカンドでブリッツボールの選手として活躍していたティーダは、ある夜、街を襲う巨大な魔物「シン」に運ばれ、見知らぬ地へと辿り着く。そこは「シン」が死と破壊をまき散らす、スピラという世界だった。彼はそこで召喚士になったばかりの少女ユウナと出会う。「シン」を倒せる唯一の存在である召喚士は、スピラの人々の希望の光。ユウナもまたその期待を一身に背負い、「シン」を倒すための旅に出ようとしていた。スピラのことを何も知らぬまま、もとの世界に帰る方法を探すため、聖地ザナルカンドを目指す旅に同行するティーダ。そこではいくつもの切ない真実が、彼を待ち受けていた──。",
            image:
              "https://topics-cdn.nintendo.co.jp/image/2019/08/22040810701271/800/00001534_820_461.jpg",
            evaluation: 5,
            interest: 5,
            price: 8000,
            character: "ワッカ",
            characterImage:
              "https://img.cdn.nimg.jp/s/nicovideo/thumbnails/38809066/38809066.76342411.original/r1280x720l?key=27e7f1664bc89d6a49e266ed71d920d6e106413dc5bed071768f66e438dbfc18",
            memo: "ワッカが名言量産マシーンなイメージ",
            platform: "PS4",
            // ゲームのジャンル
            GameGenre: {
              create: {
                genre: "JRPG",
              },
            },
            // メーカー情報
            GameMaker: {
              create: {
                maker: "スクエニ",
                developer: "スクエア",
                publisher: "スクウェア・エニックス",
                image:
                  "https://www.jp.square-enix.com/common/images/fb_icon_sqex.jpg",
              },
            },
          },
          // 消化済みゲーム情報
          {
            title: "ゲーム1",
            description: "説明1",
            image: "https://avatars.githubusercontent.com/u/38300385?s=120&v=4",
            evaluation: 3,
            interest: 5,
            price: 8000,
            character: "キャラクター1",
            characterImage:
              "https://avatars.githubusercontent.com/u/38300385?s=120&v=4",
            memo: "ここが面白いらしい",
            platform: "PC",
            // ゲームのジャンル
            GameGenre: {
              create: {
                genre: "RPG",
              },
            },
            // メーカー情報
            GameMaker: {
              create: {
                maker: "test",
                developer: "test",
                publisher: "test",
                image:
                  "https://avatars.githubusercontent.com/u/38300385?s=120&v=4",
              },
            },
            // 消化情報
            GameConsumption: {
              create: {
                progress: 3,
                fun: 5,
                recommend: 5,
              },
            },
          },
        ],
      },
    },
  });
  console.log({ gachame });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
