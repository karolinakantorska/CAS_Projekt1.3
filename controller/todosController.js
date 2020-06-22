import { todoStore } from '../services/todoStore'
import { SecurityUtil } from '../utils/security'

export class TodosController {

    async getTodos(req, res) {
        res.json((await todoStore.all(SecurityUtil.currentUser(req)) || []))
    };
    async createTodo(req, res) {
        res.json(await todoStore.add(req.body.title, req.body.description, req.body.start, req.body.finish, req.body.importance, req.body.done, SecurityUtil.currentUser(req)));
    };

    async showTodo(req, res) {
        res.json(await todoStore.get(req.params.id, SecurityUtil.currentUser(req)));
    };

    async deleteTodo(req, res) {
        res.json(await todoStore.delete(req.params.id, SecurityUtil.currentUser(req)));
    };
}

export const todosController = new TodosController();