import { application } from "express";
import { createOrder, getOrder, shipOrder, deleteOrder, deliverOrder, getOrder, getOrders } from "../Controllers/orderController.js";
import { registerUser, loginUser, getUsers, getUserOrders, updateNotifications } from "./userRoutes.js";

const NexGen = () => {

    // Orders
    app.route("/api/orders")
        .get(getOrders)
        .post(createOrder)
        .delete(deleteOrder);

    app.route("/api/orders/:id")
        .get(getOrder);

    app.route("/api/orders/:id/ship")
        .patch(shipOrder);

    app.route("/api/orders/:id/deliver")
        .patch(deliverOrder);

    // Auth
    app.route("/api/register")
        .post(registerUser);
    
    app.route("/api/login")
        .post(loginUser);

}

export default NexGen;