import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './cart.css'
const Cart = ({cart, setCart}) => {
    // increace qty
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
            <h2 className='totalprice'>total: $ {Totalprice}</h2>
            <button className='checkout'>Checkout</button>
            </>
        }
    </div>
    </>
  )
}

export default Cart