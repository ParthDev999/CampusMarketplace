import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/posts">All Posts</Link>

                {user ? (
                    <>
                        <Link to="/create-post">Create Post</Link>
                        <Link to="/my-posts">My Posts</Link>
                        <Link to="/saved-posts">Saved Posts</Link>
                        {user?.role === "admin" && <Link to="/admin">Admin</Link>}
                        <p>Hello, {user.name}</p>
                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;