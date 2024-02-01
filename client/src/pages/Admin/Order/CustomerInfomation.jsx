import { Tag } from 'antd';
import {
  displayPaymentMethod,
  displayShipMethod,
  displayStatus,
  displayStatusColor,
  formattedPrice,
} from '../../../helper';
import PropTypes from 'prop-types';

export const CustomerInfomation = ({ order }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>Tên khách hàng</td>
          <td>{order?.customerName}</td>
        </tr>
        <tr>
          <td>Số điện thoại</td>
          <td>{order?.phoneNumber}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{order?.email}</td>
        </tr>
        <tr>
          <td>Địa chỉ</td>
          <td>{order?.address}</td>
        </tr>
        <tr>
          <td>Tổng tiền</td>
          <td>{formattedPrice(order?.amount)}</td>
        </tr>
        <tr>
          <td>Trạng thái</td>
          <td>
            <Tag color={displayStatusColor(order?.status)}>
              {displayStatus(order?.status)}
            </Tag>
          </td>
        </tr>
        <tr>
          <td>Phương thức thanh toán</td>
          <td>{displayPaymentMethod(order?.paymentMethod)}</td>
        </tr>
        <tr>
          <td>Phương thức vận chuyển</td>
          <td>{displayShipMethod(order?.shipMethod)}</td>
        </tr>
        <tr>
          <td>Ghi chú</td>
          <td>{order?.note}</td>
        </tr>
      </tbody>
    </table>
  );
};

CustomerInfomation.propTypes = {
  order: PropTypes.object,
};
