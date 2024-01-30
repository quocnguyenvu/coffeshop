import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container } from '../Container';
import { ShoppingCartOutlined } from '@ant-design/icons';

import logo from '../../assets/logo/logo.png';
import logodark from '../../assets/logo/logo-dark.png';
import './Header.scss';

export const Header = () => {
  const navigate = useNavigate();
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const hanldeCloseMenu = () => {
    document.querySelector('#header').classList.remove('active');
  };

  const hanldeOpenMenu = () => {
    document.querySelector('#header').classList.add('active');
  };

  return (
    <>
      <div className='btn-menu' onClick={hanldeOpenMenu}>Menu</div>
      <header className={scrolling ? 'header_background' : ''} id="header">
        <Container>
          <div className="header_wrap">
            <div className="btn-close" onClick={hanldeCloseMenu}>
              Close
            </div>
            <nav>
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
                <li className="cart-link">
                  <Link to="/cart">Cart</Link>
                </li>
              </ul>
            </nav>
            <div className="logo">
              <img src={scrolling ? logodark : logo} alt="" />
            </div>
            <div className="header-inner">
              <span onClick={() => navigate('/cart')}>
                <ShoppingCartOutlined
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: scrolling ? '#333' : '#fff',
                  }}
                />
              </span>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};
