import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("Loading posts...");

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    type: "",
  });

  const getValidLink = (link) => {
    if (!link) return "";

    if (link.startsWith("http://") || link.startsWith("https://")) {
      return link;
    }

    return `https://${link}`;
  };

  const fetchPosts = async () => {
    try {
      setMessage("Loading posts...");

      const params = new URLSearchParams();

      if (filters.search) {
        params.append("search", filters.search);
      }

      if (filters.category) {
        params.append("category", filters.category);
      }

      if (filters.type) {
        params.append("type", filters.type);
      }

      const response = await api.get(`/posts?${params.toString()}`);

      setPosts(response.data.posts);
      setMessage("");
    } catch (error) {
      console.log(error);
      setMessage("Failed to fetch posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPosts();
  };

  const handleReset = async () => {
    setFilters({
      search: "",
      category: "",
      type: "",
    });

    try {
      setMessage("Loading posts...");
      const response = await api.get("/posts");
      setPosts(response.data.posts);
      setMessage("");
    } catch (error) {
      console.log(error);
      setMessage("Failed to fetch posts");
    }
  };

  return (
    <div className="page">
      <h1>All Posts</h1>

      <form className="filter-box" onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Search by title or description"
          value={filters.search}
          onChange={handleChange}
        />

        <select name="category" value={filters.category} onChange={handleChange}>
          <option value="">All Categories</option>
          <option value="Books">Books</option>
          <option value="Electronics">Electronics</option>
          <option value="Hostel Items">Hostel Items</option>
          <option value="Cycles">Cycles</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
          <option value="Others">Others</option>
        </select>

        <select name="type" value={filters.type} onChange={handleChange}>
          <option value="">All Types</option>
          <option value="Sell">Sell</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>

        <button type="submit">Search</button>

        <button type="button" className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </form>

      {message && <p>{message}</p>}

      {!message && posts.length === 0 && <p>No posts found.</p>}

      <div className="posts-grid">
        {posts.map((post) => (
          <div className="post-card" key={post._id}>
            <h3>{post.title}</h3>

            <div>
              <span className="tag">{post.category}</span>
              <span className="tag">{post.type}</span>
            </div>

            <p>{post.description}</p>

            <p className="price">Price: ₹{post.price}</p>

            <p>Location: {post.location}</p>

            {post.image && (
              <p>
                Image/Proof:{" "}
                <a
                  href={getValidLink(post.image)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Link
                </a>
              </p>
            )}

            <p>
              Posted by: {post.owner?.name} ({post.owner?.collegeId})
            </p>

            <Link className="details-btn" to={`/posts/${post._id}`}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllPosts;