import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function AdminReports() {
  const [reports, setReports] = useState([]);
  const [message, setMessage] = useState("Loading reports...");

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/admin/reports", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReports(response.data.reports);
      setMessage("");
    } catch (error) {
      console.log(error);
      setMessage("Failed to fetch reports");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleStatusChange = async (reportId, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      await api.patch(
        `/admin/reports/${reportId}/status`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchReports();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to update report status");
    }
  };

  const handleDeleteReportedPost = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this reported post?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/admin/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchReports();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to delete reported post");
    }
  };

  return (
    <div className="page">
      <h1>Manage Reports</h1>

      {message && <p>{message}</p>}

      {!message && reports.length === 0 && <p>No reports found.</p>}

      <div className="reports-list">
        {reports.map((report) => (
          <div className="report-card" key={report._id}>
            <div className="report-header">
              <h3>Report Reason</h3>
              <span className={`status-badge ${report.status.toLowerCase()}`}>
                {report.status}
              </span>
            </div>

            <p className="report-reason">{report.reason}</p>

            <div className="report-section">
              <h4>Reported Post</h4>

              {report.postId ? (
                <>
                  <p>
                    <strong>Title:</strong> {report.postId.title}
                  </p>

                  <p>
                    <strong>Category:</strong> {report.postId.category}
                  </p>

                  <p>
                    <strong>Type:</strong> {report.postId.type}
                  </p>

                  <p>
                    <strong>Location:</strong> {report.postId.location}
                  </p>

                  <div className="report-actions">
                    <Link
                      className="details-btn"
                      to={`/posts/${report.postId._id}`}
                    >
                      View Post
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDeleteReportedPost(report.postId._id)
                      }
                    >
                      Delete Reported Post
                    </button>
                  </div>
                </>
              ) : (
                <p className="deleted-post-text">
                  This post has already been deleted.
                </p>
              )}
            </div>

            <div className="report-section">
              <h4>Reported By</h4>

              <p>
                <strong>Name:</strong> {report.reportedBy?.name}
              </p>

              <p>
                <strong>College ID:</strong> {report.reportedBy?.collegeId}
              </p>
            </div>

            <div className="report-section">
              <h4>Update Report Status</h4>

              <select
                className="status-select"
                value={report.status}
                onChange={(e) =>
                  handleStatusChange(report._id, e.target.value)
                }
              >
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminReports;