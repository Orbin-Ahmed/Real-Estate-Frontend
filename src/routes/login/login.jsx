import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api";
import { AuthContext } from "../../context/authContext";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const { updateUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsloading(true);
    setError("");
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");
    const result = await login(username, password);
    if (result.status === 200) {
      updateUser(result.data?.userInfo);
      navigate("/");
    } else {
      setError(result);
    }
    setIsloading(false);
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            max={20}
            min={3}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            required
            type="password"
            placeholder="Password"
          />
          <button disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
