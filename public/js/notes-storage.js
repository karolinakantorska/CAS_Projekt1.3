/*
export class NotesStorage {
    constructor() {
        const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
        this.todoList = todoList;
        localStorage.setItem('todoList', JSON.stringify(this.todoList));
    }
    getTodoList() {
        return this.todoList;
    }
    addNewTask(newTask) {
        this.todoList.push(newTask);
        localStorage.setItem('todoList', JSON.stringify(this.todoList));
    }
    getNodeByID(id) {
        return this.todoList.filter((item) => (item.id === id) ? item : null);
    }
    deleteNodeByID(id) {
        this.todoList = this.todoList.filter((item) => !(item.id === id) ? item : null);
        localStorage.setItem('todoList', JSON.stringify(this.todoList));
    }
}
*/
