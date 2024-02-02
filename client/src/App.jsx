import { HomePage } from './pages/User/Home'
import { BlogsPage } from './pages/User/Blogs'
import { CartPage } from './pages/User/Cart'
import { ContactPage } from './pages/User/Contact'
import { ShopPage } from './pages/User/Shop'
import { BlogDetail } from './pages/User/Blogs/BlogDetail'
import { ProductDetail } from './pages/User/Shop/ProductDetail'
import { Route, Routes } from 'react-router-dom'
import { AdminPage } from './pages/Admin'
import { CategoryCreate } from './pages/Admin/Category/create'
import { CategoryList } from './pages/Admin/Category/list'
import { ProductCreate } from './pages/Admin/Product/create'
import { ProductList } from './pages/Admin/Product/list'
import { OrderList } from './pages/Admin/Order/list'
import { BlogCreate } from './pages/Admin/Blog/create'
import { BlogList } from './pages/Admin/Blog/list'
import { BlogEdit } from './pages/Admin/Blog/edit'
import { Dashboard } from './pages/Admin/Dashboard'
import { CategoryEdit } from './pages/Admin/Category/edit'
import { Login } from './pages/Admin/Login'
import { ProductEdit } from './pages/Admin/Product/edit'
import { User } from './pages/Admin/User'
import { CheckoutPage } from './pages/User/CheckoutPage'
// import { Activity } from './pages/Admin/Content/activity';
import Aos from 'aos'
import { useEffect } from 'react'

import 'aos/dist/aos.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

function App() {
  useEffect(() => {
    Aos.init()
  }, [])

  return (
    <div>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="blog/:blogId" element={<BlogDetail />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="product/:productId" element={<ProductDetail />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>

        <Route path="admin" element={<AdminPage />}>
          <Route index element={<Dashboard />} />

          <Route path="blog/create" element={<BlogCreate />} />
          <Route path="blog/list" element={<BlogList />} />
          <Route path="blog/edit/:blogId" element={<BlogEdit />} />

          <Route path="product/create" element={<ProductCreate />} />
          <Route path="product/list" element={<ProductList />} />
          <Route path="product/edit/:productId" element={<ProductEdit />} />

          <Route path="category/create" element={<CategoryCreate />} />
          <Route path="category/list" element={<CategoryList />} />
          <Route path="category/edit/:categoryId" element={<CategoryEdit />} />

          <Route path="order" element={<OrderList />} />
          <Route path="user" element={<User />} />

          {/* <Route path="content/activity" element={<Activity />} /> */}
        </Route>

        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
