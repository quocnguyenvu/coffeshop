import { HomePage } from '@user/Home'
import { BlogsPage } from '@user/Blogs'
import { CartPage } from '@user/Cart'
import { ContactPage } from '@user/Contact'
import { ShopPage } from '@user/Shop'
import { BlogDetail } from '@user/Blogs/BlogDetail'
import { ProductDetail } from '@user/Shop/ProductDetail'
import { Route, Routes } from 'react-router-dom'
import { AdminPage } from '@admin'
import { CategoryCreate } from '@admin/Category/create'
import { CategoryList } from '@admin/Category/list'
import { ProductCreate } from '@admin/Product/create'
import { ProductList } from '@admin/Product/list'
import { OrderList } from '@admin/Order/list'
import { BlogCreate } from '@admin/Blog/create'
import { BlogList } from '@admin/Blog/list'
import { BlogEdit } from '@admin/Blog/edit'
import { Dashboard } from '@admin/Dashboard'
import { CategoryEdit } from '@admin/Category/edit'
import { Login } from '@admin/Login'
import { ProductEdit } from '@admin/Product/edit'
import { User } from '@admin/User'
import { CheckoutPage } from '@user/CheckoutPage'
// import { Activity } from '@admin/Content/activity';
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
