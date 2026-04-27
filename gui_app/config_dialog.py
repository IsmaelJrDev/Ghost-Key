"""Diálogo modal de configuración del servidor y correo."""
import tkinter as tk
from .constants import (BG_MID, BG_PANEL, BG_DARK, ACCENT,
                        BORDER, FG_DIM, FG_MAIN, GREEN)
from .env_utils import read_env, write_env


class ConfigDialog(tk.Toplevel):
    def __init__(self, parent):
        super().__init__(parent)
        self.parent = parent
        self.title("Configuración")
        self.configure(bg=BG_MID)
        self.resizable(False, False)
        self.grab_set()

        env = read_env()

        tk.Label(self, text="⚙  Configuración del servidor",
                 bg=BG_MID, fg=ACCENT,
                 font=("Segoe UI", 13, "bold")).pack(pady=(20, 4), padx=30)
        tk.Frame(self, bg=BORDER, height=1).pack(fill="x", padx=20)

        form = tk.Frame(self, bg=BG_MID)
        form.pack(padx=30, pady=16, fill="x")

        def lbl(text):
            tk.Label(form, text=text, bg=BG_MID, fg=FG_DIM,
                     font=("Consolas", 9)).pack(anchor="w", pady=(8, 2))

        def entry(default="") -> tk.Entry:
            e = tk.Entry(form, bg=BG_PANEL, fg=FG_MAIN,
                         insertbackground=FG_MAIN, relief="flat",
                         font=("Consolas", 11), highlightthickness=1,
                         highlightbackground=BORDER, highlightcolor=ACCENT)
            e.pack(fill="x", ipady=6)
            e.insert(0, default)
            return e

        lbl("IP del servidor (SERVER_IP)")
        self.e_ip = entry(env.get("SERVER_IP", "192.168.1.1"))

        lbl("Puerto (PORT)")
        self.e_port = entry(env.get("PORT", "3000"))

        lbl("Correo origen (EMAIL_USER)")
        self.e_user = entry(env.get("EMAIL_USER", ""))

        lbl("Contraseña de app (EMAIL_PASSWORD)")
        self.e_pass = tk.Entry(form, bg=BG_PANEL, fg=FG_MAIN,
                               insertbackground=FG_MAIN, show="●",
                               relief="flat", font=("Consolas", 11),
                               highlightthickness=1, highlightbackground=BORDER,
                               highlightcolor=ACCENT)
        self.e_pass.pack(fill="x", ipady=6)
        self.e_pass.insert(0, env.get("EMAIL_PASSWORD", ""))

        lbl("Correo destino (EMAIL_DESTINATION)")
        self.e_dest = entry(env.get("EMAIL_DESTINATION", ""))

        btn_row = tk.Frame(self, bg=BG_MID)
        btn_row.pack(pady=(4, 20), padx=30, fill="x")

        tk.Button(btn_row, text="Cancelar", command=self.destroy,
                  bg=BG_PANEL, fg=FG_DIM, activebackground=BORDER,
                  activeforeground=FG_MAIN, relief="flat",
                  font=("Segoe UI", 10), cursor="hand2",
                  padx=16, pady=6).pack(side="left")

        tk.Button(btn_row, text="  Guardar  ", command=self._save,
                  bg=ACCENT, fg="white", activebackground="#7c3aed",
                  activeforeground="white", relief="flat",
                  font=("Segoe UI", 10, "bold"), cursor="hand2",
                  padx=16, pady=6).pack(side="right")

        self.update_idletasks()
        pw, ph = parent.winfo_width(), parent.winfo_height()
        px, py = parent.winfo_rootx(), parent.winfo_rooty()
        w, h   = self.winfo_width(), self.winfo_height()
        self.geometry(f"+{px + pw//2 - w//2}+{py + ph//2 - h//2}")

    def _save(self):
        write_env("SERVER_IP",         self.e_ip.get().strip())
        write_env("PORT",              self.e_port.get().strip())
        write_env("EMAIL_USER",        self.e_user.get().strip())
        write_env("EMAIL_PASSWORD",    self.e_pass.get().strip())
        write_env("EMAIL_DESTINATION", self.e_dest.get().strip())
        self.parent.status_bar("✔  Configuración guardada en .env", GREEN)
        self.destroy()
