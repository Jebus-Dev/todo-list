import { Todo, TodoList} from './classes/index.js';
import { crearTodoHtml, funcTodosDone } from './js/events.js';

export const todoList = new TodoList();

todoList.todos.forEach( crearTodoHtml );
funcTodosDone();