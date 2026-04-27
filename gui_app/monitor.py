#!/usr/bin/env python3
"""
Ghost-Key Monitor — punto de entrada.
Ejecutar directamente: python3 monitor.py
"""
import sys
import os

# Permite ejecutar como script suelto sin instalar el paquete
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from gui_app.app import GhostKeyMonitor

if __name__ == "__main__":
    app = GhostKeyMonitor()
    app.protocol("WM_DELETE_WINDOW", app.on_close)
    app.mainloop()
