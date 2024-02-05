import img1 from '@assets/img/img-home-1.jpg'
import img2 from '@assets/img/img-home-2.jpg'

import { Container } from '@components/Container'

import './OurCoffee.scss'

export const OurCoffee = () => (
  <section id="home-out-coffee">
    <Container>
      <article className="wrapper">
        <article className="left-content">
          <div className="dat-title" data-aos="fade-right" data-aos-duration="2000">
            <span className="sub-title">OUR COFFEE</span>
            <h1 className="title">
              <span>We Grow & Harvest Every Coffee Grain with Love</span>
            </h1>
          </div>
          <div className="dat-image">
            <img alt="" data-aos="fade-up-right" data-aos-duration="2000" src={img1} />
          </div>
        </article>
        <article className="right-content">
          <div className="dat-image">
            <img alt="" data-aos="fade-up-left" data-aos-duration="2000" src={img2} />
          </div>
          <div className="dat-text" data-aos="fade-up" data-aos-duration="2000">
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Nisl tincidunt eget nullam non. Quis hendrerit.
            </span>
          </div>
        </article>
      </article>
    </Container>
  </section>
)
