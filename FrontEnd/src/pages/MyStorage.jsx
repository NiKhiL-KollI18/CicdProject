import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faFolder, 
  faFolderOpen, 
  faFileAlt, 
  faFileImage, 
  faFileVideo, 
  faFileAudio, 
  faFilePdf,
  faFileCode,
  faFileArchive,
  faEllipsisV,
  faSort,
  faList,
  faTableCells
} from '@fortawesome/free-solid-svg-icons'
import '../styles/MyStorage.css'

const MyStorage = () => {
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [selectedItems, setSelectedItems] = useState([])
  
  const folders = [
    { id: 1, name: 'Projects', items: 12, size: '2.3 GB', modified: '2 days ago' },
    { id: 2, name: 'Documents', items: 24, size: '1.2 GB', modified: '1 week ago' },
    { id: 3, name: 'Images', items: 152, size: '4.3 GB', modified: '3 days ago' },
    { id: 4, name: 'Videos', items: 8, size: '12.5 GB', modified: '5 days ago' }
  ]
  
  const files = [
    { 
      id: 1, 
      name: 'Project Presentation.pdf', 
      type: 'pdf', 
      size: '8.4 MB', 
      modified: 'Yesterday', 
      icon: faFilePdf,
      color: '#e74c3c'
    },
    { 
      id: 2, 
      name: 'Company Logo.png', 
      type: 'image', 
      size: '1.2 MB', 
      modified: '3 days ago', 
      icon: faFileImage,
      color: '#3498db'
    },
    { 
      id: 3, 
      name: 'Budget 2023.xlsx', 
      type: 'spreadsheet', 
      size: '4.5 MB', 
      modified: '1 week ago', 
      icon: faFileAlt,
      color: '#2ecc71'
    },
    { 
      id: 4, 
      name: 'Meeting Recording.mp4', 
      type: 'video', 
      size: '24.7 MB', 
      modified: '2 weeks ago', 
      icon: faFileVideo,
      color: '#9b59b6'
    },
    { 
      id: 5, 
      name: 'Source Code.zip', 
      type: 'archive', 
      size: '15.2 MB', 
      modified: '1 month ago', 
      icon: faFileArchive,
      color: '#f39c12'
    },
    { 
      id: 6, 
      name: 'App.js', 
      type: 'code', 
      size: '12 KB', 
      modified: '2 days ago', 
      icon: faFileCode,
      color: '#1abc9c'
    }
  ]
  
  const toggleItemSelection = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }
  
  return (
    <div className="my-storage">
      <div className="storage-header">
        <div className="breadcrumb">
          <span>My Storage</span>
          <span className="separator">/</span>
          <span className="current">All Files</span>
        </div>
        
        <div className="view-controls">
          <div className="sort-control">
            <button className="sort-btn">
              <FontAwesomeIcon icon={faSort} />
              <span>Sort</span>
            </button>
          </div>
          
          <div className="view-mode-control">
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <FontAwesomeIcon icon={faList} />
            </button>
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <FontAwesomeIcon icon={faTableCells} />
            </button>
          </div>
        </div>
      </div>
      
      {viewMode === 'grid' ? (
        <div className="grid-view">
          <h3 className="section-title">Folders</h3>
          <div className="folders-grid">
            {folders.map(folder => (
              <div 
                className={`folder-card ${selectedItems.includes(folder.id) ? 'selected' : ''}`} 
                key={folder.id}
                onClick={() => toggleItemSelection(folder.id)}
              >
                <div className="folder-icon">
                  <FontAwesomeIcon icon={selectedItems.includes(folder.id) ? faFolderOpen : faFolder} />
                </div>
                <div className="folder-info">
                  <h4 className="folder-name">{folder.name}</h4>
                  <p className="folder-meta">{folder.items} items • {folder.size}</p>
                </div>
                <button className="folder-actions">
                  <FontAwesomeIcon icon={faEllipsisV} />
                </button>
              </div>
            ))}
          </div>
          
          <h3 className="section-title">Files</h3>
          <div className="files-grid">
            {files.map(file => (
              <div 
                className={`file-card ${selectedItems.includes(file.id) ? 'selected' : ''}`} 
                key={file.id}
                onClick={() => toggleItemSelection(file.id)}
              >
                <div className="file-icon" style={{ color: file.color }}>
                  <FontAwesomeIcon icon={file.icon} />
                </div>
                <div className="file-info">
                  <h4 className="file-name">{file.name}</h4>
                  <p className="file-meta">{file.size} • {file.modified}</p>
                </div>
                <button className="file-actions">
                  <FontAwesomeIcon icon={faEllipsisV} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="list-view">
          <table className="file-table">
            <thead>
              <tr>
                <th className="checkbox-cell">
                  <input 
                    type="checkbox" 
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems([...folders.map(f => f.id), ...files.map(f => f.id)])
                      } else {
                        setSelectedItems([])
                      }
                    }}
                    checked={selectedItems.length === folders.length + files.length}
                  />
                </th>
                <th className="name-cell">Name</th>
                <th className="type-cell">Type</th>
                <th className="size-cell">Size</th>
                <th className="modified-cell">Modified</th>
                <th className="actions-cell"></th>
              </tr>
            </thead>
            <tbody>
              {folders.map(folder => (
                <tr 
                  key={folder.id} 
                  className={selectedItems.includes(folder.id) ? 'selected' : ''}
                  onClick={() => toggleItemSelection(folder.id)}
                >
                  <td className="checkbox-cell">
                    <input 
                      type="checkbox" 
                      checked={selectedItems.includes(folder.id)}
                      onChange={() => {}}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="name-cell">
                    <div className="item-name">
                      <FontAwesomeIcon 
                        icon={selectedItems.includes(folder.id) ? faFolderOpen : faFolder} 
                        className="item-icon folder-icon"
                      />
                      {folder.name}
                    </div>
                  </td>
                  <td className="type-cell">Folder</td>
                  <td className="size-cell">{folder.size}</td>
                  <td className="modified-cell">{folder.modified}</td>
                  <td className="actions-cell">
                    <button className="action-btn" onClick={(e) => e.stopPropagation()}>
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </button>
                  </td>
                </tr>
              ))}
              
              {files.map(file => (
                <tr 
                  key={file.id} 
                  className={selectedItems.includes(file.id) ? 'selected' : ''}
                  onClick={() => toggleItemSelection(file.id)}
                >
                  <td className="checkbox-cell">
                    <input 
                      type="checkbox" 
                      checked={selectedItems.includes(file.id)}
                      onChange={() => {}}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="name-cell">
                    <div className="item-name">
                      <FontAwesomeIcon 
                        icon={file.icon} 
                        className="item-icon"
                        style={{ color: file.color }}
                      />
                      {file.name}
                    </div>
                  </td>
                  <td className="type-cell">{file.type}</td>
                  <td className="size-cell">{file.size}</td>
                  <td className="modified-cell">{file.modified}</td>
                  <td className="actions-cell">
                    <button className="action-btn" onClick={(e) => e.stopPropagation()}>
                      <FontAwesomeIcon icon={faEllipsisV} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default MyStorage