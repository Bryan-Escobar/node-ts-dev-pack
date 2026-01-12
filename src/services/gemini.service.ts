/**
 * Gemini AI Service
 * 
 * Este servicio encapsula toda la lógica de comunicación con Google Gemini AI.
 * Siguiendo el principio de responsabilidad única (SRP), este servicio solo
 * se encarga de interactuar con la API de Gemini.
 */

import { GoogleGenAI, Type } from "@google/genai";
import { envs } from "../config/envs";

// ============================================================================
// Declaraciones de funciones para Gemini (Function Calling)
// ============================================================================

const obtenerClimaFunctionDeclaration = {
    name: "obtenerClima",
    description: "Obtiene el clima actual de una ciudad.",
    parameters: {
        type: Type.OBJECT,
        properties: {
            ciudad: { type: Type.STRING, description: "Nombre de la ciudad" }
        },
        required: ["ciudad"]
    }
};

const recomendarLibroFunctionDeclaration = {
    name: "recomendarLibro",
    description: "Recomienda un libro basado en el género proporcionado.",
    parameters: {
        type: Type.OBJECT,
        properties: {
            genero: { type: Type.STRING, description: "Género literario" }
        },
        required: ["genero"]
    }
};

// ============================================================================
// Interfaces
// ============================================================================

export interface GeminiResponse {
    text: string | null;
    functionCalls?: Array<{
        name: string;
        args: Record<string, unknown>;
    }>;
    rawResponse: unknown;
}

export interface GenerateContentOptions {
    prompt: string;
    model?: string;
    useFunctionCalling?: boolean;
}

// ============================================================================
// Servicio de Gemini AI
// ============================================================================

export class GeminiService {
    private readonly ai: GoogleGenAI;
    private readonly defaultModel = 'gemini-2.5-flash';

    constructor() {
        this.ai = new GoogleGenAI({ apiKey: envs.GEMINI_API_KEY });
    }

    /**
     * Genera contenido usando Gemini AI
     * @param options - Opciones para la generación de contenido
     * @returns Respuesta procesada de Gemini
     */
    async generateContent(options: GenerateContentOptions): Promise<GeminiResponse> {
        const { prompt, model = this.defaultModel, useFunctionCalling = true } = options;

        const config = useFunctionCalling
            ? {
                tools: [
                    {
                        functionDeclarations: [
                            recomendarLibroFunctionDeclaration,
                            obtenerClimaFunctionDeclaration
                        ]
                    }
                ]
            }
            : undefined;

        const response = await this.ai.models.generateContent({
            model,
            contents: prompt,
            config
        });

        return this.processResponse(response);
    }

    /**
     * Genera contenido simple sin function calling
     * @param prompt - El prompt para Gemini
     * @returns Respuesta procesada de Gemini
     */
    async generateSimpleContent(prompt: string): Promise<GeminiResponse> {
        return this.generateContent({
            prompt,
            useFunctionCalling: false
        });
    }

    /**
     * Procesa la respuesta de Gemini para un formato más manejable
     */
    private processResponse(response: any): GeminiResponse {
        const candidate = response.candidates?.[0];
        const content = candidate?.content;
        const parts = content?.parts || [];

        // Extraer texto si existe
        const textPart = parts.find((part: any) => part.text);
        const text = textPart?.text || null;

        // Extraer function calls si existen
        const functionCallParts = parts.filter((part: any) => part.functionCall);
        const functionCalls = functionCallParts.map((part: any) => ({
            name: part.functionCall.name,
            args: part.functionCall.args
        }));

        return {
            text,
            functionCalls: functionCalls.length > 0 ? functionCalls : undefined,
            rawResponse: response
        };
    }
}
