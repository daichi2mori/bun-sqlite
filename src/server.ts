import { serve } from "bun";
import db from "./db";
import { join } from "path";
import { readFile } from "fs/promises";

const PORT = 3000;

const handleRequest = async (req: Request) => {
  const url = new URL(req.url);

  if (isGetMethod(req) && url.pathname === "/") {
    return serveStaticFile("../public/index.html", "text/html");
  }

  if (isGetMethod(req) && url.pathname === "/todos") {
    return getTodos();
  }

  if (isPostMethod(req) && url.pathname === "/todos") {
    return createTodo(req);
  }

  if (isPutMethod(req) && url.pathname.startsWith("/todos/")) {
    const id = getIdFromPath(url.pathname);
    return updateTodoStatus(req, id);
  }

  if (isDeleteMethod(req) && url.pathname.startsWith("/todos/")) {
    const id = getIdFromPath(url.pathname);
    return deleteTodo(id);
  }

  if (isGetMethod(req) && url.pathname === "/app.js") {
    return serveStaticFile("../public/app.js", "application/javascript");
  }

  return new Response("Not Found", { status: 404 });
};

serve({
  fetch: handleRequest,
  port: PORT,
});

console.log(`Server running on http://localhost:${PORT}`);

const serveStaticFile = async (filePath: string, contentType: string) => {
  const fullPath = join(__dirname, filePath);
  const content = await readFile(fullPath, "utf-8");
  return new Response(content, { headers: { "Content-Type": contentType } });
};

const getTodos = () => {
  const todos = db.query("SELECT * FROM todos").all();
  return new Response(JSON.stringify(todos), {
    headers: { "Content-Type": "application/json" },
  });
};

const createTodo = async (req: Request) => {
  const { title } = await req.json();
  db.run("INSERT INTO todos (title) VALUES (?)", [title]);
  return new Response("Todo created", { status: 201 });
};

const updateTodoStatus = async (req: Request, id: number) => {
  const { completed } = await req.json();
  db.run("UPDATE todos SET completed = ? WHERE id = ?", [completed, id]);
  return new Response("Todo updated", { status: 200 });
};

const deleteTodo = (id: number) => {
  db.run("DELETE FROM todos WHERE id = ?", [id]);
  return new Response("Todo deleted", { status: 200 });
};

const isGetMethod = (req: Request) => req.method === "GET";
const isPostMethod = (req: Request) => req.method === "POST";
const isPutMethod = (req: Request) => req.method === "PUT";
const isDeleteMethod = (req: Request) => req.method === "DELETE";
const getIdFromPath = (path: string) => parseInt(path.split("/").pop() || "", 10);
