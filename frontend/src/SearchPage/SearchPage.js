import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Products/Product';
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

function SearchPage() {
    const { searchTerm } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            fetchProducts(searchTerm);
        }
    }, [searchTerm]);

    const fetchProducts = async (term) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/search/${term}`); // Adjust the URL based on your Flask API
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setProducts([]);
        }
    };

    let arr = [{'thumb': 'https://m.media-amazon.com/images/I/51oAR7voVoL._AC_SR38,50_.jpg', 'large': 'https://m.media-amazon.com/images/I/51oAR7voVoL._AC_.jpg', 'variant': 'MAIN', 'hi_res': 'https://m.media-amazon.com/images/I/61LvpYlMbDL._AC_SL1200_.jpg'}, {'thumb': 'https://m.media-amazon.com/images/I/51F6QqMhx6L._AC_SR38,50_.jpg', 'large': 'https://m.media-amazon.com/images/I/51F6QqMhx6L._AC_.jpg', 'variant': 'PT01', 'hi_res': 'https://m.media-amazon.com/images/I/71brzBhD1NL._AC_SL1200_.jpg'}, {'thumb': 'https://m.media-amazon.com/images/I/516jOLX3dtL._AC_SR38,50_.jpg', 'large': 'https://m.media-amazon.com/images/I/516jOLX3dtL._AC_.jpg', 'variant': 'PT02', 'hi_res': 'https://m.media-amazon.com/images/I/71K9be46sBL._AC_SL1200_.jpg'}, {'thumb': 'https://m.media-amazon.com/images/I/41i1W22Rt1L._AC_SR38,50_.jpg', 'large': 'https://m.media-amazon.com/images/I/41i1W22Rt1L._AC_.jpg', 'variant': 'PT03', 'hi_res': 'https://m.media-amazon.com/images/I/61jY+Exdt3L._AC_SL1200_.jpg'}, {'thumb': 'https://m.media-amazon.com/images/I/411EhWLRV9S._AC_SR38,50_.jpg', 'large': 'https://m.media-amazon.com/images/I/411EhWLRV9S._AC_.jpg', 'variant': 'PT04', 'hi_res': 'https://m.media-amazon.com/images/I/610hu0vCYDS._AC_SL1200_.jpg'}, {'thumb': 'https://m.media-amazon.com/images/I/51X5k+ZwY-L._AC_SR38,50_.jpg', 'large': 'https://m.media-amazon.com/images/I/51X5k+ZwY-L._AC_.jpg', 'variant': 'PT05', 'hi_res': 'https://m.media-amazon.com/images/I/71QgF5Az1HL._AC_SL1200_.jpg'}, {'thumb': 'https://m.media-amazon.com/images/I/5108sETtEkL._AC_SR38,50_.jpg', 'large': 'https://m.media-amazon.com/images/I/5108sETtEkL._AC_.jpg', 'variant': 'PT06', 'hi_res': 'https://m.media-amazon.com/images/I/716p8Y-pZnL._AC_SL1200_.jpg'}, {'thumb': 'https://m.media-amazon.com/images/I/51FwQA6TDFS._AC_SR38,50_.jpg', 'large': 'https://m.media-amazon.com/images/I/51FwQA6TDFS._AC_.jpg', 'variant': 'PT07', 'hi_res': 'https://m.media-amazon.com/images/I/61XJ6ClZwSS._AC_SL1200_.jpg'}, {'thumb': 'https://m.media-amazon.com/images/I/51ppsPvj4cL._AC_SR38,50_.jpg', 'large': 'https://m.media-amazon.com/images/I/51ppsPvj4cL._AC_.jpg', 'variant': 'PT08', 'hi_res': null}];

    return (
        <div style={{height:"100vh", width:"100vw", overflow:"hidden", display:"flex", flexDirection:"column"}}>
            <div style={{marginTop:"40px", marginLeft:"20px", fontSize:"14px"}}>
                Search results for <span style={{fontWeight:"600"}}>{searchTerm}</span>
            </div>
            <div style={{flex:"1", overflowY:"scroll", display:"flex", flexWrap:"wrap"}}>
            <div style={{width: "100%", margin:"20px", display: "grid", gridTemplateColumns:"repeat(auto-fill, minmax(290px, 1fr))", gridGap: "20px", alignContent: "flex-start" }}>
                {products.length > 0 ? (
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
                )}
            </div>
            </div>
        </div>
    );
}

export default SearchPage;