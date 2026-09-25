from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import init_db, close_db
from app.routes.auth import router as auth_router
from app.routes.rbac import router as rbac_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: initialize database connection and indexes
    init_db()
    yield
    # Shutdown: clean up database connections
    close_db()


app = FastAPI(
    title="Medical Laboratory Management API",
    description="Backend API for Laboratory Authentication and Management (Phase 1)",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routes
app.include_router(auth_router, prefix="/api")
app.include_router(rbac_router, prefix="/api")


@app.get("/", tags=["Health"])
def root():
    return {
        "status": "online",
        "service": "Medical Laboratory Management Backend API",
        "version": "1.0.0",
        "docs": "/docs",
    }


@app.get("/api/health", tags=["Health"])
def health_check():
    return {"status": "healthy"}
