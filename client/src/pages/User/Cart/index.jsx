import { Button, Divider, Modal, Space, Table } from 'antd'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Container } from '@components/Container'
import { Footer } from '@components/Footer'
import { PageBanner } from '@components/PageBanner'

import { API_USER_URL } from '../../../constants'
import { formattedPrice } from '../../../helper'

const { Column } = Table

import './Cart.scss'

export const CartPage = () => {
  const navigate = useNavigate()

  const [cartData, setCartData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [deleteModalProductId, setDeleteModalProductId] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || []
      const productIds = storedCart.map((item) => item.productId)
      if (0 === productIds?.length) {
        return
      }
      try {
        setLoading(true)
        const response = await axios.get(`${API_USER_URL}/products`, {
          params: {
            ids: productIds
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

    fetchProducts()
  }, [])

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || []
    const updatedCartData = storedCart.map((item) => {
      const product = searchResults.find((product) => product?.id === item.productId)
      return {
        key: product?.id,
        product,
        price: product?.price,
        quantity: item.quantity,
        amount: product?.price * item.quantity
      }
    })
    setCartData(updatedCartData)
  }, [searchResults])

  const handleDecreaseQuantity = (record) => {
    const updatedCartData = cartData.map((item) => {
      if (item.key === record.key && 1 < item.quantity) {
        return {
          ...item,
          quantity: item.quantity - 1,
          amount: item.price * (item.quantity - 1)
        }
      }
      return item
    })
    setCartData(updatedCartData)

    const updatedCart = updatedCartData.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity
    }))
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const handleIncreaseQuantity = (record) => {
    const updatedCartData = cartData.map((item) => {
      if (item.key === record.key) {
        return {
          ...item,
          quantity: item.quantity + 1,
          amount: item.price * (item.quantity + 1)
        }
      }
      return item
    })
    setCartData(updatedCartData)

    const updatedCart = updatedCartData.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity
    }))
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const showDeleteModal = (productId) => {
    setDeleteModalVisible(true)
    setDeleteModalProductId(productId)
  }

  const handleDeleteConfirm = () => {
    setDeleteModalVisible(false)

    const updatedCartData = cartData.filter((item) => item.key !== deleteModalProductId)
    setCartData(updatedCartData)

    const updatedCart = updatedCartData.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity
    }))
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const handlePay = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || []
    const productIds = storedCart.map((item) => item.productId)

    if (0 === productIds?.length) {
      return
    }

    navigate('/checkout', { state: { cartData } })
  }

  const total = cartData.reduce((total, item) => total + item.amount, 0)

  return (
    <>
      <PageBanner title="CART" />
      <section id="cart">
        <Container>
          <Divider orientation="left" style={{ borderColor: '#333' }}>
            <span style={{ fontSize: 24 }}>GIỎ HÀNG CỦA BẠN</span>
          </Divider>
          <Table dataSource={cartData} loading={loading} pagination={false} scroll={{ x: 800 }}>
            <Column
              dataIndex="product"
              key="product"
              render={(_, record) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img alt={record.product?.name} src={record.product?.images[0]} style={{ width: '100px', height: '100px' }} />
                  <span style={{ marginLeft: 20 }}>{record.product?.name}</span>
                </div>
              )}
              title="Thông tin sản phẩm"
            />
            <Column dataIndex="price" key="price" render={(_, record) => formattedPrice(record.price)} title="Đơn giá" />
            <Column
              dataIndex="quantity"
              key="quantity"
              render={(_, record) => (
                <div className="quantity-input">
                  <button onClick={() => handleDecreaseQuantity(record)}>-</button>
                  <div>{record.quantity}</div>
                  <button onClick={() => handleIncreaseQuantity(record)}>+</button>
                </div>
              )}
              title="Số lượng"
            />
            <Column dataIndex="amount" key="amount" render={(_, record) => formattedPrice(record.amount)} title="Thành tiền" />

            <Column
              key="action"
              render={(_, record) => (
                <>
                  <Button danger onClick={() => showDeleteModal(record.key)}>
                    Delete
                  </Button>
                  <Modal
                    open={deleteModalVisible}
                    title="Confirm Delete"
                    onCancel={() => setDeleteModalVisible(false)}
                    onOk={handleDeleteConfirm}
                  >
                    <p>Are you sure you want to delete this item from your cart?</p>
                  </Modal>
                </>
              )}
            />
          </Table>
          <Space
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 20,
              marginTop: 30
            }}
          >
            <div>
              <span>Tổng tiền: </span>
              <span>{formattedPrice(total)}</span>
            </div>
            <Button type="primary" onClick={handlePay}>
              Thanh toán
            </Button>
          </Space>
        </Container>
      </section>
      <Footer />
    </>
  )
}
