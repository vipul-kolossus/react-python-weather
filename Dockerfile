# Stage 1: Build React frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps
COPY frontend/public ./public
COPY frontend/src ./src
# Empty REACT_APP_API_URL so calls use relative URLs (same server)
ENV REACT_APP_API_URL=
RUN npm run build

# Stage 2: Python backend serves API + React static files
FROM python:3.11-slim
WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/main.py .

# Copy React build from stage 1
COPY --from=frontend-builder /app/frontend/build ./build

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
