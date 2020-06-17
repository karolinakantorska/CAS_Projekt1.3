import express from 'express';
const router = express.Router();
import {ordersController} from '../controller/ordersController';

router.get("/", ordersController.getOrders.bind(ordersController));
/*
async createPizza(req, res) {
    res.json(await orderStore.add(req.body.name, SecurityUtil.currentUser(req)));
};
*/
router.post("/", ordersController.createPizza.bind(ordersController));
router.get("/:id/", ordersController.showOrder.bind(ordersController));
router.delete("/:id/", ordersController.deleteOrder.bind(ordersController));

export const orderRoutes = router;