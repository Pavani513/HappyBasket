import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState } from 'react';

import UpdateProduct from "./pages/Product_MainPages/UpdateProduct";
import PostProducts from "./pages/Product_MainPages/PostProducts";
import ProductDetails from "./pages/Product_MainPages/GetProductDetails";
import GetProducts from "./pages/Product_MainPages/GetProducts";
import SignUp from "./pages/UserAuthPages/SignUp";
import Login from "./pages/UserAuthPages/Login";
import CreationPage from "./pages/Creation_page/CreationPage";
import Categories from "./pages/AllCategories/Categories";
import Navbar from "./components/Navbar/Navbar";

function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/' || location.pathname === '/login';

const [searchTerm, setSearchTerm] = useState("");
const handleSearch = (term) => {
    setSearchTerm(term);
};

 return (

  <>
        {!hideNavbar && <Navbar onSearch={handleSearch}/>}
        {/* {<Categories onSearch={handleSearch}/>} */}
      <Routes>
        <Route path="/" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/productDetails/:id" element={<ProductDetails/>}/>
        <Route path="/products" element={<GetProducts searchTerm={searchTerm}/>} />
        <Route path="/addProduct" element={<PostProducts />} />
        <Route path="/editProduct/:id" element={<UpdateProduct/>} />
        <Route path="/createProduct" element={<CreationPage/>}/>
        <Route path="/category/:category" element={<Categories searchTerm={searchTerm}/>}/>
      </Routes>
      </>
    
  );
}

function App() {
    return (
        <Router>
            <Layout />
        </Router>
    );
}

export default App;


