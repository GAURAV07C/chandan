"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEditors = exports.updateEditorrProfile = exports.getEditorProfile = void 0;
const prismaClient_1 = require("../utils/prismaClient");
class Editor {
}
const getEditorProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const designer = yield prismaClient_1.prisma.editor.findUnique({
            where: { userId },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });
        if (!designer) {
            return res.status(404).json({ error: 'Designer profile not found' });
        }
        res.json(designer);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching designer profile' });
    }
});
exports.getEditorProfile = getEditorProfile;
const updateEditorrProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const { description, specialty } = req.body;
        const updatedDesigner = yield prismaClient_1.prisma.editor.update({
            where: { userId },
            data: {
                description,
                specialty,
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });
        res.json(updatedDesigner);
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating designer profile' });
    }
});
exports.updateEditorrProfile = updateEditorrProfile;
const getAllEditors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const editors = yield prismaClient_1.prisma.editor.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });
        res.json(editors);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching designers' });
    }
});
exports.getAllEditors = getAllEditors;
