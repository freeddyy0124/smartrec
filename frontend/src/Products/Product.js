import React from 'react'
import { motion } from 'framer-motion';
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import './Product.css'
import { toast } from 'react-toastify';

// Function that returns nearest integer to a decimal number and then returns an array of stars example: 4.5 -> [1, 1, 1, 1, 0.5], 4.3 -> [1, 1, 1, 1, 0], 4.7 -> [1, 1, 1, 1, 1], 4.0 -> [1, 1, 1, 1, 0]
function getStars(rating) {
    let stars = [];
    let integer = Math.floor(rating);
    let decimal = rating - integer;
    for (let i = 0; i < integer; i++) {
        stars.push(1);
    }
    if (decimal >= 0.5) {
        stars.push(1);
    } else {
        stars.push(0);
    }
    for (let i = stars.length; i < 5; i++) {
        stars.push(0);
    }
    return stars;
}

// Function that returns a star icon
function Star({filled}) {
    if (filled) {
        return <FaStar style={{color: "#09AD0B", marginRight:"2px"}}/>
    } else {
        return <FaStar style={{color: "rgba(0,0,0,0.2)", marginRight:"2px"}}/>
    }
}

// Function that returns a half star icon
function HalfStar() {
    return <FaStarHalf style={{color: "#09AD0B", marginRight:"2px"}}/>
}

function Product({key, average_rating, count, images, title, price, description, product_id}) {
  if(!average_rating){
    return (
      <motion.li
        key={key}
        style={{ listStyle: "none" }}
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.5 }}
        exit={{ opacity: 0.5, scale: 0 }}
        transition={{ duration: 0.15 }}
      >
        <div className='productDiv' style={{
          flex: "1",
          width: "100%",
          aspectRatio: "4/4.75",
          display: "flex",
          flexDirection: "column",
          padding: "0",
          alignContent: "center",
          justifyContent: "center",
          borderRadius: "10px",
          backgroundColor: "#fff",
          
        }}>
          <a style={{flex:"1", display:"flex", flexDirection:"column"}} href="/product/weh32udw"><div className='productImg' style={{
            flex: "1",
            background: "url(https://images.crutchfieldonline.com/ImageHandler/trim/750/457/products/2022/24/806/g806GA03202-F.jpg)",
            backgroundSize: "70% auto",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px"
          }}></div></a>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0 15px",
            maxWidth: "100%"
          }}>
            <div style={{
              fontWeight: "650",
              fontSize: "17.5px",
              flex: "1",
              marginRight: "10px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis"
            }}>Clearwhite buds</div>
            <div style={{fontSize: "14px", fontWeight: "600"}}>$458.00</div>
          </div>
          <div style={{
            display: "flex",
            margin: "7px 15px 2px 15px",
            fontSize: "13px",
            fontWeight: "450",
            color: "rgba(0,0,0,0.7)",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis"
          }}>Google Pixel Buds, Clearly White</div>
          <div style={{display: "flex", margin: "9px 15px 0 15px", fontSize: "13px"}}>
            {getStars(3).map((item, index) => {
              if (item === 1) {
                return <Star key={index} filled={true}/>
              } else if (item === 0.5) {
                return <HalfStar key={index}/>
              } else {
                return <Star key={index} filled={false}/>
              }
            })}<span style={{marginLeft:"3px"}}>(121)</span></div>
          <div style={{display: "flex", margin: "14px 15px 18px 15px"}}>
            <div style={{border: "solid 1.5px", borderRadius: "40px", padding: "10px 16px", fontWeight: "600", fontSize: "14px", cursor:"pointer"}}>Add to Cart</div>
          </div>
        </div>
      </motion.li>
    )
  }
  return (
    <motion.li
      key={key}
      style={{ listStyle: "none" }}
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      exit={{ opacity: 0.5, scale: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className='productDiv' style={{
        flex: "1",
        width: "100%",
        aspectRatio: "4/4.75",
        display: "flex",
        flexDirection: "column",
        padding: "0",
        alignContent: "center",
        justifyContent: "center",
        borderRadius: "10px",
        backgroundColor: "#fff",
        
      }}>
        <a style={{flex:"1", display:"flex", flexDirection:"column"}} href={`/product/${product_id}`}><div className='productImg' style={{
          flex: "1",
          background: `url(${images[0]["hi_res"]})`,
          backgroundSize: "40% auto",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px"
        }}></div></a>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0 15px",
          maxWidth: "100%"
        }}>
          <div style={{
            fontWeight: "650",
            fontSize: "17.5px",
            flex: "1",
            marginRight: "10px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis"
          }}>{title}</div>
          <div style={{fontSize: "14px", fontWeight: "600"}}>${price}</div>
        </div>
        <div style={{
          display: "flex",
          margin: "7px 15px 2px 15px",
          maxWidth: "100%",
          fontSize: "13px",
          fontWeight: "450",
          color: "rgba(0,0,0,0.7)",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis"
        }}>{description}</div>
        <div style={{display: "flex", margin: "9px 15px 0 15px", fontSize: "13px"}}>
          {getStars(average_rating).map((item, index) => {
            if (item === 1) {
              return <Star key={index} filled={true}/>
            } else if (item === 0.5) {
              return <HalfStar key={index}/>
            } else {
              return <Star key={index} filled={false}/>
            }
          })}<span style={{marginLeft:"3px"}}>({count})</span></div>
        <div style={{display: "flex", margin: "14px 15px 18px 15px"}}>
          <div style={{border: "solid 1.5px", borderRadius: "40px", padding: "10px 16px", fontWeight: "600", fontSize: "14px", cursor:"pointer"}} onClick={()=>{
                        let currentItems = JSON.parse(localStorage.getItem("smartrecs_cart")) || {};
                        if(currentItems[product_id]){
                            currentItems[product_id].quantity += 1;
                        } else {
                            currentItems[product_id] = {
                                title: title,
                                price: price,
                                quantity: 1,
                                image: images[0]["hi_res"]
                            }
                        }
                        localStorage.setItem("smartrecs_cart", JSON.stringify(currentItems));
                        toast.success("Product added to cart");
                    }}>Add to Cart</div>
        </div>
      </div>
    </motion.li>
  )
}

export default Product