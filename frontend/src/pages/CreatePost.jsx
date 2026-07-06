import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function CreatePost() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    type: "",
    image: "",
    location: "",
    contactInfo: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first");
      return;
    }

    try {
      const response = await api.post("/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/posts");
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form create-post-form" onSubmit={handleCreatePost}>
        <h2>Create Post</h2>

        <input
          type="text"
          name="title"
          placeholder="Post title"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Post description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price, use 0 for lost/found"
          value={formData.price}
          onChange={handleChange}
        />

        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="Books">Books</option>
          <option value="Electronics">Electronics</option>
          <option value="Hostel Items">Hostel Items</option>
          <option value="Cycles">Cycles</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
          <option value="Others">Others</option>
        </select>

        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="">Select Type</option>
          <option value="Sell">Sell</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>

        <input
          type="text"
          name="image"
          placeholder="Image/proof link, optional"
          value={formData.image}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <input
          type="text"
          name="contactInfo"
          placeholder="Contact info"
          value={formData.contactInfo}
          onChange={handleChange}
        />

        <button type="submit">Create Post</button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default CreatePost;