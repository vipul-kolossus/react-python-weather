#!/bin/bash
# Start both backend and frontend

echo "Starting Python FastAPI backend on port 8000..."
cd backend
pip install -r requirements.txt -q
uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!
cd ..

echo "Starting React frontend on port 3000..."
cd frontend
REACT_APP_API_URL=http://localhost:8000 npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "Weather App is running!"
echo "  Frontend: http://localhost:3000"
echo "  Backend API: http://localhost:8000/api/weather"
echo "  API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers."

trap "kill $BACKEND_PID $FRONTEND_PID" EXIT
wait
