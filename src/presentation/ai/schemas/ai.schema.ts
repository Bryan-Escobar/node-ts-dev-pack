/**
 * AI Schemas - Validación con Zod
 * 
 * Este archivo contiene todos los schemas de validación para el módulo de AI.
 * Usamos Zod para validación en tiempo de ejecución y generación de tipos TypeScript.
 */

import { z } from 'zod';

// ============================================================================
// Schemas de Request
// ============================================================================

/**
 * Schema para la solicitud de "ask" (preguntar a la AI)
 */
export const AskRequestSchema = z.object({
    prompt: z
        .string({
            error: 'El prompt debe ser un texto'
        })
        .min(1, 'El prompt es requerido')
        .max(10000, 'El prompt no puede exceder 10,000 caracteres'),

    model: z
        .string()
        .optional()
        .default('gemini-2.5-flash'),

    useFunctionCalling: z
        .boolean()
        .optional()
        .default(true)
});

/**
 * Schema para solicitud de contenido simple (sin function calling)
 */
export const SimpleContentRequestSchema = z.object({
    prompt: z
        .string({
            error: 'El prompt debe ser un texto'
        })
        .min(1, 'El prompt es requerido')
        .max(10000, 'El prompt no puede exceder 10,000 caracteres')
});

// ============================================================================
// Tipos inferidos de los schemas
// ============================================================================

export type AskRequest = z.infer<typeof AskRequestSchema>;
export type SimpleContentRequest = z.infer<typeof SimpleContentRequestSchema>;

// ============================================================================
// Schemas de Response (para documentación)
// ============================================================================

export const GeminiResponseSchema = z.object({
    success: z.boolean(),
    data: z.object({
        text: z.string().nullable(),
        functionCalls: z.array(z.object({
            name: z.string(),
            args: z.record(z.string(), z.unknown())
        })).optional()
    }).optional(),
    error: z.string().optional()
});

export type GeminiResponseDTO = z.infer<typeof GeminiResponseSchema>;
