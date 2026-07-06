import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function EditPost() {
  const { id } = useParams();
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

  const [message, setMessage] = useState("Loading post...");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);

        const post = response.data.post;

        setFormData({
          title: post.title || "",
          description: post.description || "",
          price: post.price || "",
          category: post.category || "",
          type: post.type || "",
          image: post.image || "",
          location: post.location || "",
          contactInfo: post.contactInfo || "",
        });

        setMessage("");
      } catch (error) {
        console.log(error);
        setMessage("Failed to load post");
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.put(`/posts/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/my-posts");
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Failed to update post");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form create-post-form" onSubmit={handleUpdatePost}>
        <h2>Edit Post</h2>

        {message && <p className="message">{message}</p>}

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
          placeholder="Price"
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

        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}

export default EditPost;