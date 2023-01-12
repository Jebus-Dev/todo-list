import { Todo, TodoList} from './classes/index.js';
import { crearTodoHtml } from './js/events.js';

export const todoList = new TodoList();

todoList.todos.forEach( crearTodoHtml );

console.log(todoList.todos)