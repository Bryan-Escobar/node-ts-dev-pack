import { Router } from "express";
import { ItemsController } from "./items.controller";




export class ItemsRoutes {
    static get routes() {
        const router = Router();
        const itemsController = new ItemsController();
        router.get('/', itemsController.getItems)
        return router;
    }
}
