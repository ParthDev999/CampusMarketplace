import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function SavedPosts() {
  const [savedPosts, setSavedPosts] = useState([]);
  const [message, setMessage] = useState("Loading saved posts...");

  const getValidLink = (link) => {
    if (!link) return "";

    if (link.startsWith("http://") || link.startsWith("https://")) {
      return link;
    }

    return `https://${link}`;
  };

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/saved", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSavedPosts(response.data.savedPosts);
        setMessage("");
      } catch (error) {
        console.log(error);
        setMessage("Failed to fetch saved posts");
      }
    };

    fetchSavedPosts();
  }, []);

  const handleUnsave = async (postId) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/saved/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSavedPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postId)
      );
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to unsave post");
    }
  };

  return (
    <div className="page">
      <h1>Saved Posts</h1>

      {message && <p>{message}</p>}

      {!message && savedPosts.length === 0 && (
        <p>You have not saved any posts yet.</p>
      )}

      <div className="posts-grid">
        {savedPosts.map((post) => (
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

            <button
              className="delete-btn"
              onClick={() => handleUnsave(post._id)}
            >
              Unsave
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedPosts;