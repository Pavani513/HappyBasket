import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import UpdateProduct from "./pages/Product_MainPages/UpdateProduct";
import PostProducts from "./pages/Product_MainPages/PostProducts";
import CreationPage from "./pages/Creation_page/CreationPage";
import ProductDetails from "./pages/Product_MainPages/GetProductDetails";
import GetProducts from "./pages/Product_MainPages/GetProducts";
import SignUp from "./pages/UserAuthPages/SignUp";
import Login from "./pages/UserAuthPages/Login";


function App() {
  

 return (
    <Router>
      <Routes>
        <Route path="/register" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/productDetails/:id" element={<ProductDetails/>}/>
        <Route path="/products" element={<GetProducts/>} />
        <Route path="/addProduct" element={<PostProducts />} />
        <Route path="/editProduct/:id" element={<UpdateProduct/>} />
        <Route path="/CreateProduct" element={<CreationPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
