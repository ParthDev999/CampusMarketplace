import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState("Loading your posts...");

    const getValidLink = (link) => {
        if (!link) return "";

        if (link.startsWith("http://") || link.startsWith("https://")) {
            return link;
        }

        return `https://${link}`;
    };

    useEffect(() => {
        const fetchMyPosts = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get("/posts/my-posts", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setPosts(response.data.posts);
                setMessage("");
            } catch (error) {
                console.log(error);
                setMessage("Failed to fetch your posts");
            }
        };

        fetchMyPosts();
    }, []);

    const handleDelete = async (postId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this post?"
        );

        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");

            await api.delete(`/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setPosts((prevPosts) =>
                prevPosts.filter((post) => post._id !== postId)
            );
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Failed to delete post");
        }
    };

    return (
        <div className="page">
            <h1>My Posts</h1>

            {message && <p>{message}</p>}

            {!message && posts.length === 0 && (
                <p>You have not created any posts yet.</p>
            )}

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

                        <Link className="edit-btn" to={`/edit-post/${post._id}`}>
                            Edit
                        </Link>

                        <button
                            className="delete-btn"
                            onClick={() => handleDelete(post._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyPosts;