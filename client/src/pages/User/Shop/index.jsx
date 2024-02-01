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
  Slider,
} from 'antd';
import { FilterOutlined } from '@ant-design/icons';
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

  const handleCloseFilter = () => {
    document.querySelector('.filters').style.transform =
      'translateY(-50%) translateX(100%)';
  };

  const handleOpenFilter = () => {
    document.querySelector('.filters').style.transform =
      'translateY(-50%) translateX(0)';
  };

  return (
    <>
      <PageBanner title="SẢN PHẨM CỦA CHÚNG TÔI" />
      <section id="shop">
        <div className="btn-open-filter" onClick={handleOpenFilter}>
          <FilterOutlined />
        </div>
        <Container>
          <Divider style={{ borderColor: '#333' }} orientation="left">
            <span style={{ fontSize: 24 }}>SẢN PHẨM</span>
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
              <Form
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                layout="vertical"
                style={{ width: '100%' }}
              >
                <Form.Item name="sortMethod" label="SẮP XẾP THEO">
                  <Radio.Group
                    defaultValue="name"
                    optionType="button"
                    buttonStyle="solid"
                  >
                    <Radio.Button value="name">Tên</Radio.Button>
                    <Radio.Button value="price">Giá</Radio.Button>
                    <Radio.Button value="category">Danh mục</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name="sortOrder" label="THỨ TỰ SẮP XẾP">
                  <Radio.Group
                    defaultValue="asc"
                    optionType="button"
                    buttonStyle="solid"
                  >
                    <Radio.Button value="asc">Tăng dần</Radio.Button>
                    <Radio.Button value="desc">Giảm dần</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name="name" label="TÌM KIẾM THEO TÊN SẢN PHẨM">
                  <Input placeholder="Robusta" />
                </Form.Item>
                <Form.Item name="category" label="TÌM KIẾM THEO DANH MỤC">
                  <Select
                    placeholder="Espresso"
                    onChange={(value) => value}
                    defaultValue="all"
                  >
                    <Select.Option value="all">Tất cả</Select.Option>
                    {categories.map((category, index) => (
                      <Select.Option key={index} value={category._id}>
                        {category.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="price" label="KHOẢNG GIÁ">
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
                  <Button
                    style={{ width: '100%' }}
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                  >
                    TÌM KIẾM
                  </Button>
                </Form.Item>
                <Button
                  className="btn-close-filter"
                  danger
                  onClick={handleCloseFilter}
                  style={{ width: '100%' }}
                >
                  Close
                </Button>
              </Form>
            </article>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  );
};
