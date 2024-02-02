import { formattedPrice } from '../../../helper'
import PropTypes from 'prop-types'

export const OrderProductsInfomation = ({ order }) => {
  return (
    <>
      {order?.products.map((product) => (
        <div className="item" key={product.key}>
          <div className="item_image">
            <img src={product.productId.images[0]} alt={product.name} />
          </div>
          <table>
            <tbody>
              <tr>
                <td>Tên sản phẩm</td>
                <td>{product.productId.name}</td>
              </tr>
              <tr>
                <td>Giá</td>
                <td>{formattedPrice(product.price)}</td>
              </tr>
              <tr>
                <td>Số lượng</td>
                <td>{product.quantity}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </>
  )
}

OrderProductsInfomation.propTypes = {
  order: PropTypes.object
}
