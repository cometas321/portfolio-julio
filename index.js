/**
 * ============================================================================
 * PORTAFOLIO PROFESIONAL - DR. CHOQUE VARGAS JULIO CESAR
 * Contador Público Colegiado (CPC) - Doctor en Contabilidad y Finanzas
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroBackgrounds();
  initNavbar();
  initFinancialDashboard();
  initPayrollSimulator();
  initContactForm();
  initModals();
  initCustomFinancialCursor();
});

/* -------------------------------------------------------------------------- */
/* 1. HERO BACKGROUND SWITCHER (Consultoría Corporativa - Formal)            */
/* -------------------------------------------------------------------------- */
const heroBackgrounds = [
  { id: 2, file: 'imagenes/fondo2.jpg', label: 'Consultoría Corporativa' },
];

let currentBgIndex = 0;
let bgInterval = null;
let isAutoPlaying = false; // By default clean and static on fondo1.jpg

function initHeroBackgrounds() {
  const container = document.getElementById('heroBgContainer');
  const thumbsContainer = document.getElementById('bgThumbsContainer');
  const currentBgLabel = document.getElementById('currentBgLabel');

  if (!container) return;

  // Render background image elements
  container.innerHTML = '';
  heroBackgrounds.forEach((bg, index) => {
    const img = document.createElement('img');
    img.src = bg.file;
    img.alt = bg.label;
    img.className = `hero-bg-image ${index === 0 ? 'active' : 'inactive'}`;
    img.id = `hero-img-${index}`;
    container.appendChild(img);
  });

  // Render clickable pills if container exists and more than 1 background
  if (thumbsContainer) {
    thumbsContainer.innerHTML = '';
    const parentSelector = thumbsContainer.closest('.flex');
    if (heroBackgrounds.length > 1) {
      if (parentSelector) parentSelector.style.display = 'flex';
      heroBackgrounds.forEach((bg, index) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `px-2 py-0.5 text-[11px] rounded transition-all font-mono font-medium ${
          index === 0
            ? 'bg-amber-400 text-slate-900 font-bold'
            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
        }`;
        btn.innerText = `F${index + 1}`;
        btn.title = bg.label;
        btn.addEventListener('click', () => {
          setHeroBackground(index);
        });
        thumbsContainer.appendChild(btn);
      });
    } else {
      if (parentSelector) parentSelector.style.display = 'none';
    }
  }
}

function setHeroBackground(index) {
  const images = document.querySelectorAll('.hero-bg-image');
  const thumbs = document.querySelectorAll('#bgThumbsContainer button');
  const currentBgLabel = document.getElementById('currentBgLabel');

  images.forEach((img, i) => {
    if (i === index) {
      img.classList.remove('inactive');
      img.classList.add('active');
    } else {
      img.classList.remove('active');
      img.classList.add('inactive');
    }
  });

  thumbs.forEach((thumb, i) => {
    if (i === index) {
      thumb.className = 'px-2 py-0.5 text-[11px] rounded transition-all font-mono font-bold bg-amber-400 text-slate-900';
    } else {
      thumb.className = 'px-2 py-0.5 text-[11px] rounded transition-all font-mono font-medium bg-slate-800/80 text-slate-300 hover:bg-slate-700';
    }
  });

  if (currentBgLabel) {
    currentBgLabel.textContent = heroBackgrounds[index].label;
  }

  currentBgIndex = index;
}

/* -------------------------------------------------------------------------- */
/* 2. NAVBAR SCROLL (TRANSPARENTE -> SOLID ON SCROLL)                         */
/* -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('mainNavbar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  // Transparente al inicio, sutil al hacer scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Menú móvil
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('#mobileMenu a, #mobileMenu button').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}


function initFinancialDashboard() {
  const canvasMain = document.getElementById('financialMainChart');
  const canvasDonut = document.getElementById('expenseDonutChart');

  if (!canvasMain || !canvasDonut || typeof Chart === 'undefined') return;

  const initialData = dashboardDataset.all;

  mainFinancialChart = new Chart(canvasMain, {
    type: 'bar',
    data: {
      labels: initialData.labels,
      datasets: [
        {
          type: 'line',
          label: 'EBITDA Operativo (S/)',
          data: initialData.ebitda,
          borderColor: '#eab308',
          backgroundColor: 'rgba(234, 179, 8, 0.15)',
          borderWidth: 3,
          tension: 0.35,
          fill: false,
          yAxisID: 'y'
        },
        {
          type: 'bar',
          label: 'Ingresos por Ventas (S/)',
          data: initialData.ventas,
          backgroundColor: 'rgba(37, 99, 235, 0.85)',
          borderRadius: 6,
          yAxisID: 'y'
        },
        {
          type: 'bar',
          label: 'Costo de Ventas (S/)',
          data: initialData.costos,
          backgroundColor: 'rgba(148, 163, 184, 0.6)',
          borderRadius: 6,
          yAxisID: 'y'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { color: '#cbd5e1', font: { family: 'Plus Jakarta Sans', size: 12, weight: 600 } }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              label += 'S/ ' + Number(context.parsed.y).toLocaleString('es-PE');
              return label;
            }
          }
        }
      },
      scales: {
        x: {
          ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono' } },
          grid: { color: 'rgba(255, 255, 255, 0.05)' }
        },
        y: {
          ticks: {
            color: '#94a3b8',
            font: { family: 'JetBrains Mono' },
            callback: function (val) {
              return 'S/ ' + (val / 1000) + 'k';
            }
          },
          grid: { color: 'rgba(255, 255, 255, 0.08)' }
        }
      }
    }
  });

  expenseDonutChart = new Chart(canvasDonut, {
    type: 'doughnut',
    data: {
      labels: ['Gastos Administrativos', 'Gastos de Ventas', 'Tributos & Licencias', 'Gastos Financieros'],
      datasets: [
        {
          data: initialData.expenses,
          backgroundColor: ['#2563eb', '#eab308', '#10b981', '#8b5cf6'],
          borderWidth: 2,
          borderColor: '#1e293b'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#cbd5e1', boxWidth: 14, padding: 12, font: { family: 'Plus Jakarta Sans', size: 11 } }
        },
        tooltip: {
          callbacks: {
            label: function (ctx) {
              return ` ${ctx.label}: ${ctx.parsed}%`;
            }
          }
        }
      },
      cutout: '68%'
    }
  });

  // Filter buttons
  const filterButtons = document.querySelectorAll('.dash-filter-btn');
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => {
        b.classList.remove('bg-amber-400', 'text-slate-900', 'font-bold');
        b.classList.add('bg-slate-800', 'text-slate-300');
      });
      btn.classList.add('bg-amber-400', 'text-slate-900', 'font-bold');
      btn.classList.remove('bg-slate-800', 'text-slate-300');

      const period = btn.getAttribute('data-period');
      updateDashboardData(period);
    });
  });
}

function updateDashboardData(period) {
  const data = dashboardDataset[period] || dashboardDataset.all;
  if (!mainFinancialChart || !expenseDonutChart) return;

  mainFinancialChart.data.labels = data.labels;
  mainFinancialChart.data.datasets[0].data = data.ebitda;
  mainFinancialChart.data.datasets[1].data = data.ventas;
  mainFinancialChart.data.datasets[2].data = data.costos;
  mainFinancialChart.update();

  expenseDonutChart.data.datasets[0].data = data.expenses;
  expenseDonutChart.update();

  const elVentas = document.getElementById('kpiVentas');
  const elVentasVar = document.getElementById('kpiVentasVar');
  const elMargen = document.getElementById('kpiMargen');
  const elEbitda = document.getElementById('kpiEbitda');
  const elEbitdaMargin = document.getElementById('kpiEbitdaMargin');
  const elAhorro = document.getElementById('kpiAhorro');
  const elAhorroDesc = document.getElementById('kpiAhorroDesc');

  if (elVentas) elVentas.textContent = data.kpis.ventasTotales;
  if (elVentasVar) elVentasVar.textContent = data.kpis.ventasVar;
  if (elMargen) elMargen.textContent = data.kpis.margenBruto;
  if (elEbitda) elEbitda.textContent = data.kpis.ebitdaTotal;
  if (elEbitdaMargin) elEbitdaMargin.textContent = data.kpis.ebitdaMargin;
  if (elAhorro) elAhorro.textContent = data.kpis.impuestosAhorro;
  if (elAhorroDesc) elAhorroDesc.textContent = data.kpis.impuestosDesc;
}

/* -------------------------------------------------------------------------- */
/* 4. SIMULADOR DE BENEFICIOS SOCIALES (PERÚ)                                 */
/* -------------------------------------------------------------------------- */
function initPayrollSimulator() {
  const form = document.getElementById('payrollSimForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    calculatePayrollBenefits();
  });

  const inputs = form.querySelectorAll('input, select');
  inputs.forEach((input) => {
    input.addEventListener('input', calculatePayrollBenefits);
  });

  calculatePayrollBenefits();
}

