import { Router } from "express";
import { AIController } from "./ai.controller";


export class AiRoutes {
    static get routes() {
        const router = Router();
        const aiController = new AIController();
        router.post("/ask/", aiController.ask);
        return router;
    }
}
