import Homepage from "./Homepage/Homepage";
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProductsPage from "./ProductsPage/ProductsPage";
import SearchPage from "./SearchPage/SearchPage";
import Signin from "./Authentication/Signin";
import Signup from "./Authentication/Signup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logout from "./Authentication/Logout";


function App() {
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  return (
    <div className="App" style={{width:"100vw", height:"100vh", display:"flex", flexDirection:"column", margin:"0"}}>
      <Router>
        <Routes>
          {/* Product routes like /product/:id would go here */}
          <Route path = "/product/:id" element={<ProductsPage/>}/>
          <Route path = "/search/:searchTerm" element={<SearchPage/>}/>
          <Route path = "/login" element={<Signin/>}/>
          <Route path = "/logout" element={<Logout/>}/>
          <Route path = "/signup" element={<Signup/>}/>

          <Route path="/" element={<Homepage/>}/>
        </Routes>
      </Router>
      <ToastContainer position="bottom-center" />
    </div>
  );
}

export default App;
