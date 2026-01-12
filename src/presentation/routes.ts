/**
 * Application Routes
 * 
 * Este archivo centraliza todas las rutas de la aplicación.
 * Cada módulo tiene su propio archivo de rutas que se importa aquí.
 */

import { Router } from 'express';
import { AiRoutes } from './ai/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // =====================================================================
    // API Routes
    // =====================================================================

    /**
     * AI Module - /api/ai
     * Endpoints para interactuar con Google Gemini AI
     */
    router.use('/api/ai', AiRoutes.routes);

    // Aquí se pueden agregar más módulos:
    // router.use('/api/users', UserRoutes.routes);
    // router.use('/api/products', ProductRoutes.routes);

    return router;
  }
}

