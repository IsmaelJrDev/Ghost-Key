"""Constantes globales: rutas del proyecto y paleta de colores."""
from pathlib import Path

# Rutas
BASE_DIR  = Path(__file__).parent.parent
ENV_FILE  = BASE_DIR / ".env"
LOG_FILE  = BASE_DIR / ".logs_db.txt"
SNAPS_DIR = BASE_DIR / "capturas"

# Colores 
BG_DARK   = "#0d1117"
BG_MID    = "#161b22"
BG_PANEL  = "#1a1f2e"
BG_HEADER = "#0d1117"
ACCENT    = "#8b5cf6"
CYAN      = "#00d4aa"
GREEN     = "#4ade80"
YELLOW    = "#fbbf24"
RED       = "#f87171"
FG_DIM    = "#8b949e"
FG_MAIN   = "#e6edf3"
BORDER    = "#30363d"
