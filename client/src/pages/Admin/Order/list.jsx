import { Button, Space, Table, Modal, Select, Tag, Collapse, Form, Input, Row, Col, Divider, message } from 'antd'
import { useEffect, useState } from 'react'

import { CustomerInfomation } from './CustomerInfomation'
import { OrderProductsInfomation } from './OrderProductsInfomation'
import axiosClient from '../../../config/axios'
import { displayStatus, displayStatusColor, formattedPrice } from '../../../helper'

const { Option } = Select
const { Panel } = Collapse

import './OrderList.scss'

export const OrderList = () => {
  const [form] = Form.useForm()
  const [orders, setOrders] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  })

  const [selectedOrderId, setSelectedOrderId] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [modalDetailVisible, setModalDetailVisible] = useState(false)
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null)

  const fetchOrders = async (values = {}) => {
    try {
      const response = await axiosClient.get('order', {
        params: {
          ...values,
          page: pagination.current,
          limit: pagination.pageSize,
          sortBy: 'dateCreate',
          sortMethod: 'desc'
        }
      })
      setOrders(response.data.orders)
      setPagination({
        ...pagination,
        total: response.data.total
      })
    } catch (error) {
      message.error('Lỗi khi lấy danh sách đơn hàng!')
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [pagination.current, pagination.pageSize])

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination({
      ...pagination,
      sortField: sorter.field,
      sortOrder: sorter.order
    })
  }

  const changeOrderStatus = async () => {
    try {
      if (!selectedStatus) {
        message.warning('Vui lòng chọn trạng thái')
        return
      }

      await axiosClient.put(`order/${selectedOrderId}/change-status`, {
        status: selectedStatus
      })

      fetchOrders()
      setModalVisible(false)
      message.success('Đổi trạng thái thành công!')
    } catch (error) {
      console.error('Error changing order status:', error)
      message.error('Đổi trạng thái thất bại!')
    }
  }

  const onFinish = async (values) => {
    fetchOrders(values)
  }

  const columns = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'customerName',
      key: 'customerName'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <span>{formattedPrice(amount)}</span>
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={displayStatusColor(status)} key={status}>
          {displayStatus(status)}
        </Tag>
      )
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'dateCreate',
      key: 'dateCreate',
      render: (createdAt) => new Date(createdAt).toLocaleString()
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setSelectedOrderDetail(record)
              setModalDetailVisible(true)
            }}
          >
            Chi Tiết
          </Button>
          <Button
            danger
            onClick={() => {
              setSelectedOrderId(record._id)
              setModalVisible(true)
            }}
          >
            Đổi trạng thái
          </Button>
        </Space>
      )
    }
  ]

  return (
    <>
      <Collapse>
        <Panel header="Tìm kiếm đơn hàng" key="1">
          <Form form={form} layout="vertical" name="control-hooks" style={{ width: '100%' }} onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="Tên khách hàng" name="customerName">
                  <Input placeholder="Nhập tên khách hàng" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Số điện thoại" name="phoneNumber">
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Trạng thái" name="status">
                  <Select placeholder="Chọn trạng thái" style={{ width: '100%' }}>
                    <Option value="Confirmed">Đã xác nhận</Option>
                    <Option value="Shipped">Đang vận chuyển</Option>
                    <Option value="Delivered">Đã nhận hàng</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Space>
                <Button htmlType="submit" type="primary">
                  Tìm kiếm
                </Button>
                <Button
                  onClick={() => {
                    form.resetFields()
                    fetchOrders()
                  }}
                >
                  Xóa bộ lọc
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
      <Table columns={columns} dataSource={orders} pagination={pagination} onChange={handleTableChange} />
      <Modal open={modalVisible} title="Chọn trạng thái" onCancel={() => setModalVisible(false)} onOk={changeOrderStatus}>
        <Select placeholder="Chọn trạng thái" style={{ width: '100%' }} onChange={(value) => setSelectedStatus(value)}>
          <Option value="confirmed">Đã xác nhận</Option>
          <Option value="shipping">Đang vận chuyển</Option>
          <Option value="success">Đã nhận hàng</Option>
          <Option value="cancel">Hủy đơn hàng</Option>
        </Select>
      </Modal>

      <Modal
        okButtonProps={{ style: { display: 'none' } }}
        open={modalDetailVisible}
        style={{
          maxHeight: '80vh',
          overflowY: 'auto'
        }}
        title="Chi tiết đơn hàng"
        onCancel={() => setModalDetailVisible(false)}
      >
        <section id="order-detail">
          <Divider orientation="left" style={{ borderColor: '#333' }}>
            <span style={{ fontSize: 24 }}>THÔNG TIN SẢN PHẨM</span>
          </Divider>

          <OrderProductsInfomation order={selectedOrderDetail} />

          <Divider orientation="left" style={{ borderColor: '#333' }}>
            <span style={{ fontSize: 24 }}>THÔNG TIN KHÁCH HÀNG</span>
          </Divider>

          <CustomerInfomation order={selectedOrderDetail} />
        </section>
      </Modal>
    </>
  )
}
