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

  const totalCartItems = JSON.parse(localStorage.getItem('cart')).length || 0;

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCloseMenu = () => {
    document.querySelector('#header').classList.remove('active');
  };

  const handleOpenMenu = () => {
    document.querySelector('#header').classList.add('active');
  };

  return (
    <>
      <div className="btn-menu" onClick={handleOpenMenu}>
        Menu
      </div>
      <header className={scrolling ? 'header_background' : ''} id="header">
        <Container>
          <div className="header_wrap">
            <div className="btn-close" onClick={handleCloseMenu}>
              Close
            </div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Trang chủ</Link>
                </li>
                <li>
                  <Link to="/blogs">Về Chúng tôi</Link>
                </li>
                <li>
                  <Link to="/shop">SẢN PHẨM</Link>
                </li>
                <li>
                  <Link to="/contact">Liên hệ</Link>
                </li>
                <li className="cart-link">
                  <Link to="/cart">Giỏ hàng</Link>
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
                <span
                  style={{
                    fontWeight: 'bold',
                    color: scrolling ? '#333' : '#fff',
                  }}
                >
                  {totalCartItems}
                </span>
              </span>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};
