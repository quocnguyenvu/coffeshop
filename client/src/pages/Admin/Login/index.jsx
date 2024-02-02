import axios from 'axios';
import axiosClient from '../../../config/axios';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
      phoneNumber: event.target.phoneNumber.value,
      password: event.target.password.value,
    });

    if (response.status === 200) {
      localStorage.setItem('token', response.data.token);
      axiosClient.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.token}`;
      navigate('/admin');
    }
  };

  return (
    <div id="login">
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={handleLogin}>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                className="login__input"
                placeholder="Nhập số điện thoại của bạn"
                name="phoneNumber"
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Nhập mật khẩu của bạn"
                name="password"
              />
            </div>
            <button className="button login__submit" type="submit">
              <span className="button__text">Đăng nhập</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};
