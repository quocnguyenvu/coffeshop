import { useLoginMutation } from "../../../api/login";
import "./Login.scss";

export const Login = () => {
  const { mutate } = useLoginMutation();

  const handleLogin = (event) => {
    event.preventDefault();

    const phoneNumber = event.target[0].value;
    const password = event.target[1].value;

    mutate({ phoneNumber, password });
  }

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
                placeholder="Phone Number"
                name="phoneNumber"
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                name="password"
              />
            </div>
            <button className="button login__submit" type="submit">
              <span className="button__text">Log In Now</span>
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
