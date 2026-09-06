#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_PATH = path.resolve(__dirname, '../src/config/features.json');

const AVAILABLE_FEATURES = [
  { key: 'user', name: 'Expediente de Pacientes', default: true },
  { key: 'measurement', name: 'Evaluaciones Antropométricas', default: true },
  { key: 'nutritionist', name: 'Directorio de Nutricionistas', default: true },
  { key: 'referenced_somatotype', name: 'Somatotipos de Referencia', default: true },
  { key: 'results_analytics', name: 'Analítica, Somatocarta y Gráficos', default: true },
  { key: 'pdf_export', name: 'Exportación de Reportes PDF', default: true },
];

const PRESETS = {
  all: {
    name: 'Todos los Módulos (Completo)',
    features: {
      user: true,
      measurement: true,
      nutritionist: true,
      referenced_somatotype: true,
      results_analytics: true,
      pdf_export: true,
    },
  },
  clinical: {
    name: 'Clínico Básico (Pacientes y Evaluaciones)',
    features: {
      user: true,
      measurement: true,
      nutritionist: false,
      referenced_somatotype: false,
      results_analytics: true,
      pdf_export: true,
    },
  },
  somatotype_only: {
    name: 'Solo Somatocarta y Referencias',
    features: {
      user: false,
      measurement: true,
      nutritionist: false,
      referenced_somatotype: true,
      results_analytics: true,
      pdf_export: false,
    },
  },
  minimal: {
    name: 'Mínimo (Solo Pacientes)',
    features: {
      user: true,
      measurement: false,
      nutritionist: false,
      referenced_somatotype: false,
      results_analytics: false,
      pdf_export: false,
    },
  },
};

function readConfig() {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const data = fs.readFileSync(CONFIG_PATH, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error al leer features.json:', err.message);
  }
  const fallback = {};
  AVAILABLE_FEATURES.forEach(f => { fallback[f.key] = f.default; });
  return fallback;
}

function writeConfig(config) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2) + '\n', 'utf-8');
}

function printBanner() {
  console.log('\x1b[32m' + '╔═══════════════════════════════════════════════════════════════════════════════════╗' + '\x1b[0m');
  console.log('\x1b[32m' + '║                 ATELIER ANTROPOMETRÍA - CONFIGURADOR DE MÓDULOS                   ║' + '\x1b[0m');
  console.log('\x1b[32m' + '║                   Sistema de Preferencias y Funcionalidades                       ║' + '\x1b[0m');
  console.log('\x1b[32m' + '╚═══════════════════════════════════════════════════════════════════════════════════╝' + '\x1b[0m\n');
}

function printStatus(config) {
  printBanner();
  console.log('ESTADO ACTUAL DE LOS MÓDULOS:');
  console.log('───────────────────────────────────────────────────────────────────────────────────');
  AVAILABLE_FEATURES.forEach(f => {
    const isEnabled = config[f.key] !== false;
    const badge = isEnabled ? '\x1b[32m[ ACTIVO ]\x1b[0m' : '\x1b[31m[INACTIVO]\x1b[0m';
    console.log(`  ${badge}  \x1b[1m${f.key.padEnd(24)}\x1b[0m : ${f.name}`);
  });
  console.log('───────────────────────────────────────────────────────────────────────────────────\n');
  console.log('PRESETS DISPONIBLES:');
  Object.entries(PRESETS).forEach(([key, preset]) => {
    console.log(`  • \x1b[33m${key.padEnd(16)}\x1b[0m: ${preset.name}`);
  });
  console.log('\nUSO:');
  console.log('  npm run config:features -- --status');
  console.log('  npm run config:features -- --enable <modulo>');
  console.log('  npm run config:features -- --disable <modulo>');
  console.log('  npm run config:features -- --preset <preset>');
  console.log('  npm run config:features -- --reset\n');
}

const args = process.argv.slice(2);
let currentConfig = readConfig();

if (args.length === 0 || args.includes('--status') || args.includes('-s')) {
  printStatus(currentConfig);
  process.exit(0);
}

for (let i = 0; i < args.length; i++) {
  const arg = args[i];

  if (arg === '--enable' || arg === '-e') {
    const feature = args[++i];
    if (!feature || !AVAILABLE_FEATURES.some(f => f.key === feature)) {
      console.error(`\x1b[31mError: Módulo desconocido '${feature}'.\x1b[0m`);
      console.log('Módulos disponibles:', AVAILABLE_FEATURES.map(f => f.key).join(', '));
      process.exit(1);
    }
    currentConfig[feature] = true;
    writeConfig(currentConfig);
    console.log(`\x1b[32m✔ Módulo '${feature}' habilitado exitosamente.\x1b[0m`);
  } else if (arg === '--disable' || arg === '-d') {
    const feature = args[++i];
    if (!feature || !AVAILABLE_FEATURES.some(f => f.key === feature)) {
      console.error(`\x1b[31mError: Módulo desconocido '${feature}'.\x1b[0m`);
      console.log('Módulos disponibles:', AVAILABLE_FEATURES.map(f => f.key).join(', '));
      process.exit(1);
    }
    currentConfig[feature] = false;
    writeConfig(currentConfig);
    console.log(`\x1b[33m✔ Módulo '${feature}' deshabilitado exitosamente.\x1b[0m`);
  } else if (arg === '--preset' || arg === '-p') {
    const presetKey = args[++i];
    const preset = PRESETS[presetKey];
    if (!preset) {
      console.error(`\x1b[31mError: Preset desconocido '${presetKey}'.\x1b[0m`);
      console.log('Presets disponibles:', Object.keys(PRESETS).join(', '));
      process.exit(1);
    }
    currentConfig = { ...preset.features };
    writeConfig(currentConfig);
    console.log(`\x1b[32m✔ Preset '${preset.name}' aplicado exitosamente.\x1b[0m`);
  } else if (arg === '--reset') {
    const fresh = {};
    AVAILABLE_FEATURES.forEach(f => { fresh[f.key] = f.default; });
    writeConfig(fresh);
    console.log(`\x1b[32m✔ Configuración restablecida a valores por defecto.\x1b[0m`);
  } else if (arg === '--help' || arg === '-h') {
    printStatus(currentConfig);
    process.exit(0);
  } else {
    console.error(`\x1b[31mOpción desconocida: ${arg}\x1b[0m`);
    process.exit(1);
  }
}

// Show final status
printStatus(readConfig());
