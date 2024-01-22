import img1 from "../../../../assets/bg/img-home-3.png";
import product1 from "../../../../assets/products/8-min-480x480.jpg";
import product2 from "../../../../assets/products/00-min-480x480.jpg";
import product3 from "../../../../assets/products/6-min-480x480.jpg";

import { Container } from "../../../../components/Container";

import "./OurBlends.scss";

export const OurBlends = () => {
  return (
    <section id="home-our-blends">
      <img src={img1} alt="" />
      <Container>
        <article className="dat-title">
          <span className="sub-title">OUR BLENDS</span>
          <h1 className="title">
            <span> Coffee Blends and Roasts for Discerning Tastes </span>
          </h1>
        </article>
        <section className="list-products">
          <article className="product" data-aos="fade-right">
            <div className="product-image">
              <img
                src={product1}
                alt="The Acacia Hills Blend"
              />
            </div>
            <div className="product-info">
              <div className="product-kind">Cappuccino, Ground, Robusta</div>
              <div className="product-name">The Acacia Hills Blend</div>
              <div className="product-price">200.000 VND</div>
              <div className="product-rate">
                <img src="./assets/icons/star.svg" alt="Star" />
                <img src="./assets/icons/star.svg" alt="Star" />
                <img src="./assets/icons/star.svg" alt="Star" />
                <img src="./assets/icons/star.svg" alt="Star" />
                <img src="./assets/icons/star.svg" alt="Star" />
              </div>
            </div>
          </article>
          <article className="product" data-aos="fade-up">
            <div className="product-image">
              <img
                src={product2}
                alt="Blend of Strong Coffee"
              />
            </div>
            <div className="product-info">
              <div className="product-kind">Cappuccino, Ground, Robusta</div>
              <div className="product-name">The Acacia Hills Blend</div>
              <div className="product-price">200.000 VND</div>
              <div className="product-rate">
                <img src="./assets/icons/star.svg" alt="Star" />
                <img src="./assets/icons/star.svg" alt="Star" />
                <img src="./assets/icons/star.svg" alt="Star" />
                <img src="./assets/icons/star.svg" alt="Star" />
                <img src="./assets/icons/star.svg" alt="Star" />
              </div>
            </div>
          </article>
          <article className="product" data-aos="fade-left">
            <div className="product-image">
              <img
                src={product3}
                alt="Space Coffee Blend"
              />
            </div>

            <div className="product-info">
              <div className="product-kind">Cappuccino, Ground, Robusta</div>
              <div className="product-name">The Acacia Hills Blend</div>
              <div className="product-price">200.000 VND</div>
              <div className="product-rate">
                <img src="./assets/icons/star.svg" alt="Star" />
                <img src="./assets/icons/star.svg" alt="Star" />
                <img src="./assets/icons/star.svg" alt="Star" />
                <img src="./assets/icons/star.svg" alt="Star" />
                <img src="./assets/icons/star.svg" alt="Star" />
              </div>
            </div>
          </article>
        </section>
      </Container>
    </section>
  );
};
