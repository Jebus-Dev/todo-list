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
    <div class="${ (todo.completado ? 'completed' : '' ) } todo-container" data-id="${ todo.id }">
            <span class="circle ${todo.category}"></span>
            <input id="check-toggle" class="check-toggle ${todo.category}" type="checkbox" ${ (todo.completado ? 'checked' : '' )}>
            <label>${ todo.tarea }</label>
            <i class="fa-regular fa-trash-can destroy"></i>      
    </div>
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
    } else if (nombreElemento.includes('i')) {
        todoList.deleteTodo( todoId );
        divTodoList.removeChild( todoElemento );
        funcTodosDone();
    }
})

btnDelDone.addEventListener('click', () => {
    todoList.deleteCompleted();
    funcTodosDone();
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