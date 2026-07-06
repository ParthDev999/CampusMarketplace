import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [message, setMessage] = useState("Loading post...");
  const [actionMessage, setActionMessage] = useState("");
  const [reportReason, setReportReason] = useState("");

  const getValidLink = (link) => {
    if (!link) return "";

    if (link.startsWith("http://") || link.startsWith("https://")) {
      return link;
    }

    return `https://${link}`;
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data.post);
        setMessage("");
      } catch (error) {
        console.log(error);
        setMessage("Failed to fetch post");
      }
    };

    fetchPost();
  }, [id]);

  const handleSavePost = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setActionMessage("Please login first to save this post");
        return;
      }

      const response = await api.post(
        `/saved/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setActionMessage(response.data.message);
    } catch (error) {
      console.log(error);
      setActionMessage(error.response?.data?.message || "Failed to save post");
    }
  };

  const handleReportPost = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setActionMessage("Please login first to report this post");
        return;
      }

      if (!reportReason.trim()) {
        setActionMessage("Please enter a report reason");
        return;
      }

      const response = await api.post(
        `/reports/${id}`,
        {
          reason: reportReason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setActionMessage(response.data.message);
      setReportReason("");
    } catch (error) {
      console.log(error);
      setActionMessage(error.response?.data?.message || "Failed to report post");
    }
  };

  if (message) {
    return (
      <div className="page">
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="details-card">
        <h1>{post.title}</h1>

        <div>
          <span className="tag">{post.category}</span>
          <span className="tag">{post.type}</span>
        </div>

        <p>{post.description}</p>

        <p className="price">Price: ₹{post.price}</p>

        <p>Location: {post.location}</p>

        <p>Contact: {post.contactInfo}</p>

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

        <button className="save-btn" onClick={handleSavePost}>
          Save Post
        </button>

        <form className="report-box" onSubmit={handleReportPost}>
          <h3>Report this post</h3>

          <textarea
            placeholder="Enter reason for reporting this post"
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
          />

          <button type="submit" className="report-btn">
            Report Post
          </button>
        </form>

        {actionMessage && <p className="message">{actionMessage}</p>}
      </div>
    </div>
  );
}

export default PostDetails;