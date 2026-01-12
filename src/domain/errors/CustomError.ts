export class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, CustomError.prototype); // Necesario para extender correctamente Error
  }

  // Factory methods para errores comunes
  static badRequest(message: string) {
    return new CustomError(message, 400);
  }

  static unauthorized(message = 'No autorizado') {
    return new CustomError(message, 401);
  }

  static forbidden(message = 'Acceso denegado') {
    return new CustomError(message, 403);
  }

  static notFound(message = 'Recurso no encontrado') {
    return new CustomError(message, 404);
  }

  static internal(message = 'Error interno del servidor') {
    return new CustomError(message, 500);
  }
}
