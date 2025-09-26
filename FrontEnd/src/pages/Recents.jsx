import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faFileAlt, 
  faFilePdf,
  faFileImage, 
  faFileVideo,
  faFileArchive,
  faEllipsisV,
  faSort,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons'
import '../styles/Recents.css'

const Recents = () => {
  const [selectedItems, setSelectedItems] = useState([])

  const recentFiles = [
    {
      id: 1,
      name: 'Toba Lake Proposal 2023.doc',
      type: 'document',
      icon: faFileAlt,
      color: '#3498db',
      size: '8.45 MB',
      shared: 'Me',
      modified: '23/03/2023 - 17:15',
      activity: 'Edited'
    },
    {
      id: 2,
      name: 'Explaination music mardua holong.pdf',
      type: 'pdf',
      icon: faFilePdf,
      color: '#e74c3c',
      size: '19.21 MB',
      shared: 'Me',
      modified: '24/03/2023 - 08:09',
      activity: 'Viewed'
    },
    {
      id: 3,
      name: 'Member of 2021.xls',
      type: 'spreadsheet',
      icon: faFileAlt,
      color: '#2ecc71',
      size: '5.14 MB',
      shared: 'Team',
      modified: '25/03/2023 - 17:12',
      activity: 'Downloaded'
    },
    {
      id: 4,
      name: 'Invoice 2021.pdf',
      type: 'pdf',
      icon: faFilePdf,
      color: '#e74c3c',
      size: '10.66 MB',
      shared: 'Me',
      modified: '26/03/2023 - 09:18',
      activity: 'Shared'
    },
    {
      id: 5,
      name: 'Furniture Catalog January.pdf',
      type: 'pdf',
      icon: faFilePdf,
      color: '#e74c3c',
      size: '28.11 MB',
      shared: 'Me',
      modified: '27/03/2023 - 16:21',
      activity: 'Uploaded'
    },
    {
      id: 6,
      name: 'Team Meeting Notes.doc',
      type: 'document',
      icon: faFileAlt,
      color: '#3498db',
      size: '2.34 MB',
      shared: 'Team',
      modified: '28/03/2023 - 11:30',
      activity: 'Edited'
    },
    {
      id: 7,
      name: 'Office Photos.zip',
      type: 'archive',
      icon: faFileArchive,
      color: '#f39c12',
      size: '45.2 MB',
      shared: 'Me',
      modified: '28/03/2023 - 14:15',
      activity: 'Downloaded'
    },
    {
      id: 8,
      name: 'Product Demo.mp4',
      type: 'video',
      icon: faFileVideo,
      color: '#9b59b6',
      size: '124.5 MB',
      shared: 'Team',
      modified: '29/03/2023 - 09:45',
      activity: 'Viewed'
    },
    {
      id: 9,
      name: 'Marketing Banner.png',
      type: 'image',
      icon: faFileImage,
      color: '#3498db',
      size: '3.8 MB',
      shared: 'Me',
      modified: '29/03/2023 - 15:20',
      activity: 'Edited'
    },
    {
      id: 10,
      name: 'Budget Report 2023.xls',
      type: 'spreadsheet',
      icon: faFileAlt,
      color: '#2ecc71',
      size: '7.2 MB',
      shared: 'Team',
      modified: '30/03/2023 - 10:10',
      activity: 'Shared'
    },
    {
      id: 11,
      name: 'Client Presentation.pdf',
      type: 'pdf',
      icon: faFilePdf,
      color: '#e74c3c',
      size: '12.4 MB',
      shared: 'Me',
      modified: '30/03/2023 - 16:45',
      activity: 'Uploaded'
    },
    {
      id: 12,
      name: 'Website Mockups.zip',
      type: 'archive',
      icon: faFileArchive,
      color: '#f39c12',
      size: '18.7 MB',
      shared: 'Me',
      modified: '31/03/2023 - 09:30',
      activity: 'Downloaded'
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
    <div className="recents">
      <div className="recents-header">
        <h2>
          <FontAwesomeIcon icon={faCalendarAlt} className="section-icon" />
          Recent Files
        </h2>
        <div className="filter-controls">
          <button className="filter-btn">
            <FontAwesomeIcon icon={faSort} />
            <span>Last Modified</span>
          </button>
        </div>
      </div>
      
      <div className="activity-timeline">
        <div className="timeline-section">
          <h3 className="timeline-date">Today</h3>
          <div className="recents-files-table">
            <table>
              <thead>
                <tr>
                  <th className="checkbox-cell">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const todayFiles = recentFiles.slice(0, 4)
                        if (e.target.checked) {
                          setSelectedItems([...selectedItems, ...todayFiles.map(f => f.id)])
                        } else {
                          setSelectedItems(selectedItems.filter(id => 
                            !todayFiles.some(file => file.id === id)
                          ))
                        }
                      }}
                    />
                  </th>
                  <th className="name-cell">Name</th>
                  <th className="activity-cell">Activity</th>
                  <th className="size-cell">Size</th>
                  <th className="shared-cell">Shared</th>
                  <th className="modified-cell">Modified</th>
                  <th className="actions-cell"></th>
                </tr>
              </thead>
              <tbody>
                {recentFiles.slice(0, 4).map(file => (
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
                    <td className="activity-cell">
                      <span className="activity-badge">{file.activity}</span>
                    </td>
                    <td className="size-cell">{file.size}</td>
                    <td className="shared-cell">{file.shared}</td>
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
        </div>
        
        <div className="timeline-section">
          <h3 className="timeline-date">Yesterday</h3>
          <div className="recents-files-table">
            <table>
              <thead>
                <tr>
                  <th className="checkbox-cell">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const yesterdayFiles = recentFiles.slice(4, 8)
                        if (e.target.checked) {
                          setSelectedItems([...selectedItems, ...yesterdayFiles.map(f => f.id)])
                        } else {
                          setSelectedItems(selectedItems.filter(id => 
                            !yesterdayFiles.some(file => file.id === id)
                          ))
                        }
                      }}
                    />
                  </th>
                  <th className="name-cell">Name</th>
                  <th className="activity-cell">Activity</th>
                  <th className="size-cell">Size</th>
                  <th className="shared-cell">Shared</th>
                  <th className="modified-cell">Modified</th>
                  <th className="actions-cell"></th>
                </tr>
              </thead>
              <tbody>
                {recentFiles.slice(4, 8).map(file => (
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
                    <td className="activity-cell">
                      <span className="activity-badge">{file.activity}</span>
                    </td>
                    <td className="size-cell">{file.size}</td>
                    <td className="shared-cell">{file.shared}</td>
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
        </div>
        
        <div className="timeline-section">
          <h3 className="timeline-date">Older</h3>
          <div className="recents-files-table">
            <table>
              <thead>
                <tr>
                  <th className="checkbox-cell">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const olderFiles = recentFiles.slice(8)
                        if (e.target.checked) {
                          setSelectedItems([...selectedItems, ...olderFiles.map(f => f.id)])
                        } else {
                          setSelectedItems(selectedItems.filter(id => 
                            !olderFiles.some(file => file.id === id)
                          ))
                        }
                      }}
                    />
                  </th>
                  <th className="name-cell">Name</th>
                  <th className="activity-cell">Activity</th>
                  <th className="size-cell">Size</th>
                  <th className="shared-cell">Shared</th>
                  <th className="modified-cell">Modified</th>
                  <th className="actions-cell"></th>
                </tr>
              </thead>
              <tbody>
                {recentFiles.slice(8).map(file => (
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
                    <td className="activity-cell">
                      <span className="activity-badge">{file.activity}</span>
                    </td>
                    <td className="size-cell">{file.size}</td>
                    <td className="shared-cell">{file.shared}</td>
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
        </div>
      </div>
    </div>
  )
}

export default Recents