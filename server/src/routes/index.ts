import { Router } from 'express';
import auth from './auth'; // Correct import
import designer from './designerRoutes'
import video from './videoRoutes'


const router = Router();

router.use('/auth', auth); // Mounting the router
router.use('/auth',designer);
router.use('/auth',video);
export default router;
