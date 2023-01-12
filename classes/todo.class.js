export class Todo {
    
    static fromJson({id, tarea, completado, creado, category}) {
        const tempTodo = new Todo( tarea );

        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;
        tempTodo.category = category;
        return tempTodo;
    }
    
    constructor ( tarea, category ) {
        this.tarea  = tarea;
        this.id     = new Date().getTime();
        this.completado = false;
        this.creado = new Date();
        this.category = category;

    }
}

