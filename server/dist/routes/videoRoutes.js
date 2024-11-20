"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
// import { uploadVideo, getVideos } from '../controllers/videoController';
// import { authMiddleware } from '../middleware/auth';
const videoController_1 = require("../controller/videoController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});
const upload = (0, multer_1.default)({ storage: storage });
router.post('/video', auth_1.authMiddleware, upload.single('video'), videoController_1.uploadVideo);
router.get('/video', auth_1.authMiddleware, videoController_1.getVideos);
exports.default = router;
