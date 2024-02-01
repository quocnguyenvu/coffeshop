import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_USER_URL } from '../../../../constants';
import { useEffect, useState } from 'react';
import { Container } from '../../../../components/Container';
import { Button, Divider, Spin } from 'antd';
import { formattedPrice } from '../../../../helper';
import { Product } from '../../../../components/Product';
import { Footer } from '../../../../components/Footer';
import { Header } from '../../../../components/Header';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import './ProductDetail.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const ProductDetail = () => {
  const { productId } = useParams();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [productSuggest, setProductSuggest] = useState([]);
  const [slideActive, setSlideActive] = useState('');

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_USER_URL}/product/${productId}`,
        );
        setProduct(response.data.data.product);
        setSlideActive(response.data.data.product?.images[0] || null);

        const responseSuggest = await axios.get(
          `${API_USER_URL}/products?category=${response.data.data.product.categoryId._id}&limit=4`,
        );
        setProductSuggest(
          responseSuggest.data.data.products.filter(
            (product) => product._id !== productId,
          ),
        );
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(
      (item) => item.productId === product._id,
    );

    if (productIndex === -1) {
      cart.push({ productId: product._id, quantity: quantity });
    } else {
      cart[productIndex].quantity += quantity;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const handleClickSlideItems = (e) => {
    setSlideActive(e.target.src);
  };

  return (
    <>
      <section id="product-detail">
        <Header isSticky={false} />
        <Container>
          {loading ? (
            <Spin tip="Loading" size="large">
              <div className="content" />
            </Spin>
          ) : (
            <>
              <article className="product_info">
                <div className="product_info__img">
                  {product.images.length === 0 ? (
                    <img
                      src="https://via.placeholder.com/300x300"
                      alt={product.name}
                    />
                  ) : product.images.length === 1 ? (
                    <img src={product.images[0]} alt={product.name} />
                  ) : (
                    <>
                      <div style={{ marginBottom: 25 }}>
                        <img src={slideActive} alt={product.name} />
                      </div>
                      <Swiper
                        navigation={true}
                        slidesPerView={3}
                        spaceBetween={10}
                        modules={[Navigation, Pagination]}
                      >
                        {product.images.map((image, index) => (
                          <SwiperSlide key={index}>
                            <img
                              src={image}
                              alt={product.name}
                              onClick={handleClickSlideItems}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </>
                  )}
                </div>
                <div className="product_info__content">
                  <Divider style={{ borderColor: '#333' }} orientation="left">
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
                      <button onClick={() => setQuantity(quantity - 1)}>
                        -
                      </button>
                      <div>{quantity}</div>
                      <button onClick={() => setQuantity(quantity + 1)}>
                        +
                      </button>
                    </div>
                    <div className="product_info__content__btn">
                      <Button type="primary" onClick={handleAddToCart}>
                        Thêm vào giỏ hàng
                      </Button>
                    </div>
                  </div>
                  <Divider />
                  <div className="product-desc">
                    <Divider style={{ borderColor: '#333' }} orientation="left">
                      <span style={{ fontSize: 24 }}>MÔ TẢ SẢN PHẨM</span>
                    </Divider>
                    <div
                      className="product_info__content__desc"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </div>
                </div>
              </article>
              <article className="product_suggest">
                {productSuggest.length > 0 && (
                  <>
                    <Divider style={{ borderColor: '#333' }} orientation="left">
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
  );
};
