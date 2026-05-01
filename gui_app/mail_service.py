"""Lógica de envío de correo personalizado vía Gmail SMTP SSL."""
import html as _html
import re
import smtplib
import threading
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from .env_utils import read_env
from .constants import YELLOW, RED, GREEN, FG_DIM


# ── Conversión inteligente de texto plano → HTML con formato ─────────────

def _body_to_html(body: str) -> str:
    """Convierte texto plano a un correo HTML profesional con formato.

    Detecta automáticamente:
     • Líneas cortas sin puntuación final → encabezados (h2/h3)
     • Líneas que inician con guión/asterisco/punto → viñetas (ul/li)
     • URLs entre paréntesis → botón CTA estilizado
     • Texto entre [BOTÓN: …] → botón CTA estilizado
     • Última línea corta → firma
     • Todo lo demás → párrafos <p>
    """
    # Si ya es HTML crudo, solo envolverlo en la plantilla
    if bool(re.search(
            r"<\s*(p|div|br|h[1-6]|table|ul|ol|li|a|img|span|b|i|strong|em)\b",
            body, re.I)):
        return _wrap_template(body)

    lines = body.splitlines()
    blocks: list[str] = []
    i = 0
    n = len(lines)
    in_list = False

    while i < n:
        raw = lines[i]
        stripped = raw.strip()

        # ── Línea vacía → cerrar lista abierta, saltar
        if not stripped:
            if in_list:
                blocks.append("</ul>")
                in_list = False
            i += 1
            continue

        # ── Patrón  [BOTÓN: TEXTO]  seguido de  (URL)
        btn_match = re.match(r"^\[BOT[OÓ]N:\s*(.+?)\]\s*$", stripped, re.I)
        if btn_match:
            btn_text = _html.escape(btn_match.group(1))
            # Buscar URL en la siguiente línea
            url = "#"
            if i + 1 < n:
                url_match = re.match(r"^\((.+?)\)\s*$", lines[i + 1].strip())
                if url_match:
                    url = url_match.group(1)
                    i += 1  # consumir la línea de URL
            if in_list:
                blocks.append("</ul>")
                in_list = False
            blocks.append(
                f'<div style="text-align:center;margin:28px 0;">'
                f'<a href="{url}" target="_blank" style="'
                f"display:inline-block;background:#1a6fc4;color:#ffffff;"
                f"text-decoration:none;font-weight:700;font-size:15px;"
                f"padding:14px 36px;border-radius:6px;letter-spacing:.3px;"
                f'">{btn_text}</a></div>'
            )
            i += 1
            continue

        # ── URL sola entre paréntesis → botón genérico
        url_only = re.match(r"^\(?(https?://\S+)\)?\s*$", stripped)
        if url_only:
            url = url_only.group(1)
            if in_list:
                blocks.append("</ul>")
                in_list = False
            blocks.append(
                f'<div style="text-align:center;margin:28px 0;">'
                f'<a href="{url}" target="_blank" style="'
                f"display:inline-block;background:#1a6fc4;color:#ffffff;"
                f"text-decoration:none;font-weight:700;font-size:15px;"
                f"padding:14px 36px;border-radius:6px;letter-spacing:.3px;"
                f'">ACCEDER AL PORTAL →</a></div>'
            )
            i += 1
            continue

        # ── Viñeta (-, *, •)
        bullet = re.match(r"^[\-\*•]\s+(.+)$", stripped)
        if bullet:
            if not in_list:
                blocks.append(
                    '<ul style="padding-left:24px;margin:12px 0;'
                    'color:#333333;font-size:14px;line-height:1.8;">'
                )
                in_list = True
            blocks.append(f"<li>{_html.escape(bullet.group(1))}</li>")
            i += 1
            continue

        # ── Encabezado: línea corta sin punto final (títulos, subtítulos)
        #    Solo si no es la primera línea (el subject ya cubre eso)
        is_short = len(stripped) < 100
        no_period = not stripped.endswith(".")
        has_upper = stripped[0].isupper() if stripped else False
        # Considerar como encabezado si: corta, sin punto, y tiene alguna
        # palabra clave o es la primera/segunda línea del cuerpo
        if is_short and no_period and has_upper and not stripped.startswith("Nota:"):
            # Determinar nivel: primera aparición → h2, resto → h3
            if in_list:
                blocks.append("</ul>")
                in_list = False
            # Si parece un encabezado principal (contiene marca o título largo)
            if any(kw in stripped.lower() for kw in ("copa", "fifa", "portal", "registro")):
                blocks.append(
                    f'<h2 style="color:#1a1a2e;font-size:20px;'
                    f'font-weight:700;margin:24px 0 8px;'
                    f'border-bottom:2px solid #1a6fc4;padding-bottom:8px;">'
                    f"{_html.escape(stripped)}</h2>"
                )
            elif stripped.endswith(":"):
                blocks.append(
                    f'<h3 style="color:#1a1a2e;font-size:16px;'
                    f'font-weight:700;margin:20px 0 6px;">'
                    f"{_html.escape(stripped)}</h3>"
                )
            else:
                # Párrafo corto que podría ser saludo/firma
                blocks.append(
                    f'<p style="color:#333333;font-size:14px;'
                    f'line-height:1.7;margin:10px 0;">'
                    f"{_html.escape(stripped)}</p>"
                )
            i += 1
            continue

        # ── Párrafo normal
        if in_list:
            blocks.append("</ul>")
            in_list = False
        blocks.append(
            f'<p style="color:#333333;font-size:14px;'
            f'line-height:1.7;margin:10px 0;">'
            f"{_html.escape(stripped)}</p>"
        )
        i += 1

    if in_list:
        blocks.append("</ul>")

    return _wrap_template("\n".join(blocks))


