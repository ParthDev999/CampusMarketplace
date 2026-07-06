import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/signup", formData);

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSignup}>
        <h2>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="collegeId"
          placeholder="Enter college ID e.g. 2024UEC1469"
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

        <button type="submit">Signup</button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default Signup;