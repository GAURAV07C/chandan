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
exports.getVideos = exports.uploadVideo = void 0;
const prismaClient_1 = require("../utils/prismaClient");
const uploadVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { title } = req.body;
        const file = req.file;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const video = yield prismaClient_1.prisma.video.create({
            data: {
                userId,
                title,
                filename: file.filename,
            },
        });
        res.status(201).json(video);
    }
    catch (error) {
        res.status(500).json({ error: 'Error uploading video' });
    }
});
exports.uploadVideo = uploadVideo;
const getVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const videos = yield prismaClient_1.prisma.video.findMany({
            where: {
                userId,
            },
        });
        res.json(videos);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching videos' });
    }
});
exports.getVideos = getVideos;
