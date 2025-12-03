import { GoogleGenAI, Type } from "@google/genai";
import { envs } from "../../config/envs";
import { Request, Response } from "express";

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

export class AIController {
    public ask = async (req: Request, res: Response) => {
        const prompt = req.body.prompt;
        const ai = new GoogleGenAI({ apiKey: envs.GEMINI_API_KEY });

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                tools: [
                    { functionDeclarations: [recomendarLibroFunctionDeclaration, obtenerClimaFunctionDeclaration] }
                ]
            }
        });
        res.json(response);
    }
}