function calculatePayrollBenefits() {
  const sueldoInput = document.getElementById('simSueldo');
  const asigFamCheck = document.getElementById('simAsigFam');
  const mesesInput = document.getElementById('simMeses');
  const diasInput = document.getElementById('simDias');

  if (!sueldoInput || !mesesInput || !diasInput) return;

  let sueldo = parseFloat(sueldoInput.value) || 0;
  let meses = parseInt(mesesInput.value) || 0;
  let dias = parseInt(diasInput.value) || 0;
  const tieneAsig = asigFamCheck ? asigFamCheck.checked : false;

  const rmv = 1025.00;
  const montoAsig = tieneAsig ? (rmv * 0.10) : 0;
  const remuneracionComputable = sueldo + montoAsig;
  const tiempoMeses = meses + (dias / 30);

  const gratificacionBase = (remuneracionComputable / 6) * tiempoMeses;
  const bonifExtraordinaria = gratificacionBase * 0.09;
  const gratificacionTotal = gratificacionBase + bonifExtraordinaria;

  const unSextoGrati = gratificacionBase / 6;
  const remuneracionComputableCTS = remuneracionComputable + unSextoGrati;
  const ctsTrunca = (remuneracionComputableCTS / 12) * tiempoMeses;

  const vacacionesTruncas = (remuneracionComputable / 12) * tiempoMeses;
  const totalNeto = ctsTrunca + gratificacionTotal + vacacionesTruncas;

  const formatSoles = (num) => 'S/ ' + num.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  document.getElementById('simResRemComputable').textContent = formatSoles(remuneracionComputable);
  document.getElementById('simResCTS').textContent = formatSoles(ctsTrunca);
  document.getElementById('simResGrati').textContent = formatSoles(gratificacionBase);
  document.getElementById('simResBonif').textContent = formatSoles(bonifExtraordinaria);
  document.getElementById('simResVacaciones').textContent = formatSoles(vacacionesTruncas);
  document.getElementById('simResTotal').textContent = formatSoles(totalNeto);
}

