import { ShoppingCartOutlined, AlignLeftOutlined, CloseOutlined } from '@ant-design/icons'
import logodark from '@assets/logo/logo-dark.png'
import logo from '@assets/logo/logo.png'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Container } from '@components/Container'

import './Header.scss'

export const Header = ({ isSticky = true, isScrolling = true }) => {
  const navigate = useNavigate()
  const [scrolling, setScrolling] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const handleResize = () => {
    setScreenWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const totalCartItems = JSON.parse(localStorage.getItem('cart'))?.length || 0

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) {
        setScrolling(0 < window.scrollY)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleCloseMenu = () => {
    document.querySelector('.header-menu').style.right = '-100%'
  }

  const handleOpenMenu = () => {
    document.querySelector('.header-menu').style.right = '0'
  }

  return (
    <>
      <header className={scrolling ? 'header-sticky' : ''}>
        <Container>
          <section className="header-wrap">
            <div className="header-logo">
              <Link to="/">
                <img alt="" src={scrolling || !isSticky ? logodark : logo} />
              </Link>
            </div>
            <ul className="header-menu">
              <li className="close-menu" onClick={handleCloseMenu}>
                <CloseOutlined />
              </li>
              <li>
                <Link to="/">Trang chủ</Link>
              </li>
              <li>
                <Link to="/blogs">Bài viết</Link>
              </li>
              <li>
                <Link to="/shop">Sản phẩm</Link>
              </li>
              <li>
                <Link to="/contact">Liên hệ</Link>
              </li>
              <li className="cart-link">
                <div className="header-inner">
                  <span onClick={() => navigate('/cart')}>
                    {1024 < screenWidth ? (
                      <>
                        <ShoppingCartOutlined
                          style={{
                            fontSize: 30,
                            fontWeight: 'bold',
                            color: scrolling || !isSticky ? '#333' : '#fff'
                          }}
                        />
                        <span
                          style={{
                            fontWeight: 'bold',
                            color: scrolling || !isSticky ? '#333' : '#fff'
                          }}
                        >
                          {totalCartItems}
                        </span>
                      </>
                    ) : (
                      <>
                        <span>Giỏ hàng</span>
                        <span
                          style={{
                            fontWeight: 'bold',
                            color: '#333'
                          }}
                        >
                          {` (${totalCartItems})`}
                        </span>
                      </>
                    )}
                  </span>
                </div>
              </li>
            </ul>
            <div className="open-menu" style={{ color: scrolling || !isSticky ? '#333' : '#fff' }} onClick={handleOpenMenu}>
              <AlignLeftOutlined />
            </div>
          </section>
        </Container>
      </header>
    </>
  )
}

Header.propTypes = {
  isScrolling: PropTypes.bool,
  isSticky: PropTypes.bool
}
