import { Request, Response, Router } from 'express';
import userController from '../controllers/user.controller';

class UserRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.loadRoutes();
  }

  private loadRoutes() {
    this.router.post('/', async (req: Request, res: Response) => {
      try {
        const result = await userController.save(req.body);
        return res.json({
          status: true,
          data: result,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          status: false,
          message: 'No se pudo registrar correctamente',
        });
      }
    });

    this.router.get('/', async (req: Request, res: Response) => {
      try {
        const result = await userController.list();
        return res.json({
          status: true,
          data: result,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          status: false,
          message: 'No se pudo obtener información',
        });
      }
    });

    this.router.post('/upload', async (req: Request, res: Response) => {
      try {
        await userController.uploadImage(req, res);
        return res.json({
          status: true,
          data: null,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          status: false,
          message: 'No se pudo obtener información',
        });
      }
    });
  }
}

const userRouter = new UserRouter();
export default userRouter.router;
