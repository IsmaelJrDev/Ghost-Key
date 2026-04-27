#!/usr/bin/env bash
# Lanzador de Ghost-Key
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

# 1. Instalar dependencias de Node.js si no existen
if [ ! -d "$ROOT_DIR/node_modules" ]; then
    echo "Instalando dependencias de Node.js..."
    (cd "$ROOT_DIR" && npm install)
fi

# 2. Configurar venv e instalar requerimientos de Python
if [ ! -d "$SCRIPT_DIR/venv" ]; then
    echo "Creando entorno virtual de Python..."
    python3 -m venv "$SCRIPT_DIR/venv"
fi

echo "Verificando dependencias de la interfaz..."
"$SCRIPT_DIR/venv/bin/pip" install -q -r "$SCRIPT_DIR/requirements.txt"

# 3. Ejecutar la aplicación
exec "$SCRIPT_DIR/venv/bin/python3" "$SCRIPT_DIR/monitor.py" "$@"

