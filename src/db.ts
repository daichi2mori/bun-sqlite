import { Database } from "bun:sqlite";

const db = new Database("database.sqlite");

db.run(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false
  )
`);

export default db;
