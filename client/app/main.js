(function () {
  // Создать и вернуть форму для создания дела
  function createTodoItemForm() {
    const form = document.createElement("form");
    const formInner = document.createElement("div");
    const input = document.createElement("input");
    const submitButton = document.createElement("button");
    const clearButton = document.createElement("button");

    form.classList.add("w-full");
    formInner.classList.add(
      "flex",
      "items-center",
      "border-b",
      "border-blue-500",
      "py-2"
    );
    input.classList.add(
      "appearance-none",
      "bg-transparent",
      "border-none",
      "w-full",
      "text-gray-700",
      "mr-3",
      "py-1",
      "px-2",
      "leading-tight",
      "focus:outline-none"
    );
    input.placeholder = "What are you up to?";
    submitButton.classList.add(
      "flex-shrink-0",
      "bg-blue-500",
      "hover:bg-blue-700",
      "border-blue-500",
      "hover:border-blue-700",
      "text-md",
      "border-4",
      "text-white",
      "py-1",
      "px-2",
      "rounded"
    );
    submitButton.type = "submit";

    clearButton.classList.add(
      "flex-shrink-0",
      "border-transparent",
      "border-4",
      "text-red-500",
      "text-md",
      "py-1",
      "px-2",
      "rounded"
    );
    clearButton.type = "button";

    submitButton.textContent = "Confirm";
    clearButton.textContent = "Clear all";

    formInner.append(input, submitButton, clearButton);
    form.append(formInner);

    return {
      form,
      input,
      submitButton,
      clearButton,
    };
  }

  // Создать и вернуть список дел
  function createTodoList() {
    const list = document.createElement("ul");
    list.classList.add(
      "mt-5",
      "px-2",
      "bg-white/30",
      "backdrop-blur-3xl",
      "rounded"
    );
    return list;
  }

  // Создать и вернуть дело
  function createTodoItemElement(todoItem, { onDone, onDelete }) {
    const item = document.createElement("li");
    const itemInner = document.createElement("div");
    const itemContent = document.createElement("p");
    const doneButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    // Создать иконки
    const trashIconSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const trashIconPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );

    trashIconSvg.setAttribute("fill", "none");
    trashIconSvg.setAttribute("viewBox", "0 0 24 24");
    trashIconSvg.setAttribute("stroke", "currentColor");
    trashIconSvg.classList.add("post-icon");

    trashIconPath.setAttribute(
      "d",
      "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    );
    trashIconPath.setAttribute("stroke-linecap", "round");
    trashIconPath.setAttribute("stroke-width", "1.5");

    trashIconSvg.appendChild(trashIconPath);

    trashIconSvg.classList.add(
      "w-6",
      "h-6",
      "text-red-500",
      "hover:text-red-400"
    );

    const doneIconSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const doneIconPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );

    doneIconSvg.setAttribute("fill", "none");
    doneIconSvg.setAttribute("viewBox", "0 0 24 24");
    doneIconSvg.setAttribute("stroke", "currentColor");

    doneIconPath.setAttribute(
      "d",
      "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    );
    doneIconPath.setAttribute("stroke-linecap", "round");
    doneIconPath.setAttribute("stroke-width", "1.5");

    doneIconSvg.appendChild(doneIconPath);

    doneIconSvg.classList.add(
      "w-7",
      "h-7",
      "text-blue-500",
      "hover:text-blue-400"
    );

    // Повесить стили на элемент дела
    item.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "mb-4",
      "pb-4",
      "[&:not(:last-child)]:border-b"
    );
    itemInner.classList.add("w-full", "px-4");
    itemContent.classList.add("w-full", "px-6");

    if (todoItem.done) {
      itemContent.classList.add("line-through", "text-gray-500");

      doneIconSvg.setAttribute("fill", "currentColor");
      doneIconPath.setAttribute(
        "d",
        "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
      );
      doneIconSvg.setAttribute("stroke", "text-white");
      doneIconPath.setAttribute("stroke-width", "0.4");
    }

    itemContent.textContent = todoItem.name;

    doneButton.append(doneIconSvg);
    deleteButton.append(trashIconSvg);

    // Добавляем обработчики на кнопки
    doneButton.addEventListener("click", function () {
      onDone({ todoItem, element: item });
      item.classList.toggle(doneClass, todoItem.done);
    });

    deleteButton.addEventListener("click", function () {
      onDelete({ todoItem, element: item });
    });

    item.append(doneButton);
    item.append(itemContent);
    item.append(deleteButton);

    // Вернуть наружу
    return item;
  }

  // Создать и вернуть список тэгов
  function createTodoItemTags() { }

  async function createTodoApp(container) {
    const todoItemForm = createTodoItemForm();
    const todoList = createTodoList();
    const handlers = {
      onDone({ todoItem }) {
        todoItem.done = !todoItem.done;
        fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
          method: "PATCH",
          body: JSON.stringify({ done: todoItem.done }),
          headers: {
            "Content-type": "application/json",
          },
        });
      },
      onDelete({ todoItem, element }) {
        if (!confirm("Are you sure?")) {
          return;
        }
        element.remove();
        fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
          method: "DELETE",
        });
      },
    };

    // Отправляем запрос на список всех дел
    const response = await fetch(`http://localhost:3000/api/todos`);
    const todoItemList = await response.json();

    todoItemList.forEach((todoItem) => {
      const todoItemElement = createTodoItemElement(todoItem, handlers);
      todoList.append(todoItemElement);
    });

    container.append(todoItemForm.form);
    container.append(todoList);

    console.log(todoItemList);

    todoItemForm.form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Игнорировать создание пустого элемента
      if (!todoItemForm.input.value) {
        return;
      }

      const response = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        body: JSON.stringify({
          name: todoItemForm.input.value.trim(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const todoItem = await response.json();

      const todoItemElement = createTodoItemElement(todoItem);

      // Добавить новое дело
      todoList.append(todoItemElement);

      // Обнуляем значение поля ввода после добавления
      todoItemForm.input.value = "";
    });

    todoItemForm.clearButton.addEventListener("click", () => {
      if (!confirm("All your data will be deleted permanently.\nAre you sure you want to preceed?")) {
        return;
      }
      todoItemList.forEach(async todoItem => {
        await fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
          method: "DELETE"
        });
      });
    });
  }

  window.createTodoApp = createTodoApp;
})();


