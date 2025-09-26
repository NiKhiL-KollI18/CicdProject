import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faBars,
  faPlus,
  faBell,
  faCog,
  faXmark,
  faFileUpload,
  faFolder
} from '@fortawesome/free-solid-svg-icons'
import '../styles/Header.css'
import userAvatar from '../assets/user-avatar.png'
import { uploadFile, generateShareLink } from '../api'

const Header = ({ toggleSidebar, onSignOut }) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareLink, setShareLink] = useState('')

  // Toggle functions
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
    if (showUserMenu) setShowUserMenu(false)
  }

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu)
    if (showNotifications) setShowNotifications(false)
  }

 // Header.jsx

const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const email = "guest@example.com"; // Replace with dynamic email if available

  try {
    // 1. Upload file
    const uploaded = await uploadFile(file, email);
    console.log("Response from upload endpoint:", uploaded); // <-- Add this log

    // 2. IMPORTANT: Check if the response has a valid ID
    if (uploaded && uploaded.id) {
      // 3. Generate share link ONLY if ID exists
      const share = await generateShareLink(uploaded.id);
      console.log("Share link:", share);

      setShareLink(share.shareLink || "");
      setShowShareModal(true);
      setShowCreateModal(false);
    } else {
      // Handle cases where the upload succeeded but didn't return an ID
      console.error("File upload response is missing an ID:", uploaded);
      alert("File uploaded, but could not generate a share link.");
    }
  } catch (err) {
    console.error("Error in file upload process:", err); // More specific console log
    alert("Error uploading file or generating share link.");
  }
};

  return (
    <header className="header">
      {/* Left section */}
      <div className="header-left">
        <button className="menu-toggle" onClick={toggleSidebar} aria-label="Toggle menu">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h1 className="page-title">File Manager</h1>
      </div>

      {/* Search */}
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input type="text" placeholder="Search here" className="search-input" />
        <div className="search-shortcuts">
          <span className="shortcut">⌘</span>
          <span className="shortcut">K</span>
        </div>
      </div>

      {/* Right section */}
      <div className="header-right">
        <button className="header-btn create-btn" onClick={() => setShowCreateModal(true)}>
          <FontAwesomeIcon icon={faPlus} />
          <span>Create</span>
        </button>

        <button className="header-btn icon-btn" onClick={toggleNotifications} aria-label="Notifications">
          <FontAwesomeIcon icon={faBell} />
          <span className="notification-badge"></span>
        </button>

        <button className="header-btn icon-btn" aria-label="Settings">
          <FontAwesomeIcon icon={faCog} />
        </button>

        {/* User profile */}
        <div className="user-profile">
          <button className="user-avatar-btn" onClick={toggleUserMenu} aria-label="User menu">
            <img src={userAvatar} alt="User" className="user-avatar" />
          </button>

          {showUserMenu && (
            <div className="dropdown user-dropdown">
              <div className="user-dropdown-header">
                <img src={userAvatar} alt="User" className="dropdown-avatar" />
                <div className="user-info">
                  <h4 className="user-name">Guest</h4>
                  <p className="user-email">guest@example.com</p>
                </div>
              </div>
              <ul className="user-dropdown-menu">
                <li><a href="#">My Profile</a></li>
                <li><a href="#">Account Settings</a></li>
                <li><a href="#">Storage Usage</a></li>
                <li className="separator"></li>
                <li><button onClick={onSignOut} className="logout">Sign Out</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="create-modal">
          <div className="create-modal-content">
            <button className="close-modal" onClick={() => setShowCreateModal(false)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <h3>Create New</h3>
            <div className="create-options">
              <label className="upload-option">
                <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} />
                <FontAwesomeIcon icon={faFileUpload} />
                <span>Upload File</span>
              </label>
              <button className="create-folder">
                <FontAwesomeIcon icon={faFolder} />
                <span>New Folder</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="share-modal">
          <div className="share-modal-content">
            <h3>File Shared Successfully</h3>
            <p>Click the link to copy:</p>
            <input
              type="text"
              value={shareLink}
              readOnly
              className="share-link-input"
              onClick={() => navigator.clipboard.writeText(shareLink)}
            />
            <button onClick={() => setShowShareModal(false)} className="close-share-modal">Close</button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
