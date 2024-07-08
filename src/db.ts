import { Database } from "bun:sqlite";

const dbFileName = "todos";
const tableName = "database.sqlite";

// ファイルが存在しない場合、データベースを作成する
const db = new Database(tableName, { create: true });

const query = db.query(
  "CREATE TABLE IF NOT EXISTS " +
    dbFileName +
    " (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, completed BOOLEAN NOT NULL DEFAULT false"
);

query.run();

export default db;
