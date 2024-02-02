export const formattedPrice = (price) => `${price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND`

export const displayShipMethod = (shipMethod) => {
  switch (shipMethod) {
    case 'save':
      return 'Giao hàng tiêu chuẩn'
    case 'fast':
      return 'Giao hàng nhanh'
    default:
      return 'Giao hàng tiêu chuẩn'
  }
}

export const displayPaymentMethod = (paymentMethod) => {
  switch (paymentMethod) {
    case 'cod':
      return 'Thanh toán khi nhận hàng'
    case 'atm':
      return 'Chuyển khoản qua ngân hàng'
    default:
      return 'Thanh toán khi nhận hàng'
  }
}

export const displayStatus = (status) => {
  switch (status) {
    case 'pending':
      return 'Đang chờ xử lý'
    case 'confirmed':
      return 'Đã xác nhận'
    case 'shipping':
      return 'Đang giao hàng'
    case 'success':
      return 'Đã giao hàng'
    case 'cancel':
      return 'Đã hủy'
    default:
      return 'Đang chờ xử lý'
  }
}

export const displayStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'orange'
    case 'confirmed':
      return 'blue'
    case 'shipping':
      return 'green'
    case 'success':
      return 'green'
    case 'cancel':
      return 'red'
    default:
      return 'orange'
  }
}
