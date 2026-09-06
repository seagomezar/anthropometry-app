import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  getStoredFeaturePreferences,
  saveStoredFeaturePreferences,
  isFeatureEnabled,
  setFeatureEnabled,
  applyPreset,
  resetFeatures,
  FEATURE_DEFINITIONS,
  PRESETS,
  STORAGE_KEY,
} from './features';

describe('features configuration module', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('has valid definitions and presets', () => {
    expect(FEATURE_DEFINITIONS.length).toBeGreaterThan(0);
    expect(PRESETS.all).toBeDefined();
    expect(PRESETS.clinical).toBeDefined();
    expect(PRESETS.minimal).toBeDefined();
  });

  it('reads default preferences when localStorage is empty', () => {
    const prefs = getStoredFeaturePreferences();
    expect(prefs.user).toBe(true);
    expect(prefs.measurement).toBe(true);
    expect(prefs.nutritionist).toBe(true);
    expect(isFeatureEnabled('user')).toBe(true);
  });

  it('updates a specific feature preference', () => {
    setFeatureEnabled('nutritionist', false);
    expect(isFeatureEnabled('nutritionist')).toBe(false);

    // Other features remain unchanged
    expect(isFeatureEnabled('user')).toBe(true);

    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    expect(stored.nutritionist).toBe(false);
  });

  it('applies preset configurations accurately', () => {
    applyPreset('clinical');
    expect(isFeatureEnabled('user')).toBe(true);
    expect(isFeatureEnabled('measurement')).toBe(true);
    expect(isFeatureEnabled('nutritionist')).toBe(false);
    expect(isFeatureEnabled('referenced_somatotype')).toBe(false);

    applyPreset('all');
    expect(isFeatureEnabled('nutritionist')).toBe(true);
    expect(isFeatureEnabled('referenced_somatotype')).toBe(true);
  });

  it('resets features to default', () => {
    setFeatureEnabled('user', false);
    expect(isFeatureEnabled('user')).toBe(false);

    resetFeatures();
    expect(isFeatureEnabled('user')).toBe(true);
  });
});
