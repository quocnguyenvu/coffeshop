import { Link } from 'react-router-dom';
import { Container } from '../Container';

import logo from '../../assets/logo/logo-footer.png';

import './Footer.scss';

export const Footer = () => {
  return (
    <footer>
      <Container>
        <section className="footer">
          <div className="footer__logo">
            <img src={logo} alt="" />
          </div>
          <nav className="footer__nav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/blogs">Blogs</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
          <div className="footer__social">
            <ul>
              <li>
                <a href="#">0</a>
              </li>
              <li>
                <a href="#">0</a>
              </li>
              <li>
                <a href="#">0</a>
              </li>
              <li>
                <a href="#">0</a>
              </li>
            </ul>
          </div>
          <div className="footer__copy">
            <p>DAT Coffee © 2024. All Rights Reserved.</p>
          </div>
        </section>
      </Container>
    </footer>
  );
};
