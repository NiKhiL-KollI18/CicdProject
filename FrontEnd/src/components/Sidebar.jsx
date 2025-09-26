import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faHome, 
  faFolder, 
  faClock, 
  faStar, 
  faTrash, 
  faShare, 
  faUsers, 
  faPlus,
  faXmark 
} from '@fortawesome/free-solid-svg-icons'
import '../styles/Sidebar.css'
import logo from '../assets/logo.svg'

const Sidebar = ({ collapsed }) => {
  const [activeSection, setActiveSection] = useState('overview')
  const [fileStats, setFileStats] = useState({
    recent: 0,
    favorites: 0,
    images: 0,
    videos: 0,
    documents: 0,
    others: 0
  })
  const [showTeamModal, setShowTeamModal] = useState(false)
  
  useEffect(() => {
    // In a real app, this would fetch from your backend
    const calculateFileStats = () => {
      const recentFiles = JSON.parse(localStorage.getItem('recentFiles')) || []
      const favoriteFiles = JSON.parse(localStorage.getItem('favoriteFiles')) || []
      const allFiles = JSON.parse(localStorage.getItem('allFiles')) || []
      
      const stats = {
        recent: recentFiles.length,
        favorites: favoriteFiles.length,
        images: allFiles.filter(f => f.type === 'image').length,
        videos: allFiles.filter(f => f.type === 'video').length,
        documents: allFiles.filter(f => f.type === 'document').length,
        others: allFiles.filter(f => !['image', 'video', 'document'].includes(f.type)).length
      }
      
      setFileStats(stats)
    }
    
    calculateFileStats()
    
    // Listen for storage changes
    window.addEventListener('storage', calculateFileStats)
    return () => window.removeEventListener('storage', calculateFileStats)
  }, [])
  
  const handleAddTeam = (e) => {
    e.preventDefault()
    const teamName = e.target.teamName.value
    const teamMembers = e.target.teamMembers.value.split(',').map(email => email.trim())
    
    // In a real app, this would be an API call
    const teams = JSON.parse(localStorage.getItem('teams')) || []
    teams.push({ name: teamName, members: teamMembers })
    localStorage.setItem('teams', JSON.stringify(teams))
    
    setShowTeamModal(false)
  }
  
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <img src={logo} alt="StackDrive" className="logo" />
          {!collapsed && <span className="logo-text">Stack Drive</span>}
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className={`nav-section-title ${collapsed ? 'collapsed-title' : ''}`}>
            Overview
          </h3>
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                <FontAwesomeIcon icon={faHome} />
                {!collapsed && <span>Overview Storage</span>}
              </NavLink>
            </li>
          </ul>
        </div>
        
        <div className="nav-section">
          <h3 className={`nav-section-title ${collapsed ? 'collapsed-title' : ''}`}>
            File Manager
          </h3>
          <ul className="nav-links">
            <li>
              <NavLink to="/my-storage" className={({ isActive }) => isActive ? 'active' : ''}>
                <FontAwesomeIcon icon={faFolder} />
                {!collapsed && <span>My Storage</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/recents" className={({ isActive }) => isActive ? 'active' : ''}>
                <FontAwesomeIcon icon={faClock} />
                {!collapsed && (
                  <>
                    <span>Recents</span>
                    {fileStats.recent > 0 && <span className="badge">{fileStats.recent}</span>}
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/favorites" className={({ isActive }) => isActive ? 'active' : ''}>
                <FontAwesomeIcon icon={faStar} />
                {!collapsed && (
                  <>
                    <span>Favorites</span>
                    {fileStats.favorites > 0 && <span className="badge">{fileStats.favorites}</span>}
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/trash" className={({ isActive }) => isActive ? 'active' : ''}>
                <FontAwesomeIcon icon={faTrash} />
                {!collapsed && <span>Trash</span>}
              </NavLink>
            </li>
          </ul>
        </div>
        
        <div className="nav-section">
          <h3 className={`nav-section-title ${collapsed ? 'collapsed-title' : ''}`}>
            Shared File
          </h3>
          <ul className="nav-links">
            <li>
              <NavLink to="/shared-files" className={({ isActive }) => isActive ? 'active' : ''}>
                <FontAwesomeIcon icon={faShare} />
                {!collapsed && <span>Shared Files</span>}
              </NavLink>
            </li>
          </ul>
        </div>
        
        <div className="nav-section">
          <h3 className={`nav-section-title ${collapsed ? 'collapsed-title' : ''}`}>
            Team Storage
          </h3>
          <ul className="nav-links">
            <li>
              <NavLink to="/team-storage" className={({ isActive }) => isActive ? 'active' : ''}>
                <FontAwesomeIcon icon={faUsers} />
                {!collapsed && <span>Team Storage</span>}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      
      {!collapsed && (
        <div className="sidebar-footer">
          <button className="add-team-btn" onClick={() => setShowTeamModal(true)}>
            <FontAwesomeIcon icon={faPlus} />
            <span>Add team storage</span>
          </button>
          
          <div className="storage-info">
            <div className="storage-text">
              <span>Storage</span>
              <span>92%</span>
            </div>
            <div className="storage-progress">
              <div 
                className="storage-progress-bar" 
                style={{ width: '92%' }}
              ></div>
            </div>
          </div>
        </div>
      )}
      
      {showTeamModal && (
        <div className="team-modal">
          <div className="team-modal-content">
            <button className="close-modal" onClick={() => setShowTeamModal(false)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <h3>Create Team Storage</h3>
            <form onSubmit={handleAddTeam}>
              <div className="form-group">
                <label htmlFor="teamName">Team Name</label>
                <input 
                  type="text" 
                  id="teamName" 
                  name="teamName" 
                  placeholder="Enter team name"
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="teamMembers">Team Members</label>
                <textarea 
                  id="teamMembers" 
                  name="teamMembers" 
                  placeholder="Enter email addresses (comma-separated)"
                  required 
                />
                <small>Separate email addresses with commas</small>
              </div>
              <button type="submit" className="create-team-btn">
                Create Team
              </button>
            </form>
          </div>
        </div>
      )}
    </aside>
  )
}

export default Sidebar