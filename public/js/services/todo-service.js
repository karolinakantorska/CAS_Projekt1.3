import { httpService } from './http-service.js'

class TodoService {
    async createPizza(pizzaName, description, start, finish, importance, done) {
        return await httpService.ajax("POST", "/todos/", { name: pizzaName, description, start, finish, importance, done });
    }

    async getTodos() {
        return await httpService.ajax("GET", "/todos/", undefined);
    }

    async getTodo(id) {
        return await httpService.ajax("GET", `/todos/${id}`, undefined);
    }

    async deleteTodo(id) {
        return await httpService.ajax("DELETE", `/todos/${id}`, undefined);
    }
}

export const todoService = new TodoService();