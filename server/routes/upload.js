import { Router } from 'express';
import multer from 'multer';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinary.js';

const router = Router();

const ALLOWED_FOLDERS = ['portfolio/images', 'portfolio/projects', 'portfolio/certificates'];

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const folder = ALLOWED_FOLDERS.includes(req.body.folder) ? req.body.folder : 'portfolio/images';
    const result = await uploadToCloudinary(req.file.buffer, folder, req.file.originalname);

    res.json({ url: result.url, public_id: result.public_id });
  } catch (err) {
    console.error('[Upload] Error:', err.message);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

router.delete('/', async (req, res) => {
  try {
    const { imageRef } = req.body;
    if (!imageRef || typeof imageRef !== 'string') {
      return res.status(400).json({ error: 'imageRef is required' });
    }

    await deleteFromCloudinary(imageRef);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('[Upload] Delete error:', err.message);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

export default router;
