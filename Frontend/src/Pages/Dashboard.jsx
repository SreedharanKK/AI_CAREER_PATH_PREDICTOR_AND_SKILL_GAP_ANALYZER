import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle, faSignOutAlt, faTrophy, faRoute,
  faBullseye, faLightbulb, faBriefcase, faEdit
} from '@fortawesome/free-solid-svg-icons';
import '../Styles/Dashboard.css';

export default function Dashboard() {
  const [userName, setUserName] = useState("Loading...");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // IMPORTANT: Replace with your actual backend endpoint
        const response = await fetch('http://localhost:5000/api/user/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Sends cookies with the request
        });

        if (!response.ok) {
          throw new Error('Not authorized');
        }

        const data = await response.json();
        // Assumes your backend returns: { "fullName": "Jane Doe" }
        setUserName(data.fullName);

      } catch (error) {
        console.error("Failed to fetch user data:", error);
        // Redirect to home/login if fetching fails
        
      }
    };

    fetchUserData();
  }, [navigate]);

  // Opens the confirmation modal
  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  // Performs the logout after confirmation
  const confirmLogout = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  return (
    <>
      <div className="dashboard-layout">
        {/* Left Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="user-info">
            <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
            <span className="user-name">{userName}</span>
          </div>

          <button
            className="sidebar-btn"
            onClick={() => navigate('/update-details')}
          >
            <FontAwesomeIcon icon={faEdit} className="sidebar-btn-icon"/>
            Update Profile
          </button>

          <button className="sidebar-btn logout-btn" onClick={handleLogoutClick}>
            <FontAwesomeIcon icon={faSignOutAlt} className="sidebar-btn-icon"/>
            Logout
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="dashboard-main-content">
          <div className="card-grid">

            {/* Your Achievements Card */}
            <div className="dashboard-card clickable" onClick={() => navigate('/achievements')}>
              <div className="card-header">
                <FontAwesomeIcon icon={faTrophy} className="card-icon" />
                <h3>Your Achievements</h3>
              </div>
              <p className="card-description">View your completed milestones and badges.</p>
              
            </div>

            {/* Career Path Card */}
            <div className="dashboard-card clickable" onClick={() => navigate('/career-path')}>
              <div className="card-header">
                <FontAwesomeIcon icon={faRoute} className="card-icon" />
                <h3>Career Path</h3>
              </div>
              <p className="card-description">Your personalized journey to your dream job.</p>
              
            </div>

            {/* Skill Gap Analysis Card */}
            <div className="dashboard-card clickable" onClick={() => navigate('/skill-gap')}>
              <div className="card-header">
                <FontAwesomeIcon icon={faBullseye} className="card-icon" />
                <h3>Skill Gap Analysis</h3>
              </div>
              <p className="card-description">Identify strengths and areas for improvement.</p>
              
            </div>

            {/* Learning Recommendation Card */}
            <div className="dashboard-card clickable" onClick={() => navigate('/learning-recommendations')}>
              <div className="card-header">
                <FontAwesomeIcon icon={faLightbulb} className="card-icon" />
                <h3>Learning Recommendations</h3>
              </div>
              <p className="card-description">Curated resources to close your skill gaps.</p>
              
            </div>

            {/* Job Recommendations Card */}
            <div className="dashboard-card clickable full-width" onClick={() => navigate('/job-recommendations')}>
              <div className="card-header">
                <FontAwesomeIcon icon={faBriefcase} className="card-icon" />
                <h3>Job Recommendations</h3>
              </div>
              <p className="card-description">Discover opportunities tailored to your profile.</p>
            </div>
          </div>
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to logout?</p>
            <div className="modal-actions">
              <button
                className="modal-btn modal-btn-cancel"
                onClick={() => setIsModalOpen(false)}
              >
                No, Cancel
              </button>
              <button
                className="modal-btn modal-btn-confirm"
                onClick={confirmLogout}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}