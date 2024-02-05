import { message } from 'antd'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { formattedPrice } from '../../helper'

import './Product.scss'

export const Product = ({ product }) => {
  const navigate = useNavigate()

  const handleAddToCart = (event) => {
    event.stopPropagation()
    const cart = JSON.parse(localStorage.getItem('cart')) || []

    const existingProduct = cart.find((item) => item.productId === product.id)

    if (existingProduct) {
      existingProduct.quantity += 1
    } else {
      cart.push({ productId: product.id, quantity: 1, price: product.price })
    }
    localStorage.setItem('cart', JSON.stringify(cart))

    message.success(`${product.name} added to cart!`)
  }

  const handleClickItem = () => {
    navigate(`/product/${product.id}`)
  }

  return (
    <article className="product" onClick={handleClickItem}>
      <div className="product-image">
        <img alt={product.name} src={product.images[0]} />
      </div>
      <div className="product-info">
        <div className="product-name">{product.name}</div>
        <div className="product-price">{formattedPrice(product.price)}</div>
        <div className="product-category">{product.categoryId?.name}</div>
      </div>
      <button onClick={handleAddToCart}>Add to cart</button>
    </article>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired
}
