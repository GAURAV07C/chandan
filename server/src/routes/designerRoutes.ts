import express from 'express';

import { authMiddleware } from '../middleware/auth';
import { getAllEditors, getEditorProfile, updateEditorrProfile } from '../controller/designerController';
// import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/profile', authMiddleware, getEditorProfile);
router.put('/profile', authMiddleware, updateEditorrProfile);
router.get('/get', authMiddleware, getAllEditors);

export default router;