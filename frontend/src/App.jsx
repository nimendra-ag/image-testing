import { useState } from 'react'
import './App.css'
import ImageUpload from './ImageUpload'
import ImageGallery from './ImageGallery'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
    <h1>Image Upload</h1>
    <ImageUpload />
    <h1>Image Gallery</h1>
    <ImageGallery />
  </div>
    </>
  )
}

export default App