/* -------------------------------------------------------------------------- */
/* 5. FORMULARIO DE CONTACTO                                                  */
/* -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('leadContactForm');
  const alertSuccess = document.getElementById('contactSuccessAlert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const telefono = document.getElementById('contactPhone').value;
    const servicio = document.getElementById('contactService').value;
    const mensaje = document.getElementById('contactMessage').value;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Procesando...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      if (alertSuccess) {
        alertSuccess.classList.remove('hidden');
        alertSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      const waBtnDirect = document.getElementById('waDirectAction');
      if (waBtnDirect) {
        const text = encodeURIComponent(
          `Hola Dr. Choque Vargas Julio Cesar, soy ${nombre} (${email}, Tel: ${telefono}). Deseo consultar sobre: ${servicio}. Detalle: ${mensaje}`
        );
        waBtnDirect.href = `https://wa.me/51987654321?text=${text}`;
      }

      form.reset();
    }, 800);
  });
}

/* -------------------------------------------------------------------------- */
/* 6. MODALES (CV EJECUTIVO & REPORTE)                                       */
/* -------------------------------------------------------------------------- */
function initModals() {
  const openCvBtns = document.querySelectorAll('.open-cv-modal');
  const closeCvBtn = document.getElementById('closeCvModal');
  const cvModal = document.getElementById('cvModal');

  openCvBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (cvModal) cvModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeCvBtn && cvModal) {
    closeCvBtn.addEventListener('click', () => {
      cvModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    });
  }

  const openReportBtns = document.querySelectorAll('.open-report-modal');
  const closeReportBtn = document.getElementById('closeReportModal');
  const reportModal = document.getElementById('reportModal');

  openReportBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (reportModal) reportModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeReportBtn && reportModal) {
    closeReportBtn.addEventListener('click', () => {
      reportModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    });
  }

  window.addEventListener('click', (e) => {
    if (cvModal && e.target === cvModal) {
      cvModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
    if (reportModal && e.target === reportModal) {
      reportModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (cvModal) cvModal.classList.add('hidden');
      if (reportModal) reportModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 7. CURSOR PERSONALIZADO & CUADRÍCULA FINANCIERA (PRECISIÓN Y ANALÍTICA)    */
/* -------------------------------------------------------------------------- */
function initCustomFinancialCursor() {
  // Aplicar únicamente en dispositivos con ratón / puntero preciso (desktop)
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (!isFinePointer) return;

  const dot = document.getElementById('customCursorDot');
  const follower = document.getElementById('customCursorFollower');
  const financialGrid = document.getElementById('financialGrid');
  const heroSection = document.getElementById('inicio');

  if (!dot || !follower) return;

  let mouseX = -100;
  let mouseY = -100;
  let followerX = -100;
  let followerY = -100;
  let isVisible = false;

  // Factor de interpolación (lerp): fluido, preciso y sin retardo excesivo
  const lerp = 0.18;

  function updateCursor() {
    if (isVisible) {
      // El punto central sigue inmediatamente la posición real del ratón
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      // El círculo exterior se desliza suavemente con lerp
      followerX += (mouseX - followerX) * lerp;
      followerY += (mouseY - followerY) * lerp;
      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
    }

    requestAnimationFrame(updateCursor);
  }
  requestAnimationFrame(updateCursor);

  // Seguimiento de coordenadas del ratón
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      followerX = mouseX;
      followerY = mouseY;
      dot.classList.remove('cursor-hidden');
      follower.classList.remove('cursor-hidden');
    }
  }, { passive: true });

  // Ocultar suavemente al salir de la ventana del navegador
  document.documentElement.addEventListener('mouseleave', () => {
    isVisible = false;
    dot.classList.add('cursor-hidden');
    follower.classList.add('cursor-hidden');
    if (financialGrid) financialGrid.classList.remove('active');
  });

  document.documentElement.addEventListener('mouseenter', () => {
    isVisible = true;
    dot.classList.remove('cursor-hidden');
    follower.classList.remove('cursor-hidden');
  });

  // Efecto sutil al presionar el clic
  window.addEventListener('mousedown', () => {
    follower.classList.add('cursor-click');
  });

  window.addEventListener('mouseup', () => {
    follower.classList.remove('cursor-click');
  });

  // Reacción fluida sobre elementos interactivos (enlaces, botones, inputs, tarjetas)
  const interactiveSelector = 'a, button, input, select, textarea, [role="button"], .institutional-bar-item, .glass-card-dark, .dash-filter-btn';

  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(interactiveSelector);
    if (target) {
      follower.classList.add('cursor-hover');
      dot.classList.add('cursor-hover');
    }
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest(interactiveSelector);
    if (target) {
      follower.classList.remove('cursor-hover');
      dot.classList.remove('cursor-hover');
    }
  }, { passive: true });

  // Cuadrícula Financiera Discreta en la Sección Hero (Portafolio)
  if (heroSection && financialGrid) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      financialGrid.style.setProperty('--grid-x', `${x}px`);
      financialGrid.style.setProperty('--grid-y', `${y}px`);
      financialGrid.classList.add('active');
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      financialGrid.classList.remove('active');
    });
  }
}
