import { Todo, TodoList } from '../classes/index.js';
import { todoList} from '../main.js'


// Referencias en el Html
export const divTodoList = document.querySelector('.todo-list')
const todosDone = document.querySelector('#todos-done');
const txtInput = document.querySelector('#input-todo');
const btnDelDone = document.querySelector('.todo-delete');
const createButton = document.querySelector('#btnCreateTask');
const ulFilter = document.querySelector('.filters');
const category = document.querySelector('#filter-tag');
let categorySelected;

export const crearTodoHtml = ( todo ) => {
    const htmlTodo = `
    <li class="${ (todo.completado ? 'completed' : '' ) }" data-id="${ todo.id }">
            <span class="circle ${todo.category}"></span>
            <input id="check-toggle" class="check-toggle ${todo.category}" type="checkbox" ${ (todo.completado ? 'checked' : '' )}>
            <label>${ todo.tarea }</label>
            <button class="destroy"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash-off" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="3" y1="3" x2="21" y2="21"></line><path d="M4 7h3m4 0h9"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="14" x2="14" y2="17"></line><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l.077 -.923"></path><line x1="18.384" y1="14.373" x2="19" y2="7"></line><path d="M9 5v-1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path></svg></button>
    </li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;
}


export const funcTodosDone = () => {
    let todosFilter = todoList.todos.filter(done => done.completado)
    todosDone.innerText = `${todosFilter.length} todo's done`;
    return todosFilter.length;
}


// Eventos

category.addEventListener('change', () =>{
    const categoryTypes = ['house', 'personal', 'study', 'work', 'workout']
    categorySelected = categoryTypes[category.selectedIndex-1];
})

txtInput.addEventListener('keyup', (e) => {

    const task = txtInput.value.trim();
    if (e.keyCode === 13 && categorySelected === undefined) {
    alert('Selecciona una categoria');
    } else if ( e.keyCode === 13 && task.length > 0 ) {
        const nuevoTodo = new Todo(task, categorySelected)
        todoList.newTodo( nuevoTodo );
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
})

divTodoList.addEventListener('click', (e) => {

    const nombreElemento = e.target.localName;
    const todoElemento = e.target.parentElement;
    const todoId = todoElemento.getAttribute('data-id');
    if ( nombreElemento.includes('input') ) { 
        todoList.toggleTodo( todoId );
        todoElemento.classList.toggle('completed');
        funcTodosDone();
    } else if (nombreElemento.includes('button')) {
        todoList.deleteTodo( todoId );
        divTodoList.removeChild( todoElemento );
    }
})

btnDelDone.addEventListener('click', () => {
    todoList.deleteCompleted();
    const nombreElemento = e.target.localName;
    const todoElemento = e.target.parentElement;
    const todoId = todoElemento.getAttribute('data-id');
    if ( nombreElemento.includes('completed') ) { 
        funcTodosDone();
    }
})


createButton.addEventListener('click', () => {
    createContainer.style.display = "block";
    setTimeout(() => {
        createContainer.classList.add("is-visible");
    }, 1);
}) 


ulFilter.addEventListener('click', (e) => {
    const filter = e.target.text;
    if (!filter) { return; }

    for( const element of divTodoList.children ){
        element.classList.remove('hidden');
        const completed = element.classList.contains('completed');


        switch (filter) {
            case 'active':
                if (completed) {
                    element.classList.add('hidden');
                }
            break;
            case 'completed':
                if (!completed) {
                    element.classList.add('hidden');
                }
            default:
                break;
        }

    }
})