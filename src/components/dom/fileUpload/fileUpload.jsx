// components/dom/fileUpload/FileUpload.js
'use client'
import React, { useCallback, useRef } from 'react';

const FileUpload = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = useCallback(
    (event) => {
      const file = event.target.files[0];
      if (file) {
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file) {
        onFileUpload(file);
      }
    },
    [onFileUpload]
  );

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick} 
      className="w-screen h-[20vh] border-2 border-dashed border-gray-400 rounded p-4 cursor-pointer pointer-events-auto"
    >
      <input type="file" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
      <p>Drag and drop a file here, or click to select a file.</p>
    </div>
  );
};

export default FileUpload;
