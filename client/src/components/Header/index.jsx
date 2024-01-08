import { Link } from "react-router-dom";
import "./Header.scss";

export const Header = () => (
  <header>
    <div id="container">
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
        </ul>
      </nav>
      <div className="logo">
        <img src="/assets/logo/logo.png" alt="" />
      </div>
      <div className="header-inner">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 0 512 512"
          >
            <path
              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
              fill="#ffffff"
            />
          </svg>
        </span>
      </div>
    </div>
  </header>
);
