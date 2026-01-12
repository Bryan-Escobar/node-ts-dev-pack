import { Router } from 'express';
import { AIController } from './ai/ai.controller';
import { AiRoutes } from './ai/routes';
import { ItemsRoutes } from './items/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    router.use('/api/ai', AiRoutes.routes);
    router.use('/api/items', ItemsRoutes.routes);

    return router;
  }


}

