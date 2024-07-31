const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors(
  {
    origin: true,
    methods: ["POST", "GET"],
    credentials: true
  }
));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

// MongoDB configuration
mongoose.connect("mongodb+srv://nimendrare4534:nimendrare4534inmongoatlas@cluster0.j74i3f2.mongodb.net/deploy-testing", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  });

const ImageSchema = new mongoose.Schema({
  url: String,
});

const Image = mongoose.model('Image', ImageSchema);

// Middleware to parse JSON
app.use(express.json());

app.get("/", (req, res)=>{
  res.json("Hello");
})

// Upload route
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const imageUrl = req.file.path;
    const image = new Image({ url: imageUrl });
    await image.save();
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).send({ error: 'Image upload failed' });
  }
});

// Fetch images route
app.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch images' });
  }
});

// Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
