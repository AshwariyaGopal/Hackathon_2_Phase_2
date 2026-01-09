# Evolution of Todo - Full-Stack Application

A stunning, professional, and visually polished multi-user todo application built with Next.js and FastAPI.

## Project Structure

- `frontend/`: Next.js 16+ application (App Router, Tailwind CSS v4, Better Auth)
- `backend/`: FastAPI application (SQLModel, Neon PostgreSQL, JWT Auth)
- `specs/`: Feature specifications and implementation plans

## Backend Setup (FastAPI)

1.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```
2.  **Create and activate virtual environment**:
    ```bash
    python -m venv venv
    # Windows
    venv\Scripts\activate
    # Linux/macOS
    source venv/bin/activate
    ```
3.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
4.  **Configure environment variables**:
    Create a `.env` file in the `backend/` directory:
    ```env
    BETTER_AUTH_SECRET=By1kFh4jR822D93OLUbnnHNyD9H1Oej9
    BETTER_AUTH_URL=http://localhost:3000
    DATABASE_URL=postgresql://your_neon_db_url
    ```
5.  **Run the development server**:
    ```bash
    uvicorn main:app --reload --port 8000
    ```

## Frontend Setup (Next.js)

1.  **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Configure environment variables**:
    Create a `.env.local` file in the `frontend/` directory:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8000/api
    BETTER_AUTH_URL=http://localhost:3000
    ```
4.  **Run the development server**:
    ```bash
    npm run dev
    ```

## Integration

The frontend and backend integrate seamlessly via JWT tokens.
- Frontend handles user authentication via Better Auth.
- Backend verifies JWT tokens using the shared `BETTER_AUTH_SECRET`.
- All task operations are scoped to the authenticated user.
