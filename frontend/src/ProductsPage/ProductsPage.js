import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';

function convertStringToArray(inputString) {
    try {
        // Step 1: Remove unwanted internal double quotes within values
        let correctedString = inputString.replace(/: '([^']*)'/g, function (match, p1) {
            return ": '" + p1.replace(/"/g, '') + "'";
        });

        // Step 2: Replace 'None' with 'null'
        correctedString = correctedString.replace(/None/g, 'null');

        // Step 3: Convert single quotes used for JSON-like structure to double quotes
        correctedString = correctedString.replace(/'\s*([\w]+)\s*'\s*:/g, '"$1":'); // keys
        correctedString = correctedString.replace(/:\s*'([^']*)'/g, ': "$1"'); // values
        correctedString = correctedString.replace(/'\s*,\s*'/g, '", "'); // array elements
        correctedString = correctedString.replace(/^\['/g, '["').replace(/'\]$/g, '"]'); // start and end of array

        // Attempt to parse the corrected string as JSON
        const result = JSON.parse(correctedString);
        
        // Check if the result is an array
        if (Array.isArray(result)) {
            return result;
        } else {
            throw new Error("Parsed JSON is not an array.");
        }
    } catch (error) {
        return [];
    }
}

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



function urlToImage(url) {
    return <div style={{minHeight:"350px", boxShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px", borderRadius:"8px",
    background: `url(${url})`,
    backgroundSize: "60% auto",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    marginBottom:"20px",
    aspectRatio:"1/0.7",
    }}>
</div>
}

