/* ========================================
   SCRIPT DE VALIDACIÓN - MOBILE OVERFLOW FIX
   Copiar y pegar en Chrome DevTools Console
   ======================================== */

console.clear();
console.log('%c🔬 VALIDACIÓN DE IMPLEMENTACIÓN - MOBILE OVERFLOW FIX', 'font-size: 16px; font-weight: bold; color: #10b981;');
console.log('─'.repeat(70));

// 1. VERIFICAR OVERFLOW DE CONTENEDORES
console.log('\n%c1️⃣ OVERFLOW DE CONTENEDORES', 'font-size: 14px; font-weight: bold;');
const contentCard = document.querySelector('.content-card');
const contentMain = document.querySelector('.content-main');

if (contentCard) {
  const cardOverflow = window.getComputedStyle(contentCard).overflow;
  const isCorrect = cardOverflow === 'visible';
  console.log(`   .content-card overflow: ${cardOverflow} ${isCorrect ? '✅' : '❌'}`);
} else {
  console.log('   .content-card: ⚠️ No encontrado');
}

if (contentMain) {
  const mainOverflow = window.getComputedStyle(contentMain).overflow;
  const isCorrect = mainOverflow === 'visible';
  console.log(`   .content-main overflow: ${mainOverflow} ${isCorrect ? '✅' : '❌'}`);
} else {
  console.log('   .content-main: ⚠️ No encontrado');
}

// 2. VERIFICAR BREAKOUT DE TABLAS (SOLO EN MÓVIL)
console.log('\n%c2️⃣ BREAKOUT DE TABLAS (solo <768px)', 'font-size: 14px; font-weight: bold;');
const tables = document.querySelectorAll('.prose table');
const isMobile = window.innerWidth < 768;

if (tables.length > 0) {
  console.log(`   Tablas encontradas: ${tables.length}`);
  
  tables.forEach((table, index) => {
    const styles = window.getComputedStyle(table);
    const position = styles.position;
    const left = styles.left;
    const marginLeft = styles.marginLeft;
    const width = styles.width;
    
    console.log(`\n   Tabla ${index + 1}:`);
    console.log(`   - position: ${position}`);
    console.log(`   - left: ${left}`);
    console.log(`   - margin-left: ${marginLeft}`);
    console.log(`   - width: ${width}`);
    
    if (isMobile) {
      const hasBreakout = position === 'relative' && 
                         (left.includes('%') || parseFloat(left) !== 0) &&
                         parseFloat(marginLeft) < 0;
      console.log(`   - Breakout activo: ${hasBreakout ? '✅' : '❌'}`);
    } else {
      console.log(`   - Desktop mode: Sin breakout (correcto) ✅`);
    }
  });
} else {
  console.log('   ⚠️ No se encontraron tablas en esta página');
}

// 3. VERIFICAR VIEWPORT
console.log('\n%c3️⃣ VIEWPORT Y ZOOM', 'font-size: 14px; font-weight: bold;');
console.log(`   Ancho del viewport: ${window.innerWidth}px`);
console.log(`   Alto del viewport: ${window.innerHeight}px`);
console.log(`   Zoom del dispositivo: ${window.devicePixelRatio}x`);
console.log(`   Modo: ${isMobile ? '📱 MÓVIL' : '💻 DESKTOP'}`);

// 4. DETECTAR OVERFLOW HORIZONTAL
console.log('\n%c4️⃣ DETECCIÓN DE OVERFLOW HORIZONTAL', 'font-size: 14px; font-weight: bold;');
const bodyWidth = document.body.scrollWidth;
const windowWidth = window.innerWidth;
const hasHorizontalScroll = bodyWidth > windowWidth;

console.log(`   Body width: ${bodyWidth}px`);
console.log(`   Window width: ${windowWidth}px`);
console.log(`   Overflow horizontal: ${hasHorizontalScroll ? '⚠️ SÍ (detectado)' : '✅ NO'}`);

if (hasHorizontalScroll) {
  console.log(`   %c⚠️ ADVERTENCIA: Hay overflow horizontal de ${bodyWidth - windowWidth}px`, 'color: orange;');
  console.log('   Esto puede indicar que algún elemento está saliendo del viewport.');
}

