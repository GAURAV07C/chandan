"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth")); // Correct import
const designerRoutes_1 = __importDefault(require("./designerRoutes"));
const videoRoutes_1 = __importDefault(require("./videoRoutes"));
const router = (0, express_1.Router)();
router.use('/auth', auth_1.default); // Mounting the router
router.use('/auth', designerRoutes_1.default);
router.use('/auth', videoRoutes_1.default);
exports.default = router;
