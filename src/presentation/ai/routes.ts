/**
 * AI Routes
 * 
 * Este archivo define todas las rutas relacionadas con el módulo de AI.
 * Las rutas usan middlewares de validación con Zod para asegurar
 * que los datos de entrada sean correctos antes de llegar al controlador.
 */

import { Router } from "express";
import { AIController } from "./ai.controller";
import { AskRequestSchema, SimpleContentRequestSchema } from "./schemas";
import { validateBody } from "../middlewares/validation.middleware";

export class AiRoutes {
    static get routes(): Router {
        const router = Router();
        const aiController = new AIController();

        /**
         * GET /api/ai/health
         * Health check del servicio de AI
         */
        router.get("/health", aiController.health);

        /**
         * POST /api/ai/ask
         * Endpoint principal con function calling habilitado
         * Body: { prompt: string, model?: string, useFunctionCalling?: boolean }
         */
        router.post(
            "/ask",
            validateBody(AskRequestSchema),
            aiController.ask
        );

        /**
         * POST /api/ai/simple
         * Endpoint simplificado sin function calling
         * Body: { prompt: string }
         */
        router.post(
            "/simple",
            validateBody(SimpleContentRequestSchema),
            aiController.simple
        );

        return router;
    }
}
