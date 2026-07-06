import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="page">
      <h1>Admin Dashboard</h1>
      <p>Manage users, posts, and reports from here.</p>

      <div className="admin-grid">
        <Link to="/admin/users" className="admin-card">
          <h3>Manage Users</h3>
          <p>View users and block/unblock accounts.</p>
        </Link>

        <Link to="/admin/posts" className="admin-card">
          <h3>Manage Posts</h3>
          <p>View and delete inappropriate posts.</p>
        </Link>

        <Link to="/admin/reports" className="admin-card">
          <h3>Manage Reports</h3>
          <p>View reports and update report status.</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;