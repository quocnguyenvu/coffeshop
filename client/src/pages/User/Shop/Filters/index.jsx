import { Button, Divider, Drawer, Form, Input, Radio, Select, Slider } from 'antd'
import PropTypes from 'prop-types'

export const Filters = ({ categories, onFinish, form, loading, open, setOpen }) => {
  return (
    <Drawer title="Tìm kiếm sản phẩm" onClose={() => setOpen(false)} open={open}>
      <Form form={form} name="control-hooks" onFinish={onFinish} layout="vertical" style={{ width: '100%' }}>
        <Form.Item name="sortMethod" label="SẮP XẾP THEO">
          <Radio.Group defaultValue="name" optionType="button" buttonStyle="solid">
            <Radio.Button value="name">Tên</Radio.Button>
            <Radio.Button value="price">Giá</Radio.Button>
            <Radio.Button value="category">Danh mục</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="sortOrder" label="THỨ TỰ SẮP XẾP">
          <Radio.Group defaultValue="asc" optionType="button" buttonStyle="solid">
            <Radio.Button value="asc">Tăng dần</Radio.Button>
            <Radio.Button value="desc">Giảm dần</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="name" label="TÌM KIẾM THEO TÊN SẢN PHẨM">
          <Input placeholder="Robusta" />
        </Form.Item>
        <Form.Item name="category" label="TÌM KIẾM THEO DANH MỤC">
          <Select placeholder="Espresso" onChange={(value) => value} defaultValue="all">
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
              1000000: '1000000 VND'
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
          <Button style={{ width: '100%' }} type="primary" htmlType="submit" loading={loading} onClick={() => setOpen(false)}>
            TÌM KIẾM
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

Filters.propTypes = {
  categories: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
}
