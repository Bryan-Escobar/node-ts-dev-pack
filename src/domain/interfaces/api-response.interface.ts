/**
 * API Response Interface
 * 
 * Interfaz única y simple para todas las respuestas de la API.
 * Los campos opcionales permiten usarla tanto para éxito como para error.
 */

/**
 * Error de validación individual
 */
export interface ValidationError {
    field: string;
    message: string;
}

/**
 * Respuesta estándar de la API
 */
export interface ApiResponse<T = unknown> {
    statusCode: number;
    success: boolean;
    message: string;
    data?: T;
    errors?: ValidationError[];
}

