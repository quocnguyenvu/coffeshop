import PropTypes from "prop-types";

export const Product = ({ product }) => {
  return (
    <article className="product">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <div className="product-kind">{product.category}</div>
        <div className="product-name">{product.name}</div>
        <div className="product-price">{product.price}</div>
        <div className="product-rate">
          {[...Array(product.rating)].map((_, index) => (
            <img key={index} src="../../assets/icons/star.svg" alt="Star" />
          ))}
        </div>
      </div>
    </article>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};
