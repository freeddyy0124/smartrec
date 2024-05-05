import React from 'react'
import './HeaderNew.css'
import { toast } from 'react-toastify';

function Cart() {
    // title: product.title,
    //                             price: product.price,
    //                             quantity: quantity,
    //                             image: currentImage
    let currentCart = localStorage.getItem('smartrecs_cart') ? JSON.parse(localStorage.getItem('smartrecs_cart')) : {};
  return (
    <div className='cart' style={{width:"100%", display:"flex", flexDirection:"column"}}>
        {
            Object.keys(currentCart).length === 0 ? <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"90px", fontSize:"11px", color:"#000"}}>Add items to your cart to view here</div> : <div>
                {
                    Object.keys(currentCart).map((key) => {
                        return (
                            <div style={{display:"flex", flexDirection:"row",  borderBottom:"1px solid #00000020", color:"#000", alignItems:"center"}}>
                                <img src={currentCart[key].image} alt={currentCart[key].name} style={{width:"100px", borderRadius:"10px", margin:"0 12px", objectFit:"contain"}}/>
                                <div style={{display:"flex", flexDirection:"column", flex:"1", fontSize:"12px"}}>
                                    <div style={{marginTop:"8px", fontSize:"13px", fontWeight:"600", lineHeight:"18px"}}>{currentCart[key].title.slice(0,50)} { currentCart[key].title.length > 50 ? "...":""}</div>
                                    <div style={{fontSize:"13px", margin:"8px 0"}}>${currentCart[key].price} X <span style={{color:"rgba(0,0,0,0.6)", margin:"0 5px"}}>{currentCart[key].quantity} </span>No.</div>
                                </div>
                                <div style={{display:"flex", flexDirection:"column", fontSize:"12px", margin:"0 12px"}}>
                                    <div style={{marginTop:"8px", fontWeight:"600"}}>Subtotal</div>
                                    <div style={{fontSize:"13px", margin:"8px 0"}}>${currentCart[key].price * currentCart[key].quantity}</div>
                                </div>
                            </div>
                        )
                    })
                }
                <div onClick={()=>{
                    toast.success("Feature coming soon")
                    toast.success("Cart has been cleared")
                    localStorage.removeItem('smartrecs_cart')
                }} style={{height:"40px", backgroundColor:"#000", color:"#fff", margin:"6px", borderRadius:"6px", display:"flex", justifyContent:"center", alignItems:"center", fontSize:"12px", fontWeight:"400"}}>Click here to checkout</div>
            </div>
        }
    </div>
  )
}

export default Cart