document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const titleInput = document.getElementById("todo-title");
  const todoList = document.getElementById("todo-list");

  form.addEventListener("submit", handleFormSubmit);
  todoList.addEventListener("click", handleTodoListClick);

  async function handleFormSubmit(e) {
    e.preventDefault();
    const title = titleInput.value.trim();
    if (title) {
      const res = await fetch("/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (res.ok) {
        loadTodos();
        titleInput.value = "";
      }
    }
  }

  async function handleTodoListClick(e) {
    const target = e.target;
    const id = target.dataset.id;
    if (target.tagName === "BUTTON") {
      await deleteTodoItem(id);
    } else if (target.tagName === "INPUT") {
      await updateTodoItem(id, target.checked);
    }
    loadTodos();
  }

  async function deleteTodoItem(id) {
    const res = await fetch(`/todos/${id}`, { method: "DELETE" });
    return res.ok;
  }

  async function updateTodoItem(id, completed) {
    const res = await fetch(`/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    return res.ok;
  }

  async function loadTodos() {
    const res = await fetch("/todos");
    const todos = await res.json();
    renderTodoList(todos);
  }

  function renderTodoList(todos) {
    todoList.innerHTML = "";
    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <input type="checkbox" data-id="${todo.id}" ${todo.completed ? "checked" : ""}>
        ${todo.title}
        <button data-id="${todo.id}">Delete</button>
      `;
      todoList.appendChild(li);
    });
  }

  loadTodos();
});
