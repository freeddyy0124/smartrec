import React, { useContext, useEffect, useState } from 'react'
import Navbar from './HomeComponents/Navbar'
import HeaderNew from './HomeComponents/HeaderNew/HeaderNew'
import Product from '../Products/Product'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/authContextHelper';
import axios from 'axios';

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
        return null;
    }
}
function Homepage() {
    const { authenticated, user } = useContext(AuthContext);
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = React.useState("")

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);  // This handles every change in the input
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search/${searchTerm}`);  // Only navigate when Enter is pressed
        }
    };

	const [products, setProducts] = useState([]);

    useEffect(() => {
            fetchProducts(searchTerm);
    }, []);

    const fetchProducts = async (term) => {
		if(localStorage.getItem('smartrecs_recent_product')){
			try {
				const response = await axios.get(`http://localhost:5000/api/products/hybrid/${JSON.parse(localStorage.getItem('smartrecs_recent_product')).id}/${JSON.parse(localStorage.getItem('smartrecs_recent_product')).name}`); // Adjust the URL based on your Flask API
				if (typeof response.data === 'string') {
					setProducts(JSON.parse(response.data));
				} else {
				setProducts(response.data);
				}
				console.log("products", typeof response.data);
			} catch (error) {
				console.error('Error fetching data:', error);
				setProducts([]);
			}
		} else {
			try {
				const response = await axios.get(`http://localhost:5000/api/products/popular`); // Adjust the URL based on your Flask API
				setProducts(response.data);
			} catch (error) {
				console.error('Error fetching data:', error);
				setProducts([]);
			}
		}
    };
  return (
    <div style={{flex:"1", overflow:"hidden", display:"flex", flexDirection:"column", margin:"0", padding:"0"}}>
        <HeaderNew
 				height={"80px"}
 				width={"100%"}
 				padding={"0 20px"}
 				transitionScreenWidth={"650px"}
 				backgroundColor={"#ffffff"}
 				fontFamily={"verdana"}
 				fontSize={"13px"}
 				fontColor={"rgba(0, 0, 0, 1)"}
 				fontWeight={500}
 				logoImageSource={"https://cdn.svgporn.com/logos/zenhub.svg"}
 				logoWidth={"100px"}
 				logoLink={"/"}
 				logoMarginRight={"14px"}
 				options={[{"option":"Features","link":""},{"option":"Solutions","link":""},{"option":"Resources","link":""},{"option":"Pricing","link":""}]}
 				optionMarginLeft={"25px"}
 				actionButtonColor1={"#7A77FF"}
 				actionButtonColor2={"#4F4FEE"}
 				actionButtonPadding={"10px 14px"}
 				actionButtonLink={"/"}
 				actionBorderRadius={"4px"}
 				actionButtonMargin={"0 4px"}
 				actionFontColor={"#ffffff"}
 				actionFontSize={"12px"}
 				actionButtonText={"Start free trial"}
 				actionButtonFontWeight={500}
 				actionOpenInNew={false}
 				closeIconScale={1}
 				closeIconColor={"#efefef"}
 				closeIconMarginLeft={"20px"}
 				menuOptions={[{"option":"Features","link":""},{"option":"Solutions","link":""},{"option":"Resources","link":""},{"option":"Pricing","link":""},{"option":"Sign in","link":""}]}
 				menuBackgroundColor1={"#060A16"}
 				menuBackgroundColor2={"#141D42"}
 				menuWidth={"100%"}
 				menuFontSize={"13px"}
 				menuFontWeight={"500"}
 				menuFontColor={"#ffffff"}
 				menuItemPadding={"16px 16px"}
 				menuItemBorderColor={"#3C425D"}
 				menuItemOpenInNew={false}
                 onChange={handleInputChange} // Added onChange handler here
                 onKeyPressCapture={handleKeyPress}
                 authenticated={authenticated}
			/>

    <div style={{flex:"1", overflowY:"scroll", display:"flex", flexWrap:"wrap"}}>
        <div style={{width: "100%", margin:"20px", display: "grid", gridTemplateColumns:"repeat(auto-fill, minmax(290px, 1fr))", gridGap: "20px", alignContent: "flex-start" }}>
        {user?.email && products?.length > 0 ? (
                    products.map((product, index) => { 
                        // Parse the product data and pass it as props
                        product = {
                            ...product,
                            images: convertStringToArray(product.images),
                            description: convertStringToArray(product.description),
                            categories: convertStringToArray(product.categories),
                        }
                        console.log(product);
                        if (!!!product.images || !!!product.description || !!!product.categories) {
                            return null;
                        }
                        return (
                        <Product key={index} {...product} />
                    )})
                ) : (
                    <p>No products found.</p>
                )}{
					!user?.email && <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"90px", fontSize:"11px", color:"#000"}}>Login to view personalized recommendations</div>
				}
        </div>
        
    </div>
    </div>
  )
}

export default Homepage