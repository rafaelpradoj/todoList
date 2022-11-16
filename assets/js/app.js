const formAddTodo = document.querySelector('.form-add-todo')
const inputSearchTodo = document.querySelector('.form-search input')
const todosContainer = document.querySelector('.todos-container')

const addTodo = event => {
  event.preventDefault()
  const inputValue = event.target.add.value.trim()

  if (!inputValue.length) {
    return
  }

  todosContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center" data-todo="${inputValue}">
      <span>${inputValue}</span>
      <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
    </li>
    `

  event.target.reset()
}
const removeTodo = event => {
  const trashWasClicked = event.target.dataset.trash
  const todo = document.querySelector(`[data-todo="${trashWasClicked}"]`)

  if (!trashWasClicked) {
    return
  }

  todo.remove()
}
const searchTodo = event => {
  const inputValue = event.target.value.trim().toLowerCase()
  const todos = Array.from(todosContainer.children).map(todo => ({
    todo,
    shouldBeVisible: todo.textContent.toLowerCase().includes(inputValue)
  }))

  todos.forEach(({ todo, shouldBeVisible }) => {
    todo.classList.add(shouldBeVisible ? 'd-flex' : 'd-none')
    todo.classList.remove(shouldBeVisible ? 'd-none' : 'd-flex')
  })
}

formAddTodo.addEventListener('submit', addTodo)
todosContainer.addEventListener('click', removeTodo)
inputSearchTodo.addEventListener('input', searchTodo)

