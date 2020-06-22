import express from 'express';
const router = express.Router();
import { todosController } from '../controller/todoesController';

router.get("/", todosController.getTodos.bind(todosController));
router.post("/", todosController.createPizza.bind(todosController));
router.get("/:id/", todosController.showTodos.bind(todosController));
router.delete("/:id/", todosController.deleteTodos.bind(todosController));

export const todoRoutes = router;