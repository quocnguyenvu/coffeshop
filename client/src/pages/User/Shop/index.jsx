import { Filters } from '@user/Shop/Filters'
import { Button, Divider, Empty, Form, Space } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'

import { Container } from '@components/Container'
import { Footer } from '@components/Footer'
import { PageBanner } from '@components/PageBanner'
import { Product } from '@components/Product'

import { API_USER_URL } from '../../../constants'

import './Shop.scss'

export const ShopPage = () => {
  const [form] = Form.useForm()
  const [categories, setCategories] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${API_USER_URL}/categories`)
      setCategories(data.data.categories)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchProducts = async (params) => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_USER_URL}/products`, {
        params: {
          name: params?.name,
          category: 'all' !== params?.category ? params?.category : undefined,
          minPrice: params?.minPrice,
          maxPrice: params?.maxPrice,
          sortMethod: params?.sortMethod ?? 'name',
          sortOrder: params?.sortOrder ?? 'asc'
        }
      })

      const { data } = response
      setSearchResults(data.data.products)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [])

  const onFinish = async (values) => {
    try {
      const { name, category, price, sortMethod, sortOrder } = values

      const minPrice = price && 1 <= price?.length ? price[0] : undefined
      const maxPrice = price && 2 === price?.length ? price[1] : undefined

      await fetchProducts({
        name,
        category,
        minPrice,
        maxPrice,
        sortMethod,
        sortOrder
      })
    } catch (error) {
      console.error('Error fetching search results:', error)
    }
  }

  return (
    <>
      <section id="shop">
        <Filters categories={categories} form={form} loading={loading} open={open} setOpen={setOpen} onFinish={onFinish} />
        <PageBanner title="SẢN PHẨM CỦA CHÚNG TÔI" />
        <Container>
          <Divider orientation="left" style={{ borderColor: '#333' }}>
            <span style={{ fontSize: 24 }}>SẢN PHẨM</span>
          </Divider>
          <Space
            style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Button type="primary" onClick={() => setOpen(true)}>
              Tìm kiếm
            </Button>
          </Space>
          <div className="shop_wrapper">
            <article className="list-products">
              {searchResults && 0 < searchResults?.length ? (
                searchResults.map((product, index) => <Product key={index} product={product} />)
              ) : (
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Empty />
                </div>
              )}
            </article>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  )
}
