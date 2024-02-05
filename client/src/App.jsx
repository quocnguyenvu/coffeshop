import { AdminPage } from '@admin'
import { AdminInfomation } from '@admin/AdminInfomation'
import { BlogCreate } from '@admin/Blog/create'
import { BlogEdit } from '@admin/Blog/edit'
import { BlogList } from '@admin/Blog/list'
import { CategoryCreate } from '@admin/Category/create'
import { CategoryEdit } from '@admin/Category/edit'
import { CategoryList } from '@admin/Category/list'
import { ChangePassword } from '@admin/ChangePassword'
import { CustomerInterface } from '@admin/CustomerInterface'
import { Dashboard } from '@admin/Dashboard'
import { Login } from '@admin/Login'
import { OrderList } from '@admin/Order/list'
import { ProductCreate } from '@admin/Product/create'
import { ProductEdit } from '@admin/Product/edit'
import { ProductList } from '@admin/Product/list'
import { BlogsPage } from '@user/Blogs'
import { BlogDetail } from '@user/Blogs/BlogDetail'
import { CartPage } from '@user/Cart'
import { CheckoutPage } from '@user/CheckoutPage'
import { ContactPage } from '@user/Contact'
import { HomePage } from '@user/Home'
import { ShopPage } from '@user/Shop'
import { ProductDetail } from '@user/Shop/ProductDetail'
import Aos from 'aos'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import 'aos/dist/aos.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

// eslint-disable-next-line func-style
function App() {
  useEffect(() => {
    Aos.init()
  }, [])

  return (
    <div>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route element={<BlogsPage />} path="blogs" />
          <Route element={<BlogDetail />} path="blog/:blogId" />
          <Route element={<CartPage />} path="cart" />
          <Route element={<ContactPage />} path="contact" />
          <Route element={<ShopPage />} path="shop" />
          <Route element={<ProductDetail />} path="product/:productId" />
          <Route element={<CheckoutPage />} path="/checkout" />
        </Route>

        <Route element={<AdminPage />} path="admin">
          <Route index element={<Dashboard />} />

          <Route element={<BlogCreate />} path="blog/create" />
          <Route element={<BlogList />} path="blog/list" />
          <Route element={<BlogEdit />} path="blog/edit/:blogId" />

          <Route element={<ProductCreate />} path="product/create" />
          <Route element={<ProductList />} path="product/list" />
          <Route element={<ProductEdit />} path="product/edit/:productId" />

          <Route element={<CategoryCreate />} path="category/create" />
          <Route element={<CategoryList />} path="category/list" />
          <Route element={<CategoryEdit />} path="category/edit/:categoryId" />

          <Route element={<OrderList />} path="order" />

          <Route element={<ChangePassword />} path="password/change" />
          <Route element={<AdminInfomation />} path="infomation" />
          <Route element={<CustomerInterface />} path="customer-interface" />
        </Route>

        <Route element={<Login />} path="login" />
      </Routes>
    </div>
  )
}

export default App
