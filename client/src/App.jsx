import { HomePage } from "./pages/User/Home";
import { BlogsPage } from "./pages/User/Blogs";
import { CartPage } from "./pages/User/Cart";
import { ContactPage } from "./pages/User/Contact";
import { ShopPage } from "./pages/User/Shop";
import { BlogDetail } from "./pages/User/Blogs/BlogDetail";
import { ProductDetail } from "./pages/User/Shop/ProductDetail";
import { Login } from "./pages/Admin/Login";
import { Route, Routes } from "react-router-dom";
import { AdminPage } from "./pages/Admin";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" >
        <Route index element={<HomePage/>} />
        <Route path="blogs" element={<BlogsPage/>} />
        <Route path="blog/:id" element={<BlogDetail/>} />
        <Route path="cart" element={<CartPage/>} />
        <Route path="contact" element={<ContactPage/>} />
        <Route path="shop" element={<ShopPage/>} />
        <Route path="product/:id" element={<ProductDetail/>} />
      </Route>

      <Route path="admin" element={<AdminPage/>}>
        <Route index element={<Login/>} />
        <Route path="dashboard" element={<Login/>} />
        <Route path="blogs" element={<Login/>} />
        <Route path="blog/create" element={<Login/>} />
        <Route path="blog/update/:id" element={<Login/>} />
        <Route path="product/create" element={<Login/>} />
        <Route path="product/update/:id" element={<Login/>} />
      </Route>
    </Routes>
  );
}

export default App;
