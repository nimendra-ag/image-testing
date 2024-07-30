// src/components/ImageGallery.js
import React, { useState, useEffect } from 'react';

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    const response = await fetch('http://localhost:5000/images',{
      method: 'GET'
    });
    const data = await response.json();
    setImages(data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      {images.map((image, index) => (
        <img key={index} src={image.url} alt="Uploaded" width="400" height="400"/>
      ))}
    </div>
  );
};

export default ImageGallery;
