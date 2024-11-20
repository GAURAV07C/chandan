import { Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';
// import { prisma } from '../server';

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const uploadVideo = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { title } = req.body;
    const file = req.file;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const video = await prisma.video.create({
      data: {
        userId,
        title,
        filename: file.filename,
      },
    });

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ error: 'Error uploading video' });
  }
};

export const getVideos = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const videos = await prisma.video.findMany({
      where: {
        userId,
      },
    });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching videos' });
  }
};