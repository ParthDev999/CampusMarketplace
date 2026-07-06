// import { useEffect, useState } from "react";
// import api from "../api/axios";

// function Home() {
//   const [message, setMessage] = useState("Checking backend...");

//   useEffect(() => {
//     const testBackend = async () => {
//       try {
//         const response = await api.get("/posts");
//         setMessage(`Backend connected. Total posts: ${response.data.count}`);
//       } catch (error) {
//         setMessage("Backend connection failed");
//         console.log(error);
//       }
//     };

//     testBackend();
//   }, []);

//   return (
//     <div className="page">
    
//       <h1>Campus Marketplace</h1>
//       <p>Buy, sell, lost and found items inside campus.</p>
//     </div>
//   );
// }

// export default Home;

// -------improved homepage----------------
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Home() {
  const [postCount, setPostCount] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPostCount = async () => {
      try {
        const response = await api.get("/posts");
        setPostCount(response.data.count);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPostCount();
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Campus Marketplace + Lost & Found</h1>

          <p>
            Buy, sell, save, report, and find lost/found items inside your
            college campus.
          </p>

          <div className="hero-buttons">
            <Link to="/posts" className="primary-btn">
              Browse Posts
            </Link>

            {user ? (
              <Link to="/create-post" className="secondary-btn">
                Create Post
              </Link>
            ) : (
              <Link to="/signup" className="secondary-btn">
                Get Started
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="home-stats">
        <div className="stat-card">
          <h2>{postCount}</h2>
          <p>Total Posts</p>
        </div>

        <div className="stat-card">
          <h2>Sell</h2>
          <p>Books, electronics, cycles and hostel items</p>
        </div>

        <div className="stat-card">
          <h2>Lost & Found</h2>
          <p>Report or find missing campus items</p>
        </div>
      </section>

      <section className="features-section">
        <h2>Features</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>College ID Login</h3>
            <p>Users signup and login using college ID and password.</p>
          </div>

          <div className="feature-card">
            <h3>Post Management</h3>
            <p>Create, edit, delete, search and filter campus posts.</p>
          </div>

          <div className="feature-card">
            <h3>Saved Posts</h3>
            <p>Students can save useful posts and view them later.</p>
          </div>

          <div className="feature-card">
            <h3>Admin Moderation</h3>
            <p>Admin can manage users, posts, and reported content.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;