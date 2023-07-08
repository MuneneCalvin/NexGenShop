import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import StripeCheckout from "react-stripe-checkout";
import { AiOutlineClose } from 'react-icons/ai';
import './cart.css'


const Cart = ({cart, setCart}) => {
    const [stripeToken, setStripeToken] = useState(null);

    const onToken = (token) => {
        setStripeToken(token);
    }


    // increase qty
    const incqty = (product) => 
    {
        const exsit = cart.find((x) => 
        {
            return x.id === product.id
        })
        setCart(cart.map((curElm) => 
        {
            return curElm.id === product.id ? {...exsit, qty: exsit.qty + 1} : curElm
        }))
    }

    // Dec Qty
    const decqty = (product) => 
    {
        const exsit = cart.find((x) => 
        {
            return x.id === product.id
        })
        setCart(cart.map((curElm) => 
        {
            return curElm.id === product.id ? {...exsit, qty: exsit.qty - 1} : curElm
        }))
    }
    //Remove cart product
    const removeproduct = (product) => 
    {
        const exsit = cart.find((x) => 
        {
            return x.id === product.id
        })
        if(exsit.qty > 0)
        {
            setCart(cart.filter((x) => 
            {
                return x.id !== product.id
            }))
        }
    }

    // Checout Btn
    const handleCheckout = () => {
        setCart([]);
    }

    // Total price
    const Totalprice = cart.reduce((price, item) => price + item.qty * item.Price, 0)

    return (
        <>
        <div className='cartcontainer'>
            {cart.length === 0 && 
            <div className='emptycart'>
            <h2 className='empty'>Cart is Empty</h2>
            <Link to='/product' className='emptycartbtn'>Shop Now</Link>
            </div>
            }
            <div className='contant'>
                {
                    cart.map((curElm) => 
                    {
                        return(
                            <div className='cart_item' key={curElm.id}>
                                <div className='img_box'>
                                    <img src={curElm.Img} alt={curElm.Title}></img>
                                </div>
                                <div className='detail'>
                                    <div className='info'>
                                    <h4>{curElm.Cat}</h4>
                                    <h3>{curElm.Title}</h3>
                                    <p>Price: ${curElm.Price}</p>
                                    <div className='qty'>
                                        <button className='incqty' onClick={() => incqty(curElm)}>+</button>
                                        <input type='text' value={curElm.qty}></input>
                                        <button className='decqty' onClick={() => decqty(curElm)}>-</button>
                                    </div>
                                    <h4 className='subtotal'>sub total: ${curElm.Price * curElm.qty}</h4>
                                    </div>
                                    <div className='close'>
                                    <button onClick={() => removeproduct(curElm)}><AiOutlineClose /></button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {
                cart.length > 0 &&
                <>
                <div className='stripe'>
                <StripeCheckout
                    stripeKey = 'pk_test_51NQcAxCacqDo7Bdys0wHNIUC1y4rfoLTOXFQWzvcBvGT2tyCSE2WUPtTsX6BsusQQqYCVjG8ggODF8igVfKKVyrk00SMkhmDnk'
                    token = {onToken}
                    billingAddress
                    shippingAddress
                    amount = {Totalprice * 100}
                    name = 'ShopFy'
                    image = 'https://i.ibb.co/0s3pdnc/Shop-Fy.png'
                >
                <h2 className='totalprice'>total: $ {Totalprice}</h2>
                <button className='checkout' onClick={handleCheckout}>Checkout</button>
                </StripeCheckout>
                </div>
                </>
            }
        </div>
        </>
    )
}

export default Cart