def _wrap_template(inner_html: str) -> str:
    """Envuelve el contenido en una plantilla de correo profesional."""
    return f"""\
<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f0f2f5;font-family:Arial,Helvetica,sans-serif;">
  <!-- Contenedor principal -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
         style="background-color:#f0f2f5;padding:30px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0"
             style="max-width:600px;width:100%;background:#ffffff;
                    border-radius:8px;overflow:hidden;
                    box-shadow:0 2px 8px rgba(0,0,0,.08);">
        <!-- Barra superior de marca -->
        <tr>
          <td style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);
                     padding:24px 32px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;
                       letter-spacing:.5px;">
               Copa Mundial de la FIFA 2026™
            </h1>
            <p style="margin:6px 0 0;color:#a3bffa;font-size:12px;
                      letter-spacing:1px;text-transform:uppercase;">
              Departamento de Ticketing Oficial
            </p>
          </td>
        </tr>
        <!-- Cuerpo del correo -->
        <tr>
          <td style="padding:32px 36px 28px;">
            {inner_html}
          </td>
        </tr>
        <!-- Pie de página -->
        <tr>
          <td style="background:#1a1a2e;padding:20px 32px;text-align:center;">
            <p style="margin:0;color:#8899aa;font-size:11px;line-height:1.5;">
              © 2026 FIFA. Todos los derechos reservados.<br>
              Este correo fue generado automáticamente. No responda a este mensaje.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>"""


def send_custom_email(to_addr: str, subject: str, body: str,
                      on_success, on_error):
    """
    Envía un correo HTML en un hilo separado usando las credenciales del .env.
    El cuerpo de texto se transforma automáticamente a HTML profesional.
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
            msg = MIMEMultipart("alternative")
            msg["From"]    = user
            msg["To"]      = to_addr
            msg["Subject"] = subject or "(sin asunto)"

            # Parte 1: texto plano como fallback
            msg.attach(MIMEText(body, "plain", "utf-8"))
            # Parte 2: versión HTML profesional (la que mostrará Gmail/Outlook)
            msg.attach(MIMEText(_body_to_html(body), "html", "utf-8"))

            with smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=15) as srv:
                srv.login(user, passw)
                srv.sendmail(user, to_addr, msg.as_string())

            on_success(to_addr)
        except Exception as e:
            on_error(str(e))

    threading.Thread(target=_do, daemon=True).start()
