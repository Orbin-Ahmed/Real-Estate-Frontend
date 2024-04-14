import { useState } from "react";
import { register } from "../../api";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const result = await register(username, email, password);
    if (result === "OK") {
      navigate("/login");
    } else {
      setError(result);
    }
    setIsLoading(false);
  };
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input
            name="username"
            required
            max={20}
            min={3}
            type="text"
            placeholder="Username"
          />
          <input name="email" required type="text" placeholder="Email" />
          <input
            name="password"
            required
            type="password"
            placeholder="Password"
          />
          <button disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
