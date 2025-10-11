#!/usr/bin/env node

/**
 * Script de Análisis de Contenido Markdown
 * 
 * Identifica:
 * 1. Secciones con videos (NO OMITIR)
 * 2. Secciones de práctica/taller (convertir a PracticeExercise)
 * 3. Genera reporte de estructura del archivo
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function analizarContenido(archivoPath) {
  console.log(`\n🔍 Analizando: ${path.basename(archivoPath)}\n`);
  
  const contenido = fs.readFileSync(archivoPath, 'utf-8');
  const lineas = contenido.split('\n');
  
  const secciones = [];
  const seccionesConVideo = [];
  const seccionesPractica = [];
  
  for (let i = 0; i < lineas.length; i++) {
    const linea = lineas[i];
    const numeroLinea = i + 1;
    
    // Detectar títulos (## o ###)
    if (linea.match(/^#{2,3}\s/)) {
      const nivel = (linea.match(/^(#{2,3})/)[0].length);
      const titulo = linea.replace(/^#{2,3}\s*/, '').trim();
      
      // Buscar si tiene video en las siguientes líneas (hasta 5 líneas después)
      let tieneVideo = false;
      let urlVideo = '';
      
      for (let j = i + 1; j < Math.min(i + 6, lineas.length); j++) {
        const siguienteLinea = lineas[j];
        if (siguienteLinea.match(/https?:\/\/(youtu\.be|youtube\.com|vt\.tiktok\.com)/)) {
          tieneVideo = true;
          urlVideo = siguienteLinea.trim();
          break;
        }
        // Si encontramos contenido sustancial antes de video, paramos
        if (siguienteLinea.trim().length > 50 && !siguienteLinea.match(/^https?:\/\//)) {
          break;
        }
      }
      
      // Detectar si es práctica/taller
      const esPractica = titulo.match(/(practica|práctica|taller|ejercicio)/i);
      
      const seccion = {
        linea: numeroLinea,
        nivel: nivel,
        titulo: titulo,
        tieneVideo: tieneVideo,
        urlVideo: urlVideo,
        esPractica: !!esPractica
      };
      
      secciones.push(seccion);
      
      if (tieneVideo) {
        seccionesConVideo.push(seccion);
      }
      
      if (esPractica) {
        seccionesPractica.push(seccion);
      }
    }
  }
  
  // Generar reporte
  console.log('═'.repeat(80));
  console.log('� PRINCIPIO: TODO TÍTULO = CONTENIDO OBLIGATORIO');
  console.log('═'.repeat(80));
  console.log(`\nTotal de títulos encontrados: ${secciones.length}`);
  console.log('⚠️  NINGUNO de estos títulos se puede omitir en la conversión\n');
  
  console.log('═'.repeat(80));
  console.log('�📹 SECCIONES CON VIDEOS');
  console.log('═'.repeat(80));
  
  if (seccionesConVideo.length === 0) {
    console.log('❌ No se encontraron secciones con videos.');
  } else {
    seccionesConVideo.forEach((sec, idx) => {
      const emoji = sec.nivel === 2 ? '##' : '###';
      console.log(`\n${idx + 1}. Línea ${sec.linea}: ${emoji} ${sec.titulo}`);
      console.log(`   🎥 ${sec.urlVideo}`);
    });
  }
  
  console.log('\n');
  console.log('═'.repeat(80));
  console.log('✏️  SECCIONES DE PRÁCTICA/TALLER');
  console.log('═'.repeat(80));
  
  if (seccionesPractica.length === 0) {
    console.log('❌ No se encontraron secciones de práctica/taller.');
  } else {
    seccionesPractica.forEach((sec, idx) => {
      const emoji = sec.nivel === 2 ? '##' : '###';
      console.log(`\n${idx + 1}. Línea ${sec.linea}: ${emoji} ${sec.titulo}`);
      console.log(`   🔄 Convertir a: ::practice-exercise`);
    });
  }
  
  console.log('\n');
  console.log('═'.repeat(80));
  console.log('📊 RESUMEN DE CONTENIDO');
  console.log('═'.repeat(80));
  console.log(`\n🎯 TOTAL DE TÍTULOS (TODOS OBLIGATORIOS): ${secciones.length}`);
  console.log(`   ├─ Secciones con video:                ${seccionesConVideo.length}`);
  console.log(`   ├─ Secciones de práctica:              ${seccionesPractica.length}`);
  console.log(`   └─ Otras secciones:                    ${secciones.length - seccionesConVideo.length - seccionesPractica.length}`);
  console.log(`\n⚠️  VERIFICAR: El archivo convertido debe tener ${secciones.length} títulos`);
  
  console.log('\n');
  console.log('═'.repeat(80));
  console.log('✅ CHECKLIST DE CONVERSIÓN');
  console.log('═'.repeat(80));
  console.log(`[ ] 🚨 CRÍTICO: Verificar que TODOS los ${secciones.length} títulos estén presentes`);
  console.log(`[ ] 🚨 CRÍTICO: Contar títulos: original = ${secciones.length}, convertido = ?`);
  console.log(`[ ] Convertir las ${seccionesPractica.length} secciones de práctica a PracticeExercise`);
  console.log(`[ ] Convertir tablas comparativas a ComparisonCard`);
  console.log(`[ ] Convertir advertencias/tips a InfoBox`);
  console.log(`[ ] Convertir listas a KeyPoints o ProcessSteps`);
  console.log(`[ ] Verificar que TODO el contenido bajo cada título esté conservado`);
  console.log(`[ ] Verificar spacing y formato`);
  console.log(`[ ] Asignar colores lógicos a componentes`);
  console.log(`[ ] Agregar emojis a títulos de items`);
  
  console.log('\n');
  
  // Generar estructura jerárquica
  console.log('═'.repeat(80));
  console.log('🗂️  ESTRUCTURA COMPLETA DEL ARCHIVO');
  console.log('═'.repeat(80));
  
  secciones.forEach((sec) => {
    const indent = '  '.repeat(sec.nivel - 2);
    const emoji = sec.nivel === 2 ? '##' : '###';
    const badges = [];
    
    if (sec.tieneVideo) badges.push('📹');
    if (sec.esPractica) badges.push('✏️');
    
    const badgeStr = badges.length > 0 ? ` ${badges.join(' ')}` : '';
    
    console.log(`${indent}${emoji} ${sec.titulo}${badgeStr}`);
  });
  
  console.log('\n');
}

// Ejecutar
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('');
  console.log('📚 Uso: node analizar-contenido.js <archivo.md>');
  console.log('');
  console.log('Ejemplo:');
  console.log('  node scripts/analizar-contenido.js content/quimica/05-enlace-quimico-old.md');
  console.log('');
  process.exit(1);
}

const archivoPath = args[0];

if (!fs.existsSync(archivoPath)) {
  console.error(`\n❌ Error: El archivo "${archivoPath}" no existe.\n`);
  process.exit(1);
}

analizarContenido(archivoPath);
