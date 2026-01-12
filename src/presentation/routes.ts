import { Router } from 'express';
import { AIController } from './ai/ai.controller';
import { AiRoutes } from './ai/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    router.use('/api/ai', AiRoutes.routes);


    return router;
  }


}

