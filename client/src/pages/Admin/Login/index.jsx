import { useMutation } from "react-query";
import { loginUser } from "../../../api/login";
import { useNavigate } from "react-router-dom";
// import jwt from "jsonwebtoken";

export const Login = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation(loginUser, {
    onSuccess: (token) => {
      localStorage.setItem("token", token);

      if (isValidToken(token)) {
        navigate("/admin");
      }

    },
  });

  const isValidToken = (token) => {
    return true;
    // try {
    //   const decodedToken = jwt.verify(token, 'your_secret_key');

    //   if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
    //     return false;
    //   }

    // } catch (error) {
    //   console.error('Token validation error:', error);
    //   return false;
    // }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;

    mutate({
      username: username.value,
      password: password.value,
    });
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
};
