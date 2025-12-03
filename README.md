# Node.js + TypeScript + AI API Template

API de ejemplo profesional con **Google Gemini AI**, diseñada como fundación para proyectos de producción.

## 🏗️ Arquitectura

Este proyecto sigue una arquitectura limpia con separación de responsabilidades:

```
src/
├── config/                 # Configuración y variables de entorno
│   └── envs.ts
├── services/               # Servicios de negocio
│   └── gemini/
│       ├── gemini.service.ts   # Lógica de Gemini AI
│       └── index.ts
├── presentation/           # Capa de presentación (HTTP)
│   ├── middlewares/
│   │   └── validation.middleware.ts  # Validación con Zod
│   ├── ai/
│   │   ├── ai.controller.ts    # Controladores
│   │   ├── routes.ts           # Definición de rutas
│   │   └── schemas/
│   │       └── ai.schema.ts    # Schemas de validación Zod
│   ├── routes.ts           # Router principal
│   └── server.ts           # Configuración del servidor
└── app.ts                  # Entry point
```

## 🚀 Instalación

1. Clonar `.env.template` a `.env` y configurar las variables de entorno:
   ```env
   PORT=3000
   GEMINI_API_KEY=tu_api_key_de_gemini
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. (Opcional) Si necesitas base de datos:
   ```bash
   docker-compose up -d
   ```

4. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```

## 📡 API Endpoints

### Health Check
```http
GET /api/ai/health
```
Respuesta:
```json
{
  "success": true,
  "service": "AI Service",
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Ask (con Function Calling)
```http
POST /api/ai/ask
Content-Type: application/json

{
  "prompt": "¿Qué tiempo hace en Madrid?",
  "model": "gemini-2.5-flash",        // opcional
  "useFunctionCalling": true           // opcional, default: true
}
```

Respuesta:
```json
{
  "success": true,
  "data": {
    "text": "...",
    "functionCalls": [
      {
        "name": "obtenerClima",
        "args": { "ciudad": "Madrid" }
      }
    ]
  }
}
```

### Simple (sin Function Calling)
```http
POST /api/ai/simple
Content-Type: application/json

{
  "prompt": "Explica qué es TypeScript en 2 oraciones"
}
```

Respuesta:
```json
{
  "success": true,
  "data": {
    "text": "TypeScript es un superconjunto de JavaScript..."
  }
}
```

## 🛡️ Validación

La API utiliza **Zod** para validación de datos:

- `prompt`: string, requerido, 1-10,000 caracteres
- `model`: string, opcional, default: "gemini-2.5-flash"
- `useFunctionCalling`: boolean, opcional, default: true

Errores de validación devuelven status `400`:
```json
{
  "success": false,
  "error": "Error de validación",
  "details": [
    {
      "field": "prompt",
      "message": "El prompt no puede estar vacío"
    }
  ]
}
```

## 🧩 Estructura de Código

### Servicios
Los servicios encapsulan la lógica de negocio. El `GeminiService` maneja toda la comunicación con la API de Gemini.

### Controladores
Los controladores manejan las peticiones HTTP, delegando la lógica al servicio correspondiente.

### Schemas
Los schemas de Zod definen la estructura y validación de los datos de entrada/salida.

### Middlewares
Middlewares reutilizables para validación, autenticación, etc.

## 📦 Scripts

```bash
npm run dev      # Desarrollo con hot-reload
npm run build    # Compilar TypeScript
npm run start    # Build + ejecutar producción
```

## 🔧 Tecnologías

- **Node.js** + **TypeScript**
- **Express** - Framework web
- **Zod** - Validación de schemas
- **@google/genai** - SDK de Google Gemini
- **env-var** - Validación de variables de entorno
