# Coding Challenge: Sales Dashboard with Next.js & FastAPI

## Overview
Your task is to build a simple, full-stack application featuring:
1. **Next.js** as the frontend framework.
2. **FastAPI** as the backend API layer.
3. **Dummy JSON Data** (provided) with sales-related information.

You will parse the provided **`dummyData.json`** and render its nested structures in a user-friendly interface. Optionally, you may include a simple AI feature as a bonus.

---

### Backend (FastAPI)

#### API Features
- Sales data from dummyData
- Integrates with Gemini AI (and deepseek) to provide intelligent answers to user questions.
- Dummy data was updated to:
  - Include more diverse skills for better UI/UX testing.
  - Expand client lists per sales rep to stress-test the display logic.

---

### Frontend (Next.js)

#### Features

1. **Sales Dashboard**
   - Displays a list of sales representatives with clients and deals data.
   - Sortable columns with ascending/descending toggling.
   - Responsive layout with optimized UI for both mobile and desktop.
   - Includes interactive deal statistics and skill summaries.
   - Avatar group indicators with overlap and "+X" badge for overflow.

2. **AskBot (AI Chat UI)**
   - Simple chat interface to ask questions.
   - Fetches answers from an API (AI response).
   - Loading state, auto-scroll, and input focus management.
   - Support Markdown formatting.

#### Tech Stack

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **Lucide-react** (icons)
- **React Markdown** (for rendering bot answers)
- **[Pravatar.cc](https://pravatar.cc/)** (for dummy avatar)

#### Architecture & Design Choices

- **Modular File Structure**: Pages, components, and utilities are organized under `src/app`, `src/components`, `src/context`, `src/lib` and `src/services`.
- **Separation of Concerns**: API logic is abstracted into `api-service.ts`.
- **Reusability**: Components like `MessageBubble`, `Sidebar`, and `DealStatsCard` are reusable and self-contained.
- **Responsiveness**: Layout is mobile-first and adapts fluidly to screen sizes.
- **User Experience**: Focused on clean interactions, visual clarity, and feedback (e.g., scroll behavior, loading indicators).

---

## Getting Started

1. **Clone the repository**

```bash
git https://github.com/itomanu/inter-opera-coding-test
cd inter-opera-coding-test
```

2. **Backend Setup**
   - Navigate to the `backend` directory.
   - Create a virtual environment (optional but recommended).
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Run the server:
     ```bash
     uvicorn main:app --host 0.0.0.0 --port 8000 --reload
     ```  
   - Confirm the API works by visiting `http://localhost:8000/docs`.

3. **Frontend Setup**  
   - Navigate to the `frontend` directory.  
   - Install dependencies:  
     ```bash
     npm install
     ```  
   - Start the development server:
     ```bash
     npm run dev
     ```
   - Open `http://localhost:3000` to view the app.

4. **Environtment Setup**  
   - The backend requires a `GEMINI_API_KEY` to access the Gemini API. You need to define this in a `.env` file within the backend directory.
   - The frontend uses the `NEXT_PUBLIC_API_BASE_URL` environment variable to identify the API base URL. You might need to define this in `.env.local` file inside the frontend directory.

5. **Use Deepseek AI**
   - The backend is designed to support additional LLM providers besides Gemini. You can use Deepseek if you have an API key and sufficient credits.
   - Define `DEEPSEEK_API_KEY` in the `.env` file
   - Add deepseek to `SUPPORTED_LLM` on `services/llm_handler/__init__.py`:
   ```python
    SUPPORTED_LLM = {
        "gemini": GeminiHandler(),
        "deepseek": DeepseekHandler(),
    }
   ```
   - To use Deepseek in `api/ai.py`, update the handler selection:
   ```python
   llm_handler = SUPPORTED_LLM.get("deepseek")
   ```

---

## Potential Improvements

- Implement persistent chat history using localStorage or backend storage.
- Improve chart visualizations with libraries like `recharts` or `chart.js`.
- Adding testing and CI/CD pipeline.

---

## Feedback & Contact

Feel free to reach out if you have feedback or questions about this project.

