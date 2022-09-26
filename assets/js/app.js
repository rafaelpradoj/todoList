const formAddTodo = document.querySelector('.form-add-todo')
const inputSearchTodo = document.querySelector('.form-search input')
const todosContainer = document.querySelector('.todos-container')

const addTodo = inputValue => {
  if (inputValue.length) {
    todosContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center" data-todo="${inputValue}">
      <span>${inputValue}</span>
      <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
    </li>
    `

    event.target.reset()
  }
}
const removeTodo = clickedElement => {
  const trashDataValue = clickedElement.dataset.trash
  const todo = document.querySelector(`[data-todo="${trashDataValue}"]`)

  if (trashDataValue) {
    todo.remove()
  }
}
const filterTodos = (todos, inputValue, returnMatchedTodos) => {
  return todos
    .filter(todo => {
      const matchedTodos = todo.textContent.toLowerCase().includes(inputValue)
      return returnMatchedTodos ? matchedTodos : !matchedTodos
    })
}
const manipuLateTodoClasses = (todos, classToRemove, classToAdd) => {
  todos.forEach(todo => {
    todo.classList.remove(classToRemove)
    todo.classList.add(classToAdd)
  })
}
const hideTodos = (todos, inputValue) => {
  const todoList = filterTodos(todos, inputValue, false)

  manipuLateTodoClasses(todoList, 'd-flex', 'd-none')
}
const showTodos = (todos, inputValue) => {
  const todoList = filterTodos(todos, inputValue, true)

  manipuLateTodoClasses(todoList, 'd-none', 'd-flex')
}

formAddTodo.addEventListener('submit', event => {
  event.preventDefault()
  const inputValue = event.target.add.value.trim()

  addTodo(inputValue)
})
todosContainer.addEventListener('click', event => {
  const clickedElement = event.target

  removeTodo(clickedElement)
})
inputSearchTodo.addEventListener('input', event => {
  const inputValue = event.target.value.toLowerCase().trim()
  const todos = Array.from(todosContainer.children)

  hideTodos(todos, inputValue)
  showTodos(todos, inputValue)
})