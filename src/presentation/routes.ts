import { Router } from 'express';
import { AIController } from './ai/controller';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    router.post('/api/ask', AIController.ask);


    return router;
  }


}

