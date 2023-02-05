# GachaMe

積みゲーって何からやるか迷いますよね。  
そこでガチャのようにランダムに排出して消化するゲームを出せたらという発想から作られたサービスです。  
語源は `gacha + game` でGachaMeです。

- [Remix Docs](https://remix.run/docs)

## 開発環境

- pnpm
- Remix
- React
- TailWind, daisyUI
- Prisma
- Docker
- Playwright

## クイックスタート

git cloneをする

```bash
git clone https://github.com/RimlTempest/GachaMe.git
```

### 開発環境

pnpmで依存パッケージを落とす

```bash
pnpm i
```

dockerでpostgres環境を立ち上げる

```bash
docker compose up -d
```

1. マイグレーションファイル（Create table）生成 / テーブルの構成変えた際に実行

```bash
pnpm prisma migrate dev --name init
```

1. Prismaのオブジェクト作成

```bash
pnpm db:generate
```

1. マイグレーションリセット

```bash
pnpm pnpm db:reset
```

ローカルで立ち上げ実行

```bash
pnpm run dev
```

[http://localhost:3000](http://localhost:3000) にて立ち上がるので開いて確認してみてください。

### 補足コマンド

prisma studioを立ち上げる

```bash
pnpm prisma studio
```

#### vercel Deploy

まず当サービスはクラウドサービス等を使うほど大きなサービスではない + 無料で完結したいためVercelに上げることを前提として作成されています。  
サービスが大きくなったり、クラウドサービスを利用する価値が出てきたら移行する想定です。

[Vercel CLI](https://vercel.com/cli) で提供されている `vercel dev` コマンドを使うことに慣れている場合は、そちらを使うこともできます。

1. `create-remix` コマンドを実行し、デプロイ先として "Vercel" を選択
2. Gitリポジトリを `Vercel` に [import](https://vercel.com/new) するだけで、デプロイされます。

Gitリポジトリを使用しない場合は、[Vercel CLI](https://vercel.com/cli) を実行して、ディレクトリをデプロイすることも可能です。

Vercel CLIを利用したい場合は環境をローカルに導入しましょう

```bash
npm install --global vercel
vercel
```

Vercelの [Git Integration](https://vercel.com/docs/concepts/git) により、将来のコミットが自動的にデプロイされるため、一般的にはGitリポジトリを使用することが推奨されています。

## Testing

テスト環境として `playwright` と `react-testing-library` ユーティリティがセットアップされています。  

E2Eテストを行う際は `.env.test` ファイルの設定を使用し、異なるデータベースと異なる開発サーバーポートを使用します。
テストを実行するたびに、データベースを削除してリセットするので、毎回、不具合のないテストができるようになります。

初回にテストを実行する際は以下のコマンドを実行してください。

- `npx playwright install`
- `npx playwright install-deps`

成功したらテストを実行します。

```bash
pnpm run dev test
```
