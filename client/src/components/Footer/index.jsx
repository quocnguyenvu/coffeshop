import logo from '@assets/logo/datcf.png'
import { Link } from 'react-router-dom'

import { Container } from '../Container'

import './Footer.scss'

export const Footer = () => (
  <footer>
    <Container>
      <section className="footer">
        <div className="footer__logo">
          <Link to="/">
            <img alt="" src={logo} style={{ maxWidth: 200 }} />
          </Link>
        </div>
        <nav className="footer__nav">
          <ul>
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <Link to="/blogs">bài viết</Link>
            </li>
            <li>
              <Link to="/shop">Sản phẩm</Link>
            </li>
            <li>
              <Link to="/contact">Liên hệ</Link>
            </li>
          </ul>
        </nav>
        <div className="footer__social">
          <ul>
            <li>
              <a href="#">
                <svg fill="#3a86ff" height="30px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#">
                <svg fill="#3a86ff" height="30px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#">
                <svg fill="#3a86ff" height="30px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#">
                <svg fill="#3a86ff" height="30px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__copy">
          <p>Bản quyền thuộc về DAT COFFEE | Thiết kế website bởi DAT</p>
        </div>
      </section>
    </Container>
  </footer>
)
