import { HomePage } from "./pages/User/Home";
import { BlogsPage } from "./pages/User/Blogs";
import { CartPage } from "./pages/User/Cart";
import { ContactPage } from "./pages/User/Contact";
import { ShopPage } from "./pages/User/Shop";
import { BlogDetail } from "./pages/User/Blogs/BlogDetail";
import { ProductDetail } from "./pages/User/Shop/ProductDetail";
import { Route, Routes } from "react-router-dom";
import { AdminPage } from "./pages/Admin";
import { CategoryCreate } from "./pages/Admin/Category/create";
import { CategoryList } from "./pages/Admin/Category/list";
import { ProductCreate } from "./pages/Admin/Product/create";
import { ProductList } from "./pages/Admin/Product/list";
import { OrderList } from "./pages/Admin/Order/list";
import { BlogCreate } from "./pages/Admin/Blog/create";
import { BlogList } from "./pages/Admin/Blog/list";
import { BlogEdit } from "./pages/Admin/Blog/edit";
import { Dashboard } from "./pages/Admin/Dashboard";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="blogs" element={<BlogsPage />} />
        <Route path="blog/:id" element={<BlogDetail />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="product/:id" element={<ProductDetail />} />
      </Route>

      <Route path="admin" element={<AdminPage />}>
        <Route index element={<Dashboard />} />

        <Route path="blog/create" element={<BlogCreate />} />
        <Route path="blog/list" element={<BlogList />} />
        <Route path="blog/edit/:id" element={<BlogEdit />} />

        <Route path="product/create" element={<ProductCreate />} />
        <Route path="product/list" element={<ProductList />} />

        <Route path="category/create" element={<CategoryCreate />} />
        <Route path="category/list" element={<CategoryList />} />

        <Route path="order/list" element={<OrderList />} />
      </Route>
    </Routes>
  );
}

export default App;
