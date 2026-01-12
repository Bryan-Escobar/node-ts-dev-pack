/**
 * Middleware de validación con Zod
 * 
 * Este middleware genérico permite validar el body de las peticiones
 * usando cualquier schema de Zod, centralizando la lógica de validación.
 */

import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ApiResponse, ValidationError } from '../../domain/interfaces';


/**
 * Crea un middleware de validación para un schema de Zod dado
 * @param schema - Schema de Zod para validar el body
 * @returns Middleware de Express
 */
export const validateBody = <T>(schema: ZodSchema<T>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            // Validar y parsear el body
            const validatedData = schema.parse(req.body);

            // Reemplazar body con datos validados y tipados
            req.body = validatedData;

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                // Formatear errores de validación
                const formattedErrors: ValidationError[] = error.issues.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message
                }));

                const response_: ApiResponse = {
                    statusCode: 400,
                    success: false,
                    message: 'Error de validación',
                    errors: formattedErrors
                };

                return res.status(400).json(response_);
            }

            // Error inesperado
            const response_: ApiResponse = {
                statusCode: 500,
                success: false,
                message: 'Error interno del servidor'
            };

            return res.status(500).json(response_);
        }
    };
};

/**
 * Middleware para validar query parameters
 * @param schema - Schema de Zod para validar query params
 */
export const validateQuery = <T>(schema: ZodSchema<T>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedData = schema.parse(req.query);
            req.query = validatedData as any;
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const formattedErrors: ValidationError[] = error.issues.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message
                }));

                const response_: ApiResponse = {
                    statusCode: 400,
                    success: false,
                    message: 'Error de validación en query parameters',
                    errors: formattedErrors
                };

                return res.status(400).json(response_);
            }

            const response_: ApiResponse = {
                statusCode: 500,
                success: false,
                message: 'Error interno del servidor'
            };

            return res.status(500).json(response_);
        }
    };
};

/**
 * Middleware para validar route parameters
 * @param schema - Schema de Zod para validar params
 */
export const validateParams = <T>(schema: ZodSchema<T>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedData = schema.parse(req.params);
            req.params = validatedData as any;
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const formattedErrors: ValidationError[] = error.issues.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message
                }));

                const response_: ApiResponse = {
                    statusCode: 400,
                    success: false,
                    message: 'Error de validación en parámetros de ruta',
                    errors: formattedErrors
                };

                return res.status(400).json(response_);
            }

            const response_: ApiResponse = {
                statusCode: 500,
                success: false,
                message: 'Error interno del servidor'
            };

            return res.status(500).json(response_);
        }
    };
};
