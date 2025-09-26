import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SharedFilePage = () => {
  const { shareId } = useParams()
  const [fileInfo, setFileInfo] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/files/shared/${shareId}`)
        if (!response.ok) throw new Error('File not found or link expired.')
        const data = await response.json()
        setFileInfo(data)
      } catch (err) {
        setError(err.message)
      }
    }

    fetchFile()
  }, [shareId])

  if (error) {
    return <div className="shared-file-error">❌ {error}</div>
  }

  if (!fileInfo) {
    return <div className="shared-file-loading">Loading file details...</div>
  }

  return (
    <div className="shared-file-container">
      <h2>📄 Shared File</h2>
      <p><strong>File Name:</strong> {fileInfo.originalName}</p>
      <p><strong>Size:</strong> {Math.round(fileInfo.size / 1024)} KB</p>
      <a
        href={`http://localhost:8080/files/download/${fileInfo.fileId}`}
        className="download-btn"
        download
      >
        Download
      </a>
    </div>
  )
}

export default SharedFilePage
