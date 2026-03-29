.PHONY: dev build stop clean logs

# Start everything with Docker Compose
dev:
	cp -n .env.example .env 2>/dev/null || true
	cd infra && docker compose up --build

# Start in background
dev-bg:
	cd infra && docker compose up --build -d

# Stop all containers
stop:
	cd infra && docker compose down

# Stop and remove volumes (full reset)
clean:
	cd infra && docker compose down -v

# Tail logs
logs:
	cd infra && docker compose logs -f

# Engine only (for Python dev without Docker)
engine-local:
	cd engine && uvicorn app.main:app --reload --port 8000

# Gateway only
gateway-local:
	cd gateway && npm run dev

# Frontend only
frontend-local:
	cd frontend && npm run dev
