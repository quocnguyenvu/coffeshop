import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import './Product.scss';
import axios from 'axios';
import { API_USER_URL } from '../../constants';

export const Product = ({ product }) => {
  const formattedPrice =
    product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VND';

  const handleAddToCart = async () => {
    try {
      await axios.post(`${API_USER_URL}/cart`, {
        productId: product._id,
        quantity: 1,
      });

      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Error adding to cart!');
    }
  };

  return (
    <article className="product">
      <div className="product-image">
        <img src={product.images[0]} alt={product.name} />
      </div>
      <div className="product-info">
        <div className="product-name">{product.name}</div>
        <div className="product-price">{formattedPrice}</div>
        <div className="product-category">{product.categoryId?.name}</div>
      </div>
      <button onClick={handleAddToCart}>Add to cart</button>
    </article>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};
