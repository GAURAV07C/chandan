import { Request, Response } from 'express';
import { prisma } from '../utils/prismaClient';


interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

class Editor {
}
        export  const  getEditorProfile = async (req: AuthRequest, res: Response) => {
        try {
          const userId = req.user?.id;
      
          if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
          }
      
          const designer = await prisma.editor.findUnique({
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
        } catch (error) {
          res.status(500).json({ error: 'Error fetching designer profile' });
        }
      };
      
        export  const  updateEditorrProfile = async (req: AuthRequest, res: Response) => {
        try {
          const userId = req.user?.id;
      
          if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
          }
      
          const { description, specialty } = req.body;
      
          const updatedDesigner = await prisma.editor.update({
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
        } catch (error) {
          res.status(500).json({ error: 'Error updating designer profile' });
        }
      };
      
       export  const  getAllEditors = async (req: Request, res: Response) => {
        try {
          const editors = await prisma.editor.findMany({
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
        } catch (error) {
          res.status(500).json({ error: 'Error fetching designers' });
        }
      };

      
