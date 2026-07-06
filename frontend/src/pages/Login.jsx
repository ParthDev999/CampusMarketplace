import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    collegeId: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setMessage("Login successful");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="text"
          name="collegeId"
          placeholder="Enter college ID"
          value={formData.collegeId}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>

        <p className="auth-switch">
          New user? <Link to="/signup">Signup</Link>
        </p>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default Login;