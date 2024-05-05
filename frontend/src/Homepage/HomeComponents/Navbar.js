import React from 'react'

function Navbar() {
    // Ecommerce navbar with logo, search bar, cart, and user icon
    return (
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", padding:"10px", backgroundColor:"black", color:"white"}}>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                <img src="https://www.freelogodesign.org/Content/img/logo-ex-7.png" alt="logo" style={{width:"50px", height:"50px"}}/>
                <h1 style={{margin:"0", padding:"0", marginLeft:"10px"}}>Ecommerce</h1>
            </div>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                <input type="text" placeholder="Search..." style={{padding:"5px", borderRadius:"5px", border:"none"}}/>
                <button style={{padding:"5px", borderRadius:"5px", border:"none", backgroundColor:"white", color:"black", marginLeft:"10px"}}>Search</button>
            </div>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                <img src="https://img.icons8.com/ios/452/shopping-cart.png" alt="cart" style={{width:"30px", height:"30px"}}/>
                <img src="https://img.icons8.com/ios/452/user
                .png" alt="user" style={{width:"30px", height:"30px", marginLeft:"10px"}}/>
            </div>
        </div>
    )
}

export default Navbar