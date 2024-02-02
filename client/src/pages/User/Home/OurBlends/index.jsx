import { Container } from '../../../../components/Container';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Product } from '../../../../components/Product';
import { API_USER_URL } from '../../../../constants';
import { Spin } from 'antd';

import background from '../../../../assets/bg/img-home-3.png';

import './OurBlends.scss';

export const OurBlends = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_USER_URL}/products?limit=4`);
      setProducts(data.data.products);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section id="home-our-blends">
      <img src={background} alt="" />
      <Container>
        <article className="dat-title">
          <span className="sub-title" data-aos="fade-up">OUR BLENDS</span>
          <h1 className="title" data-aos="fade-left">
            <span> Coffee Blends and Roasts for Discerning Tastes </span>
          </h1>
        </article>
        <section className="list-products">
          {loading ? (
            <Spin tip="Loading" size="large">
              <div className="content" />
            </Spin>
          ) : (
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))
          )}
        </section>
      </Container>
    </section>
  );
};
