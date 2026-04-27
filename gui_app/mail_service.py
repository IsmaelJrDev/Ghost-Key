"""Lógica de envío de correo personalizado vía Gmail SMTP SSL."""
import smtplib
import threading
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from .env_utils import read_env
from .constants import YELLOW, RED, GREEN, FG_DIM


def send_custom_email(to_addr: str, subject: str, body: str,
                      on_success, on_error):
    """
    Envía un correo en un hilo separado usando las credenciales del .env.
    - on_success(to_addr): callback al terminar OK.
    - on_error(msg):       callback si hay excepción.
    """
    env   = read_env()
    user  = env.get("EMAIL_USER", "")
    passw = env.get("EMAIL_PASSWORD", "")

    if not user or not passw:
        on_error("Configura EMAIL_USER y EMAIL_PASSWORD en ⚙ Config.")
        return

    def _do():
        try:
            msg = MIMEMultipart()
            msg["From"]    = user
            msg["To"]      = to_addr
            msg["Subject"] = subject or "(sin asunto)"
            msg.attach(MIMEText(body, "plain", "utf-8"))

            with smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=15) as srv:
                srv.login(user, passw)
                srv.sendmail(user, to_addr, msg.as_string())

            on_success(to_addr)
        except Exception as e:
            on_error(str(e))

    threading.Thread(target=_do, daemon=True).start()
