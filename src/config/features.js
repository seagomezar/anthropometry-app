import { useState, useEffect } from 'react';
import defaultFeaturesJson from './features.json';

export const STORAGE_KEY = 'atelier_feature_preferences';
export const PREFERENCES_EVENT = 'atelier_feature_preferences_changed';

export const FEATURE_DEFINITIONS = [
  {
    key: 'user',
    name: 'Expediente de Pacientes',
    description: 'Gestión integral del historial clínico, datos demográficos y antecedentes de atletas y pacientes.',
    icon: 'folder_shared',
    default: true,
  },
  {
    key: 'measurement',
    name: 'Evaluaciones Antropométricas',
    description: 'Registro de medidas estandarizadas ISAK: pliegues cutáneos, perímetros corporales y diámetros óseos.',
    icon: 'straighten',
    default: true,
  },
  {
    key: 'nutritionist',
    name: 'Directorio de Nutricionistas',
    description: 'Catálogo de especialistas y profesionales del laboratorio encargados de las evaluaciones.',
    icon: 'groups',
    default: true,
  },
  {
    key: 'referenced_somatotype',
    name: 'Somatotipos de Referencia',
    description: 'Catálogo de perfiles morfológicos de referencia de élite por deporte y género.',
    icon: 'biotech',
    default: true,
  },
  {
    key: 'results_analytics',
    name: 'Analítica, Somatocarta y Gráficos',
    description: 'Cálculo automatizado de coordenadas (X, Y), composición corporal y gráficos de dispersión polar y radar.',
    icon: 'analytics',
    default: true,
  },
  {
    key: 'pdf_export',
    name: 'Exportación de Reportes PDF',
    description: 'Generación de documentos clínicos y fichas de diagnóstico en formato PDF descargable.',
    icon: 'picture_as_pdf',
    default: true,
  },
];

export const PRESETS = {
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

/**
 * Get current feature preferences from localStorage, falling back to features.json defaults
 */
export const getStoredFeaturePreferences = () => {
  const defaults = { ...defaultFeaturesJson };
  
  if (typeof window === 'undefined' || !window.localStorage) {
    return defaults;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    return { ...defaults, ...parsed };
  } catch (err) {
    console.warn('Error reading feature preferences from storage:', err);
    return defaults;
  }
};

/**
 * Save feature preferences to localStorage and broadcast event
 */
export const saveStoredFeaturePreferences = (newPreferences) => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return newPreferences;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newPreferences));
    // Dispatch custom event for same-window reactive listeners
    window.dispatchEvent(
      new CustomEvent(PREFERENCES_EVENT, { detail: newPreferences })
    );
  } catch (err) {
    console.warn('Error saving feature preferences to storage:', err);
  }
  return newPreferences;
};

/**
 * Check if a single feature is currently enabled
 */
export const isFeatureEnabled = (featureKey) => {
  const prefs = getStoredFeaturePreferences();
  return prefs[featureKey] !== false;
};

/**
 * Enable or disable a single feature
 */
export const setFeatureEnabled = (featureKey, isEnabled) => {
  const current = getStoredFeaturePreferences();
  const updated = {
    ...current,
    [featureKey]: Boolean(isEnabled),
  };
  saveStoredFeaturePreferences(updated);
  return updated;
};

/**
 * Apply a preset configuration
 */
export const applyPreset = (presetKey) => {
  const preset = PRESETS[presetKey];
  if (!preset) throw new Error(`Unknown preset: ${presetKey}`);
  saveStoredFeaturePreferences(preset.features);
  return preset.features;
};

/**
 * Reset features to default values
 */
export const resetFeatures = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(
      new CustomEvent(PREFERENCES_EVENT, { detail: defaultFeaturesJson })
    );
  }
  return { ...defaultFeaturesJson };
};

/**
 * React hook to reactively subscribe to feature preference changes
 */
export const useFeaturePreferences = () => {
  const [preferences, setPreferences] = useState(getStoredFeaturePreferences);

  useEffect(() => {
    const handlePreferencesChange = (event) => {
      if (event.detail) {
        setPreferences(event.detail);
      } else {
        setPreferences(getStoredFeaturePreferences());
      }
    };

    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY) {
        setPreferences(getStoredFeaturePreferences());
      }
    };

    window.addEventListener(PREFERENCES_EVENT, handlePreferencesChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener(PREFERENCES_EVENT, handlePreferencesChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggleFeature = (key) => {
    setFeatureEnabled(key, !preferences[key]);
  };

  const setFeature = (key, value) => {
    setFeatureEnabled(key, value);
  };

  const applyNamedPreset = (presetKey) => {
    applyPreset(presetKey);
  };

  const reset = () => {
    resetFeatures();
  };

  return {
    preferences,
    isFeatureEnabled: (key) => preferences[key] !== false,
    toggleFeature,
    setFeature,
    applyPreset: applyNamedPreset,
    reset,
    definitions: FEATURE_DEFINITIONS,
    presets: PRESETS,
  };
};
