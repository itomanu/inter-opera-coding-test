# Coding Challenge: Sales Dashboard with Next.js & FastAPI

## Overview
Your task is to build a simple, full-stack application featuring:
1. **Next.js** as the frontend framework.
2. **FastAPI** as the backend API layer.
3. **Dummy JSON Data** (provided) with sales-related information.

# GreenSales Project

The project is called GreenSales — just a randomly chosen name.

## Features

- 📊 Sales data visualization and management
- 🤖 AI-powered insights using Google's Gemini API
- 🎨 Modern, responsive UI with Tailwind CSS
- 📱 Mobile-friendly interface

## Tech Stack

### Frontend
- Next.js 15.3.0
- React 19
- TypeScript
- Tailwind CSS
- Lucide React (for icons)
- React Markdown

### Backend
- FastAPI
- Python 3.x
- Google Gemini AI
- Uvicorn (ASGI server)

## Prerequisites

- Node.js (v18 or higher)
- Python 3.8 or higher
- npm or yarn
- pip

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file with the following variables:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the backend server:
   ```bash
   python main.py
   ```
   The server will start at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The frontend will be available at `http://localhost:3000`

## Use Deepseek AI
1. The backend is designed to support additional LLM providers besides Gemini. You can use Deepseek if you have an API key and enough credits.

2. Add `DEEPSEEK_API_KEY` in the `.env` file

3. Update `SUPPORTED_LLM` in `services/llm_handler/__init__.py`:
   ```python
      SUPPORTED_LLM = {
         "gemini": GeminiHandler(),
         "deepseek": DeepseekHandler(),
      }
   ```

4. In `api/ai.py`, change the handler selection to:
   ```python
   llm_handler = SUPPORTED_LLM.get("deepseek")
   ```

## Project Structure

```
.
├── backend/
│   ├── app/
│   │   ├── api/             # API routes
│   │   │   ├── ai.py        # AI endpoints
│   │   │   └── sales.py     # Sales data endpoints
│   │   ├── models/          # Data models
│   │   ├── services/        # Business logic
│   │   │   └── llm_handler/ # AI model handlers
│   │   └── data/            # Data files
│   ├── main.py              # FastAPI application
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── app/             # Next.js pages
    │   ├── components/      # React components
    │   ├── services/        # API services
    │   ├── context/         # React context
    │   └── lib/             # Utility functions
    └── package.json
```

## API Documentation

The backend provides the following main endpoints:

- `GET /api/sales` - Retrieve sales data
- `POST /api/ai` - Get AI-powered insights

For detailed API documentation, visit `http://localhost:8000/docs` when the backend server is running.

## Design Decisions

1. **Frontend Architecture**
   - **Modular File Structure**: Pages, components, and utilities are organized under separeted directory (check the [Project Structure](#project-structure))
   - **Separation of Concerns**: API logic is abstracted into `api-service.ts`
   - **Reusability**: Components like `MessageBubble`, `LoadingBubble`, `Sidebar`, `DealStatsCard`, etc are reusable and self-contained
   - **Responsiveness**: Layout is mobile-first and adapts fluidly to screen sizes
   - **User Experience**: Focused on clean interactions, visual clarity, and feedback (e.g., scroll behavior, loading indicators)

2. **Backend Architecture**
   - FastAPI for high performance and automatic API documentation
   - Modular structure with clear separation of concerns
   - Environment-based configuration

3. **AI Integration**
   - Google Gemini AI
   - Easily extendable to support other AI models under `app/services/llm_handler/`
   - Error handling and fallback mechanisms
