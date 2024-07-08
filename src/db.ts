import { Database } from "bun:sqlite";

const dbFileName = "database.sqlite";
const tableName = "todos";

// ファイルが存在しない場合、データベースを作成する
const db = new Database(dbFileName, { create: true });

const query = db.query(
  `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, completed BOOLEAN NOT NULL DEFAULT false`
);

query.run();

export default db;