function ProductsPage() {
    const { id } = useParams(); // This hook extracts parameters from the current route

    const [product, setProduct] = useState();
    const [currentImage, setCurrentImage] = React.useState(null);
    const [quantity, setQuantity] = React.useState(1);

    useEffect(() => {
        if (id) {
            fetchProduct(id);
        }
    }, [id]);

    const fetchProduct = async (term) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/product/${id}`)
            setProduct(response.data[0]);
            if(response?.data){
                localStorage.setItem("smartrecs_recent_product", JSON.stringify({
                    name: response.data[0].title,
                    id: response.data[0].product_id
                }));
            }
            setCurrentImage(convertStringToArray(response.data[0].images)[0]["large"]); 

        } catch (error) {
            console.error('Error fetching data:', error);
            setProduct(null);
        }
    };

    
  // We will use the product ID to fetch the product details from the server
  // Following things are returned from the server:
  // product_id title	main_category	categories	price	description	average_rating	images	count	user_satisfaction_proxy	popularity_threshold	is_popular
    if (!product) {
        return <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>Product not found</div>
    }
  return (
    <div style={{
        height: "100vh",
        width: "100vw",
        overflowY:"scroll",
        display:"flex",
        flexDirection:"column",
    }}>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginTop:"80px"}}>
            <div style={{display:"flex", maxWidth:"1200px",width:"100vw", flexWrap:"wrap", justifyContent:"center", gap:"25px"}}>
                <div style={{flex:"1", minWidth:"350px", maxWidth:"calc(100vw - 60px)", fontSize:"12px", marginLeft:"4px"
            }}>Category - {
                convertStringToArray(product.categories).map((category, index) => {
                    return <span key={index}>{category}{index === convertStringToArray(product.categories).length - 1 ? "" : ", "}</span>
                })
            }</div></div></div>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginTop:"20px"}}>
            <div style={{display:"flex", maxWidth:"1200px",width:"100vw", flexWrap:"wrap", justifyContent:"center", gap:"25px"}}>
                
                <div style={{flex:"1", minWidth:"350px", maxWidth:"calc(100vw - 60px)", display:"flex", flexDirection:"column", marginBottom:"30px"}}>
                    <img src={currentImage} style={{width:"100%", borderRadius:"8px", aspectRatio:"1/0.7", marginBottom:"15px", boxShadow:"rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px", objectFit:"contain"}} alt="Product"/>
                    <div style={{display:"flex", gap:"12px", justifyContent:"center"}}>
                        {
                            convertStringToArray(product.images).map((img)=>img["large"]).slice(0,4).map((image, index) => {
                                return (
                                    <div key={index} style={{height:"100px", background: `url(${image})`, backgroundSize:"auto 100%", backgroundPosition:"center", backgroundRepeat:"no-repeat", cursor:"pointer", borderRadius:"6px", aspectRatio:"1/1", outline: currentImage === index ? "solid 2px #0071DC" : "none", boxShadow:"rgba(17, 17, 26, 0.08) 0px 1px 0px, rgba(17, 17, 26, 0.08) 0px 8px 24px, rgba(17, 17, 26, 0.08) 0px 16px 48px"}}
                                    onClick={() => setCurrentImage(convertStringToArray(product.images)[index]["hi_res"])}
                                    ></div>
                                )
                            })
                        }
                    </div>
                </div>
                
                <div style={{flex:"1", display:"flex", flexDirection:"column", minWidth:"350px", maxWidth:"calc(100vw - 60px)", marginBottom:"30px"}}>
                    <div style={{fontSize:"24px", fontWeight:"700", lineHeight:"33px"}}>{product.title}</div>
                    <div style={{fontSize:"14px", margin:"10px 0 14px 0", lineHeight:"20px"}}>{product.description.replace('[', '').replace(']', '').replaceAll("'", '')}</div>
                    <div style={{fontSize:"14px"}}>
                        {getStars(product.average_rating).map((item, index) => {
                            if (item === 1) {
                            return <Star key={index} filled={true}/>
                            } else if (item === 0.5) {
                            return <HalfStar key={index}/>
                            } else {
                            return <Star key={index} filled={false}/>
                            }
                        })}<span style={{marginLeft:"3px"}}>({product.count})</span>
                    </div>

                    <hr style={{width:"100%", margin:"30px 0", border:"none", borderTop: "solid 1px rgba(0,0,0,0.2)"}}/>

                    <div style={{fontSize:"17px", fontWeight:"500"}}>${product.price} {product.price > 50 ? `or ${(product.price / 6).toFixed(2)}/month`: "+ applicable taxes"}</div>
                    <div style={{fontSize:"13px", marginTop:"10px"}}>Suggested payments with 6 months special financing</div>

                    <hr style={{width:"100%", margin:"30px 0", border:"none", borderTop: "solid 1px rgba(0,0,0,0.2)"}}/>

                    {/* Choose quantity */}
                    <div style={{display:"flex", alignItems:"center"}}>
                        <div style={{display:"flex", alignItems:"center"}}>
                            <div style={{backgroundColor:"#F5F6F6", display:"flex", height:"45px", alignItems:"center", borderRadius:"40px"}}>
                                <button style={{backgroundColor:"rgba(0,0,0,0)", border:"none", outline:"none", padding:"0 20px", borderRadius:"40px 0 0 40px", cursor:"pointer", height:"100%", fontSize:"20px"}}
                                onClick={() => {if(quantity > 1) setQuantity(quantity - 1)}}
                                >-</button>
                                <div style={{fontSize:"16px"}}>{quantity}</div>
                                <button style={{backgroundColor:"rgba(0,0,0,0)", border:"none", outline:"none", padding:"0 20px", borderRadius:"0 40px 40px 0", cursor:"pointer", height:"100%", fontSize:"20px"}}
                                onClick={() => setQuantity(quantity + 1)}
                                >+</button>
                            </div>
                        </div>
                        <div style={{fontSize:"13px", lineHeight:"20px", marginLeft:"25px", fontWeight:"500"}}><span style={{color:"#FF7916"}}>Limited stock</span> left! Don't miss it</div>
                    </div>

                    <div style={{display:"flex", marginTop:"30px"}}><div style={{backgroundColor:"#003D29", color:"#fff", fontWeight:"500", padding:"18px 45px", fontSize:"13px", borderRadius:"40px", cursor:"pointer"}} onClick={()=>{
                        let currentItems = JSON.parse(localStorage.getItem("smartrecs_cart")) || {};
                        if(currentItems[product.product_id]){
                            currentItems[product.product_id].quantity += quantity;
                        } else {
                            currentItems[product.product_id] = {
                                title: product.title,
                                price: product.price,
                                quantity: quantity,
                                image: currentImage
                            }
                        }
                        localStorage.setItem("smartrecs_cart", JSON.stringify(currentItems));
                        toast.success("Product added to cart");
                    }}>Add to Cart</div></div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ProductsPage;