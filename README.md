Bun がネイティブで SQLite3 のドライバーに対応していたので試してみました。

Install:

```
bun install
```

Run:

```
bun run hello.ts
```

### Compile

Bun はスタンドアロンの実行ファイルを生成する機能があり、クロスプラットフォームにも対応しています。

生成される実行ファイルは Bun 側で現在実行中の環境から判定されます。

`--target`フラグを付けることで指定することもできます。

https://bun.sh/docs/bundler/executables

```
bun run build:compile
```
