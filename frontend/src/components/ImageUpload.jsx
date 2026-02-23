import { useState, useRef } from 'react';

const ImageUpload = ({ onImageSelected }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    // Basic validation
    if (!file.type.startsWith('image/')) {
        alert("Please upload an image file.");
        return;
    }
    
    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    
    // Pass file to parent
    onImageSelected(file);
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="upload-section">
      <div 
        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag} 
        onDragLeave={handleDrag} 
        onDragOver={handleDrag} 
        onDrop={handleDrop}
        onClick={onButtonClick}
      >
        <input 
          ref={inputRef} 
          type="file" 
          accept="image/*" 
          onChange={handleChange} 
          style={{ display: 'none' }} 
        />
        {preview ? (
            <div>
               <p>Click or Drag to replace image</p>
               <img src={preview} alt="Preview" className="preview-image" />
            </div>
        ) : (
            <div>
                 <span className="upload-icon" style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🍃</span>
                <p>Drag & Drop your leaf image here, or click to upload</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
