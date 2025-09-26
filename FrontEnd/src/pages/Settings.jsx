import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faLock,
  faBell,
  faLanguage,
  faCog,
  faShield
} from '@fortawesome/free-solid-svg-icons'
import '../styles/Settings.css'

function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      desktop: true,
      updates: false
    },
    theme: 'dark',
    language: 'en',
    twoFactor: false
  })
  
  const handleSettingChange = (category, setting) => {
    setSettings(prev => ({
      ...prev,
      [category]: typeof prev[category] === 'object'
        ? { ...prev[category], [setting]: !prev[category][setting] }
        : setting
    }))
  }
  
  return (
    <div className="settings-container">
      <div className="settings-sidebar">
        <h2>Settings</h2>
        <nav className="settings-nav">
          <button 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FontAwesomeIcon icon={faUser} />
            <span>Profile</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <FontAwesomeIcon icon={faLock} />
            <span>Security</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <FontAwesomeIcon icon={faBell} />
            <span>Notifications</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            <FontAwesomeIcon icon={faCog} />
            <span>Preferences</span>
          </button>
        </nav>
      </div>
      
      <div className="settings-content">
        {activeTab === 'profile' && (
          <div className="settings-section">
            <h3>Profile Settings</h3>
            <div className="profile-form">
              <div className="form-group">
                <label>Display Name</label>
                <input type="text" defaultValue="Alex Morgan" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" defaultValue="alex@example.com" />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea defaultValue="Software developer and tech enthusiast" />
              </div>
              <button className="save-btn">Save Changes</button>
            </div>
          </div>
        )}
        
        {activeTab === 'security' && (
          <div className="settings-section">
            <h3>Security Settings</h3>
            <div className="security-settings">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Add an extra layer of security to your account</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox"
                    checked={settings.twoFactor}
                    onChange={() => handleSettingChange('twoFactor', !settings.twoFactor)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <button className="change-password-btn">Change Password</button>
            </div>
          </div>
        )}
        
        {activeTab === 'notifications' && (
          <div className="settings-section">
            <h3>Notification Settings</h3>
            <div className="notification-settings">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Email Notifications</h4>
                  <p>Receive notifications via email</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox"
                    checked={settings.notifications.email}
                    onChange={() => handleSettingChange('notifications', 'email')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Desktop Notifications</h4>
                  <p>Show notifications on your desktop</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox"
                    checked={settings.notifications.desktop}
                    onChange={() => handleSettingChange('notifications', 'desktop')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Product Updates</h4>
                  <p>Receive updates about new features</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox"
                    checked={settings.notifications.updates}
                    onChange={() => handleSettingChange('notifications', 'updates')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'preferences' && (
          <div className="settings-section">
            <h3>Preferences</h3>
            <div className="preference-settings">
              <div className="form-group">
                <label>Theme</label>
                <select 
                  value={settings.theme}
                  onChange={(e) => handleSettingChange('theme', e.target.value)}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
              <div className="form-group">
                <label>Language</label>
                <select 
                  value={settings.language}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Settings