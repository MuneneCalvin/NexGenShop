import Product from "../models/Product";
import User from "../models/User";


// create product
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, images: pictures } = req.body;
        const product = await Product.create({ name, description, price, category, pictures });
        const products = await Product.find();
        res.status(201).json(products);
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// get products
export const getProducts = async (req, res) => {
    try {
        const sort = { _id: -1 };
        const products = await Product.find().sort(sort);
        res.status(200).json(products);
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// Get a product
export const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// update product
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const { name, description, price, category, images: pictures } = req.body;
        const product = await Product.findByIdAndUpdate(id, { name, description, price, category, pictures });
        const products = await Product.find();
        res.status(200).json(products);
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// delete product
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;
    try {
        const user = await User.findById(user_id);
        if (!user.isAdmin) return res.status(401).json("You don't have permission");
        await Product.findByIdAndDelete(id);
        const products = await Product.find();
        res.status(200).json(products);
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// get products by category
export const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const product = await Product.find({ category });
        const similar = await Product.find({ category: product.category}).limit(5);
        res.status(200).json({ product, similar });
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// get products by search
export const getProductsBySearch = async (req, res) => {
const { category } = req.params;
try {
    let products;
    const sort = { '_id': -1 }
    if (category == "all") {
        products = await Product.find().sort(sort);
    } else {
        products = await Product.find({ category }).sort(sort);
    }
    res.status(200).json(products);
} catch (e) {
    res.status(400).send(e.message);
}
}

// get products by filter
export const getProductsByFilter = async (req, res) => {
const { category, price, rating } = req.params;
try {
    let products;
    const sort = { '_id': -1 }
    if (category == "all") {
        products = await Product.find().sort(sort);
    } else {
        products = await Product.find({ category }).sort(sort);
    }
    if (price !== "all") {
        products = products.filter(product => product.price <= Number(price));
    }
    if (rating !== "all") {
        products = products.filter(product => product.rating >= Number(rating));
    }
    res.status(200).json(products);
}
catch (e) {
    res.status(400).send(e.message);
}
}

// Cart Routes
export const addToCart = async (req, res) => {
    const { userId, productId, price } = req.body;
    try {
        const user = await User.findById(userId);
        const userCart = user.cart;
        if (user.cart [productId]) {
            usercart[productId].quantity += 1;
        } else {
            usercart[productId] = {
                quantity: 1,
                price
            }
        }
        userCart.count += 1;
        userCart.total = Number (userCart.total) + Number(price);
        user.cart = userCart;
        user.markModified('cart');
        await user.save();
        res.status(200).json(user);
    } catch (e) {
        res.status(400).send(e.message)
    }
}

// Increasing a cart