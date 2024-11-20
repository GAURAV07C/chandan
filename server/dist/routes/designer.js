"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const designerController_1 = __importDefault(require("../controller/designerController"));
const router = (0, express_1.Router)();
// router.post("/updateDesignerProfile", Designer.updateDesignerProfile);
// Login route
router.post("/getDesignerProfile", designerController_1.default.getEditorProfile);
router.post("/getAllEditors", designerController_1.default.getAllEditors);
exports.default = router;
