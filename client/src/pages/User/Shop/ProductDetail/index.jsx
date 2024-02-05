import { Button, Divider, Spin, message } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Container } from '@components/Container'
import { Footer } from '@components/Footer'
import { Header } from '@components/Header'
import { Product } from '@components/Product'

import { API_USER_URL } from '../../../../constants'
import { formattedPrice } from '../../../../helper'

import './ProductDetail.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export const ProductDetail = () => {
  const { productId } = useParams()

  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [productSuggest, setProductSuggest] = useState([])
  const [slideActive, setSlideActive] = useState('')

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${API_USER_URL}/product/${productId}`)
        setProduct(response.data.data.product)
        setSlideActive(response.data.data.product?.images[0] || null)

        const responseSuggest = await axios.get(
          `${API_USER_URL}/products?category=${response.data.data.product.categoryId._id}&limit=4`
        )
        setProductSuggest(responseSuggest.data.data.products.filter((product) => product._id !== productId))
      } catch (error) {
        console.error('Error fetching product data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProductData()
  }, [productId])

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const productIndex = cart.findIndex((item) => item.productId === product._id)

    if (-1 === productIndex) {
      cart.push({ productId: product._id, quantity, price: product.price })
    } else {
      cart[productIndex].quantity += quantity
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    message.success('Thêm sản phẩm vào giỏ hàng thành công')
  }

  const handleClickSlideItems = (e) => {
    setSlideActive(e.target.src)
  }

  return (
    <>
      <section id="product-detail">
        <Header isSticky={false} />
        <Container>
          {loading ? (
            <Spin size="large" tip="Loading">
              <div className="content" />
            </Spin>
          ) : (
            <>
              <article className="product_info">
                <div className="product_info__img">
                  {0 === product.images.length ? (
                    <img alt={product.name} src="https://via.placeholder.com/300x300" />
                  ) : 1 === product.images?.length ? (
                    <img alt={product.name} src={product.images[0]} />
                  ) : (
                    <>
                      <div style={{ marginBottom: 25 }}>
                        <img alt={product.name} src={slideActive} />
                      </div>
                      <Swiper modules={[Navigation, Pagination]} navigation={true} slidesPerView={3} spaceBetween={10}>
                        {product.images.map((image, index) => (
                          <SwiperSlide key={index}>
                            <img alt={product.name} src={image} onClick={handleClickSlideItems} />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </>
                  )}
                </div>
                <div className="product_info__content">
                  <Divider orientation="left" style={{ borderColor: '#333' }}>
                    <span style={{ fontSize: 24 }}>THÔNG TIN SẢN PHẨM</span>
                  </Divider>
                  <table className="product_info__content__table">
                    <tbody>
                      <tr>
                        <td>Tên sản phẩm</td>
                        <td>{product.name}</td>
                      </tr>
                      <tr>
                        <td>Giá</td>
                        <td>{formattedPrice(product.price)}</td>
                      </tr>
                      <tr>
                        <td>Danh mục</td>
                        <td>{product.categoryId?.name}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="product-cart">
                    <div className="quantity-input">
                      <button onClick={() => setQuantity(quantity - 1)}>-</button>
                      <div>{quantity}</div>
                      <button onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>
                    <div className="product_info__content__btn">
                      <Button type="primary" onClick={handleAddToCart}>
                        Thêm vào giỏ hàng
                      </Button>
                    </div>
                  </div>
                  <Divider />
                  <div className="product-desc">
                    <Divider orientation="left" style={{ borderColor: '#333' }}>
                      <span style={{ fontSize: 24 }}>MÔ TẢ SẢN PHẨM</span>
                    </Divider>
                    <div className="product_info__content__desc" dangerouslySetInnerHTML={{ __html: product.description }} />
                  </div>
                </div>
              </article>
              <article className="product_suggest">
                {0 < productSuggest?.length && (
                  <>
                    <Divider orientation="left" style={{ borderColor: '#333' }}>
                      <span style={{ fontSize: 24 }}>SẢN PHẨM TƯƠNG TỰ</span>
                    </Divider>
                    <div className="product_suggest_wrap">
                      {productSuggest.map((product, index) => (
                        <Product key={index} product={product} />
                      ))}
                    </div>
                  </>
                )}
              </article>
            </>
          )}
        </Container>
      </section>
      <Footer />
    </>
  )
}
