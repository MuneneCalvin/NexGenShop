import { Order } from '../models/orderModel.js';
import { User } from '../models/userModel.js';
import { route } from '../routes/orderRoutes.js';
import router from '../routes/userRoutes.js';

//creating an order
export const createOrder = async(req, res)=> {
    const io = req.app.get('socketio');
    const {userId, cart, country, address} = req.body;
    try {
        const user = await User.findById(userId);
        const order = await Order.create({owner: user._id, products: cart, country, address});
        order.count = cart.count;
        order.total = cart.total;
        await order.save();
        user.cart =  {total: 0, count: 0};
        user.orders.push(order);
        const notification = {status: 'unread', message: `New order from ${user.name}`, time: new Date()};
        io.sockets.emit('new-order', notification);
        user.markModified('orders');
        await user.save();
        res.status(200).json(user)
    } catch (e) {
        res.status(400).json(e.message)
    }
}

// getting all orders;
export const getOrders = async(req, res)=> {
    try {
        const orders = await Order.find().populate('owner', ['email', 'name']);
        res.status(200).json(orders);
    } catch (e) {
        res.status(400).json(e.message)
    }
}

//shipping order
export const shipOrder = async(req, res)=> {
    const io = req.app.get('socketio');
    const {ownerId} = req.body;
    const {id} = req.params;
    try {
        const user = await User.findById(ownerId);
        await Order.findByIdAndUpdate(id, {status: 'shipped'});
        const orders = await Order.find().populate('owner', ['email', 'name']);
        const notification = {status: 'unread', message: `Order ${id} shipped with success`, time: new Date()};
        io.sockets.emit("notification", notification, ownerId);
        user.notifications.push(notification);
        await user.save();
        res.status(200).json(orders)
    } catch (e) {
        res.status(400).json(e.message);
    }
}

//delivering order
export const deliverOrder = async(req, res)=> {
    const io = req.app.get('socketio');
    const {ownerId} = req.body;
    const {id} = req.params;
    try {
        const user = await User.findById(ownerId);
        await Order.findByIdAndUpdate(id, {status: 'delivered'});
        const orders = await Order.find().populate('owner', ['email', 'name']);
        const notification = {status: 'unread', message: `Order ${id} delivered with success`, time: new Date()};
        io.sockets.emit("notification", notification, ownerId);
        user.notifications.push(notification);
        await user.save();
        res.status(200).json(orders)
    } catch (e) {
        res.status(400).json(e.message);
    }
}

// deleting order
export const deleteOrder = async(req, res)=> {
    const {id} = req.params;
    try {
        const order = await Order.findByIdAndDelete(id);
        res.status(200).json(order);
    } catch (e) {
        res.status(400).json(e.message);
    }
}

// getting single order
export const getOrder = async(req, res)=> {
    const {id} = req.params;
    try {
        const order = await Order.findById(id).populate('owner', ['email', 'name']);
        res.status(200).json(order);
    } catch (e) {
        res.status(400).json(e.message);
    }
}

export default router;