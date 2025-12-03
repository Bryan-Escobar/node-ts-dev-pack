import { CustomError } from "../domain/errors/CustomError";
import { ErrorHandlerInterface } from "../domain/errors/errorHandler.interface";



//Helper para manejo centralizado de errores en controladores
export const handleError = (error: any): ErrorHandlerInterface => {
  let statusCode = 500,
    message = "Error interno del servidor";
  if (error instanceof CustomError) {
    statusCode = error.statusCode;
    message = error.message;
    console.log("Error manejado:", message);
  }

  console.error("Error manejado:", {
    statusCode,
    message,
    originalError: error,
  });

  return { statusCode, message };
};
