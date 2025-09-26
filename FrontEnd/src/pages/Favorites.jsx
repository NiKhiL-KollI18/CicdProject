import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faStar, 
  faFolder, 
  faFileAlt, 
  faFilePdf, 
  faFileImage, 
  faEllipsisV, 
  faSort, 
  faList, 
  faTableCells 
} from '@fortawesome/free-solid-svg-icons'
import '../styles/Favorites.css'

const Favorites = () => {
  const [viewMode, setViewMode] = useState('grid')
  const [selectedItems, setSelectedItems] = useState([])
  
  const favoriteItems = [
    {
      id: 1,
      name: 'Project Alpha',
      type: 'folder',
      icon: faFolder,
      color: '#3175e5',
      items: 24,
      modified: '2 days ago',
      size: '1.2 GB'
    },
    {
      id: 2,
      name: 'Financial Report 2023.pdf',
      type: 'pdf',
      icon: faFilePdf,
      color: '#e74c3c',
      modified: '5 days ago',
      size: '4.8 MB'
    },
    {
      id: 3,
      name: 'Design Assets',
      type: 'folder',
      icon: faFolder,
      color: '#3175e5',
      items: 32,
      modified: '1 week ago',
      size: '2.4 GB'
    },
    {
      id: 4,
      name: 'Company Logo.png',
      type: 'image',
      icon: faFileImage,
      color: '#3498db',
      modified: '2 weeks ago',
      size: '1.5 MB'
    },
    {
      id: 5,
      name: 'Product Roadmap.doc',
      type: 'document',
      icon: faFileAlt,
      color: '#2ecc71',
      modified: '3 weeks ago',
      size: '2.3 MB'
    },
    {
      id: 6,
      name: 'Client Presentation.pdf',
      type: 'pdf',
      icon: faFilePdf,
      color: '#e74c3c',
      modified: '1 month ago',
      size: '8.7 MB'
    },
    {
      id: 7,
      name: 'Marketing Strategy.doc',
      type: 'document',
      icon: faFileAlt,
      color: '#2ecc71',
      modified: '1 month ago',
      size: '3.4 MB'
    },
    {
      id: 8,
      name: 'Personal Files',
      type: 'folder',
      icon: faFolder,
      color: '#3175e5',
      items: 16,
      modified: '2 months ago',
      size: '800 MB'
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
    <div className="favorites">
      <div className="favorites-header">
        <h2>
          <FontAwesomeIcon icon={faStar} className="section-icon" />
          Favorites
        </h2>
        
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
        <div className="favorites-grid">
          {favoriteItems.map(item => (
            <div 
              className={`favorite-card ${selectedItems.includes(item.id) ? 'selected' : ''}`} 
              key={item.id}
              onClick={() => toggleItemSelection(item.id)}
            >
              <div className="favorite-icon" style={{ color: item.color }}>
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <div className="favorite-info">
                <h4 className="favorite-name">{item.name}</h4>
                <p className="favorite-meta">
                  {item.type === 'folder' 
                    ? `${item.items} items • ${item.size}` 
                    : `${item.size} • ${item.modified}`
                  }
                </p>
              </div>
              <div className="favorite-actions">
                <button 
                  className="star-btn active"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FontAwesomeIcon icon={faStar} />
                </button>
                <button 
                  className="more-btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FontAwesomeIcon icon={faEllipsisV} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="favorites-list">
          <table>
            <thead>
              <tr>
                <th className="checkbox-cell">
                  <input 
                    type="checkbox" 
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems(favoriteItems.map(item => item.id))
                      } else {
                        setSelectedItems([])
                      }
                    }}
                    checked={selectedItems.length === favoriteItems.length}
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
              {favoriteItems.map(item => (
                <tr 
                  key={item.id} 
                  className={selectedItems.includes(item.id) ? 'selected' : ''}
                  onClick={() => toggleItemSelection(item.id)}
                >
                  <td className="checkbox-cell">
                    <input 
                      type="checkbox" 
                      checked={selectedItems.includes(item.id)}
                      onChange={() => {}}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="name-cell">
                    <div className="item-name">
                      <FontAwesomeIcon 
                        icon={item.icon} 
                        className="item-icon"
                        style={{ color: item.color }}
                      />
                      {item.name}
                    </div>
                  </td>
                  <td className="type-cell">{item.type}</td>
                  <td className="size-cell">{item.size}</td>
                  <td className="modified-cell">{item.modified}</td>
                  <td className="actions-cell">
                    <div className="action-buttons">
                      <button 
                        className="star-btn active"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FontAwesomeIcon icon={faStar} />
                      </button>
                      <button 
                        className="more-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FontAwesomeIcon icon={faEllipsisV} />
                      </button>
                    </div>
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

export default Favorites