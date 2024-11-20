import express from 'express';
import multer from 'multer';
// import { uploadVideo, getVideos } from '../controllers/videoController';
// import { authMiddleware } from '../middleware/auth';
import { getVideos, uploadVideo } from '../controller/videoController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage: storage });

router.post('/video', authMiddleware, upload.single('video'), uploadVideo);
router.get('/video', authMiddleware, getVideos);

export default router;