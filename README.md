# Ghost-Key 👻

<p align="center">
  <img src="src/logo.png" alt="Ghost-Key Logo" width="180">
</p>

Un servidor educativo de demostración sobre técnicas de captura de datos, monitoreo y análisis de ciberseguridad. Este proyecto forma parte de estudios académicos en Ciberseguridad.

## ⚠️ Disclaimer Importante

Este proyecto es **únicamente para propósitos educativos y de investigación**. Está diseñado para enseñar conceptos de seguridad, vulnerabilidades web y técnicas de exfiltración de datos en entornos controlados y autorizados.

**No debe ser utilizado con fines maliciosos o contra sistemas sin autorización explícita.**

## 🎯 Descripción del Proyecto

Ghost-Key se compone de un servidor Node.js/Express y una interfaz gráfica (GUI) en Python/Tkinter, formando un entorno de monitoreo integral:

- **Captura de datos en tiempo real**: Registra campos de formularios que el usuario completa.
- **Captura de pantallas**: Toma screenshots del formulario completado.
- **Exfiltración de datos**: Envía los datos capturados por correo electrónico.
- **Interfaz de Monitoreo**: Controla el servidor, visualiza los registros y envía correos interactivos de prueba, todo desde una interfaz de escritorio profesional.
- **Análisis de seguridad**: Permite estudiar vulnerabilidades y patrones de ataque de manera estructurada.

### Funcionalidades Principales

- ✅ Interfaz gráfica de control para iniciar/detener el servidor
- ✅ Visualización de logs y captura de pantalla en tiempo real en la GUI
- ✅ Captura de teclado (Keylogger educativo)
- 📸 Captura de pantallas en Base64
- 📧 Envío de datos por correo electrónico (Notificaciones automáticas y desde la GUI)
- 🔄 Configuración de variables de entorno desde la aplicación
- 🔄 Soporte CORS para múltiples orígenes

## 📋 Requisitos Previos

- **Node.js**: v14 o superior
- **npm**: v6 o superior
- **Python**: v3.6 o superior (con `venv` disponible)
- **Cuenta de correo Gmail** (con contraseña de aplicación generada)
- **Bash** (para ejecutar el script de inicialización)
- **Conexión a Internet** (para envío de correos)

## 🚀 Instalación y Ejecución

Hemos simplificado el proceso de arranque en un solo script automatizado que instala dependencias y lanza la interfaz gráfica.

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/ghost-key.git
cd ghost-key
```

### 2. Ejecutar la Aplicación

Dirígete a la carpeta `gui_app` y ejecuta el script de lanzamiento:

```bash
cd gui_app
chmod +x run.sh
./run.sh
```

**El script `run.sh` se encargará automáticamente de:**
1. Instalar las dependencias de Node.js (express, cors, nodemailer, dotenv, etc.) en la raíz del proyecto.
2. Crear un entorno virtual de Python (`venv`).
3. Instalar las dependencias de Python requeridas para la GUI.
4. Iniciar la interfaz gráfica de monitoreo.

### 3. Configuración de Credenciales y Entorno

En lugar de modificar el código fuente, ahora puedes configurar tu entorno directamente desde la Interfaz Gráfica:

1. En la aplicación, ve a **Archivo > Configuración**.
2. Ingresa tu correo de Gmail y tu **contraseña de aplicación** (generada en `https://myaccount.google.com/apppasswords`).
3. Configura el puerto y la URL del sitio web.
4. Guarda la configuración. Esto creará o actualizará automáticamente el archivo `.env` en la raíz del proyecto.

### 4. Iniciar el Servidor

Desde la misma interfaz gráfica, presiona el botón **"Iniciar Servidor"**. La aplicación gestionará la ejecución del servidor Node.js en segundo plano, mostrará su estado y procesará los logs capturados.

## 📁 Estructura del Proyecto

```text
ghost-key/
│
├── .env                   # Variables de entorno (creado auto. desde la GUI)
├── server.js              # Servidor principal (Express)
├── mailer.js              # Lógica de envío de correos
├── package.json           # Dependencias del proyecto (Node.js)
├── README.md              # Este archivo
├── .gitignore             # Archivos ignorados en Git
│
├── public/                # Archivos estáticos (Sitio de Demostración)
│   └── index.html         # Página web de ejemplo para el usuario
│
├── gui_app/               # Aplicación de Escritorio (Python/Tkinter)
│   ├── run.sh             # Script de inicio automatizado
│   ├── monitor.py         # Punto de entrada de la app
│   ├── app.py             # Lógica de la interfaz gráfica
│   ├── config_dialog.py   # Diálogos de configuración
│   ├── constants.py       # Constantes y temas visuales
│   ├── env_utils.py       # Utilidades para manejar el archivo .env
│   ├── mail_service.py    # Servicio de correo de la GUI
│   └── requirements.txt   # Dependencias de Python
│
├── src/                   # Recursos de la aplicación (Ej. logos)
│
├── capturas/              # Carpeta para screenshots capturados (generada)
│
└── .logs_db.txt           # Log de datos capturados
```

## 🛠️ Tecnologías Utilizadas

| Tecnología | Propósito |
|-----------|-----------|
| **Node.js & Express** | Servidor Backend y API |
| **Python & Tkinter** | Interfaz Gráfica de Monitoreo |
| **Dotenv** | Gestión de variables de entorno |
| **Nodemailer** | Envío de correos electrónicos desde el servidor |
| **Bash** | Scripting de automatización (`run.sh`) |

## 📚 Aprendizaje y Recursos

### Conceptos Ciberseguridad Relacionados
- Captura de credenciales
- MITM (Man-in-the-Middle)
- Ingeniería Social
- Exfiltración de datos
- Análisis de logs en tiempo real
- Keyloggers

### Referencias Educativas
- [OWASP Top 10](https://owasp.org/Top10/)
- [MDN Web Security](https://developer.mozilla.org/es/docs/Learn/Security)
- [Hacksplaining - Security Training](https://www.hacksplaining.com)

## 📝 Logs y Monitoreo

### Archivo de Logs
Los datos capturados se guardan en `.logs_db.txt` y se muestran en tiempo real en la pestaña "Registros del Servidor" de la GUI.

### Capturas
Las pantallas se almacenan en la carpeta `capturas/` y pueden visualizarse directamente en la pestaña "Galería de Capturas" de la aplicación.

## 📄 Licencia

Este proyecto está bajo licencia **ISC**.

## 👤 Autor

- **Ismael B.M.**
- **Josue T. M.**
- Proyecto - Ciberseguridad
- Diseño de un Keylogger y Entorno de Monitoreo

**Última actualización**: Abril de 2026

### Recordatorio Final
> Este software está diseñado **exclusivamente** con fines educativos. El usuario es responsable de cualquier uso indebido. No utilices esta herramienta para acceder, interceptar o modificar datos sin autorización.
