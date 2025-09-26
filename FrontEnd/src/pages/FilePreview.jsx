import React from 'react'
import { useParams } from 'react-router-dom'

function FilePreview() {
  const { fileId } = useParams()

  return (
    <div className="file-preview">
      <h1>File Preview</h1>
      <p>Viewing file with ID: {fileId}</p>
    </div>
  )
}

export default FilePreview