// 5. VERIFICAR QUE SOLO TABLAS TIENEN BREAKOUT
console.log('\n%c5️⃣ ELEMENTOS CON BREAKOUT (solo tablas esperadas)', 'font-size: 14px; font-weight: bold;');
if (isMobile) {
  let unexpectedBreakouts = 0;
  document.querySelectorAll('.prose *').forEach(el => {
    const left = window.getComputedStyle(el).left;
    if ((left.includes('%') || parseFloat(left) !== 0) && el.tagName !== 'TABLE') {
      console.warn(`   ⚠️ Breakout inesperado en: <${el.tagName}>`, el);
      unexpectedBreakouts++;
    }
  });
  
  if (unexpectedBreakouts === 0) {
    console.log('   ✅ Solo tablas tienen breakout (correcto)');
  } else {
    console.log(`   ⚠️ Se encontraron ${unexpectedBreakouts} elementos con breakout inesperado`);
  }
} else {
  console.log('   ⏭️ Omitido (solo relevante en móvil)');
}

// 6. RESUMEN FINAL
console.log('\n%c═══════════════════════════════════════════════════', 'color: #10b981;');
console.log('%c📊 RESUMEN DE VALIDACIÓN', 'font-size: 14px; font-weight: bold; color: #10b981;');
console.log('%c═══════════════════════════════════════════════════', 'color: #10b981;');

let passedChecks = 0;
let totalChecks = 0;

// Check 1: Contenedores con overflow visible
totalChecks++;
if (contentCard && window.getComputedStyle(contentCard).overflow === 'visible' &&
    contentMain && window.getComputedStyle(contentMain).overflow === 'visible') {
  console.log('✅ Contenedores con overflow: visible');
  passedChecks++;
} else {
  console.log('❌ Contenedores sin overflow: visible');
}

// Check 2: Tablas encontradas
totalChecks++;
if (tables.length > 0) {
  console.log(`✅ Tablas encontradas: ${tables.length}`);
  passedChecks++;
} else {
  console.log('⚠️ No hay tablas en esta página (usar /quimica/enlace-quimico)');
}

// Check 3: Breakout en móvil
if (isMobile && tables.length > 0) {
  totalChecks++;
  const firstTable = tables[0];
  const styles = window.getComputedStyle(firstTable);
  const hasBreakout = styles.position === 'relative' && parseFloat(styles.marginLeft) < 0;
  
  if (hasBreakout) {
    console.log('✅ Breakout activo en tablas (móvil)');
    passedChecks++;
  } else {
    console.log('❌ Breakout NO activo en tablas');
  }
}

// Check 4: Sin overflow horizontal
totalChecks++;
if (!hasHorizontalScroll) {
  console.log('✅ Sin overflow horizontal detectado');
  passedChecks++;
} else {
  console.log('⚠️ Overflow horizontal detectado');
}

// Resultado final
const percentage = Math.round((passedChecks / totalChecks) * 100);
console.log('\n%c─────────────────────────────────────────────────', 'color: #10b981;');
console.log(`%c🎯 RESULTADO: ${passedChecks}/${totalChecks} checks pasados (${percentage}%)`, 
  `font-size: 14px; font-weight: bold; color: ${percentage === 100 ? '#10b981' : '#f59e0b'};`);

if (percentage === 100) {
  console.log('%c🎉 ¡IMPLEMENTACIÓN EXITOSA!', 'font-size: 16px; font-weight: bold; color: #10b981;');
} else if (percentage >= 75) {
  console.log('%c⚠️ Implementación parcial - revisar warnings', 'font-size: 14px; color: #f59e0b;');
} else {
  console.log('%c❌ Problemas detectados - revisar errores', 'font-size: 14px; color: #ef4444;');
}

console.log('%c═══════════════════════════════════════════════════', 'color: #10b981;');
console.log('\n💡 TIP: Redimensiona la ventana a <768px para ver el breakout en acción');
console.log('📱 Dispositivos de prueba: iPhone SE (375px), iPhone 12 (390px), Galaxy S20 (360px)');
console.log('\n');
