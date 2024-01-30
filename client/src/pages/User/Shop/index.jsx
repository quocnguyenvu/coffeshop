import { Container } from '../../../components/Container';
import { PageBanner } from '../../../components/PageBanner';
import { Product } from '../../../components/Product';
import {
  Button,
  Divider,
  Empty,
  Form,
  Input,
  Radio,
  Select,
  Slider
} from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Footer } from '../../../components/Footer';
import { API_USER_URL } from '../../../constants';

import './Shop.scss';

export const ShopPage = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${API_USER_URL}/categories`);
      setCategories(data.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async (params) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_USER_URL}/products`, {
        params: {
          name: params?.name,
          category: params?.category !== 'all' ? params?.category : undefined,
          minPrice: params?.minPrice,
          maxPrice: params?.maxPrice,
          sortMethod: params?.sortMethod ?? 'name',
          sortOrder: params?.sortOrder ?? 'asc',
        },
      });

      const { data } = response;
      setSearchResults(data.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const onFinish = async (values) => {
    try {
      const { name, category, price, sortMethod, sortOrder } = values;

      const minPrice = price && price.length >= 1 ? price[0] : undefined;
      const maxPrice = price && price.length === 2 ? price[1] : undefined;

      await fetchProducts({
        name,
        category,
        minPrice,
        maxPrice,
        sortMethod,
        sortOrder,
      });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <>
      <PageBanner title="SHOP" />
      <section id="shop">
        <Container>
          <Divider style={{ borderColor: '#333' }} orientation="left">
            <span style={{ fontSize: 24 }}>OUR PRODUCTS</span>
          </Divider>
          <div className="shop_wrapper">
            <article className="list-products">
              {searchResults && searchResults.length > 0 ? (
                searchResults.map((product, index) => (
                  <Product key={index} product={product} />
                ))
              ) : (
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Empty />
                </div>
              )}
            </article>
            <article className="filters">
              <div className="cart"></div>
              <Form
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                layout="vertical"
                style={{ width: '100%' }}
              >
                <Form.Item name="sortMethod" label="SORT BY">
                  <Radio.Group
                    defaultValue="name"
                    optionType="button"
                    buttonStyle="solid"
                  >
                    <Radio.Button value="name">Name</Radio.Button>
                    <Radio.Button value="price">Price</Radio.Button>
                    <Radio.Button value="category">Category</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name="sortOrder" label="SORT ORDER">
                  <Radio.Group
                    defaultValue="asc"
                    optionType="button"
                    buttonStyle="solid"
                  >
                    <Radio.Button value="asc">Ascending</Radio.Button>
                    <Radio.Button value="desc">Descending</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Divider />
                <Form.Item name="name" label="SEARCH BY NAME">
                  <Input placeholder="Enter product name" />
                </Form.Item>
                <Form.Item name="category" label="SEARCH BY CATEGORY">
                  <Select
                    placeholder="Select a category"
                    onChange={(value) => value}
                    defaultValue='all'
                  >
                    <Select.Option value='all'>All categories</Select.Option>
                    {categories.map((category, index) => (
                      <Select.Option key={index} value={category._id}>
                        {category.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="price" label="SEARCH BY PRICE">
                  <Slider
                    style={{ width: '80%', margin: '0 auto' }}
                    marks={{
                      0: '0 VND',
                      1000000: '1000000 VND',
                    }}
                    range
                    step={1000}
                    min={0}
                    max={1000000}
                    defaultValue={[0, 1000000]}
                  />
                </Form.Item>
                <Form.Item>
                <Divider />
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Search
                  </Button>
                </Form.Item>
              </Form>
            </article>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
};
