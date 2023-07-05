import express from 'express';
import cors from 'cors';
import http from 'http';
import {Server} from 'socket.io';
import dotenv from 'dotenv';
import stripe from 'stripe';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import imageRoutes from './routes/imageRoutes.js';

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const server = http.createServer(app);
require('./connection')

// Enable CORS middleware
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,');
  next();
});


// const User = require('./models/User.js');
// const userRoutes = require('./routes/userRoutes.js');
// const productRoutes = require('./routes/productRoutes.js');
// const orderRoutes = require('./routes/orderRoutes.js');
// const imageRoutes = require('./routes/imageRoutes.js');





app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/images', imageRoutes);


app.post('/create-payment', async(req, res)=> {
  const {amount} = req.body;
  console.log(amount);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card']
    });
    res.status(200).json(paymentIntent)
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e.message);
  }
})

// 

// Route
app.get ("/", (req, res) => {
  res.send("Welcome to the API Shawn");
});

// Starting the server
app.listen(process.env.PORT || 5000, () => {
  console.log(`App listening on port ${process.env.PORT || 5000}!`);
});

app.set('socketio', io);
