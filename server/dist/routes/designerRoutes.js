"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const designerController_1 = require("../controller/designerController");
// import { authMiddleware } from '../middleware/auth';
const router = express_1.default.Router();
router.get('/profile', auth_1.authMiddleware, designerController_1.getEditorProfile);
router.put('/profile', auth_1.authMiddleware, designerController_1.updateEditorrProfile);
router.get('/get', auth_1.authMiddleware, designerController_1.getAllEditors);
exports.default = router;
