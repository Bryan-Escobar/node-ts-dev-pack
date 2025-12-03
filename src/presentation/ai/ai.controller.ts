/**
 * AI Controller
 * 
 * Este controlador maneja las peticiones HTTP relacionadas con AI.
 * Siguiendo el principio de responsabilidad única, el controlador solo
 * se encarga de:
 * - Recibir la petición HTTP
 * - Delegar la lógica de negocio al servicio correspondiente
 * - Formatear y enviar la respuesta
 * 
 * La lógica de negocio está en el servicio GeminiService.
 * La validación se maneja en el middleware con Zod.
 */

import { Request, Response } from "express";
import { AskRequest, SimpleContentRequest } from "./schemas";
import { ApiResponse } from "../../domain/interfaces";
import { GeminiResponse, GeminiService } from "../../services/gemini.service";

// Tipos específicos para las respuestas de AI
interface AskResponseData {
    text: string | null;
    functionCalls?: GeminiResponse['functionCalls'];
}

interface SimpleResponseData {
    text: string | null;
}

interface HealthResponseData {
    service: string;
    status: string;
    timestamp: string;
}

export class AIController {
    // Inyección del servicio - facilita testing y desacoplamiento
    private readonly geminiService: GeminiService;

    constructor(geminiService?: GeminiService) {
        this.geminiService = geminiService ?? new GeminiService();
    }

    /**
     * POST /api/ai/ask
     * Endpoint principal para interactuar con Gemini AI
     * Soporta function calling para funcionalidades avanzadas
     */
    public ask = async (req: Request, res: Response): Promise<void> => {
        try {
            // El body ya está validado por el middleware de Zod
            const { prompt, model, useFunctionCalling } = req.body as AskRequest;

            const response = await this.geminiService.generateContent({
                prompt,
                model,
                useFunctionCalling
            });

            const response_: ApiResponse<AskResponseData> = {
                statusCode: 200,
                success: true,
                message: 'Contenido generado exitosamente',
                data: {
                    text: response.text,
                    functionCalls: response.functionCalls
                }
            };

            res.status(200).json(response_);
        } catch (error) {
            console.error('Error en AIController.ask:', error);

            const response_: ApiResponse = {
                statusCode: 500,
                success: false,
                message: 'Error al procesar la solicitud de AI'
            };

            res.status(500).json(response_);
        }
    };

    /**
     * POST /api/ai/simple
     * Endpoint simplificado para obtener respuestas de texto
     * Sin function calling - ideal para consultas simples
     */
    public simple = async (req: Request, res: Response): Promise<void> => {
        try {
            const { prompt } = req.body as SimpleContentRequest;

            const response = await this.geminiService.generateSimpleContent(prompt);

            const response_: ApiResponse<SimpleResponseData> = {
                statusCode: 200,
                success: true,
                message: 'Contenido generado exitosamente',
                data: {
                    text: response.text
                }
            };

            res.status(200).json(response_);
            return;
        } catch (error) {
            console.error('Error en AIController.simple:', error);

            const response_: ApiResponse = {
                statusCode: 500,
                success: false,
                message: 'Error al procesar la solicitud de AI'
            };

            res.status(500).json(response_);
        }
    };

    /**
     * GET /api/ai/health
     * Health check para verificar que el servicio está funcionando
     */
    public health = async (_req: Request, res: Response): Promise<void> => {
        const response_: ApiResponse<HealthResponseData> = {
            statusCode: 200,
            success: true,
            message: 'Servicio funcionando correctamente',
            data: {
                service: 'AI Service',
                status: 'healthy',
                timestamp: new Date().toISOString()
            }
        };

        res.status(200).json(response_);
    };
}