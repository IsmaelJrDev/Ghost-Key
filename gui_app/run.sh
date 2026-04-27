#!/usr/bin/env bash
# Lanzador de Ghost-Key
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec "$SCRIPT_DIR/venv/bin/python3" "$SCRIPT_DIR/monitor.py" "$@"
