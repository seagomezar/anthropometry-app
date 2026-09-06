import { describe, it, expect } from 'vitest';
import { es } from './es';
import { en } from './en';
import { i18nProvider } from '../i18nProvider';

const getKeys = (obj, prefix = '') => {
  return Object.keys(obj).reduce((res, el) => {
    if (Array.isArray(obj[el])) {
      return res;
    } else if (typeof obj[el] === 'object' && obj[el] !== null) {
      return [...res, ...getKeys(obj[el], prefix + el + '.')];
    }
    return [...res, prefix + el];
  }, []);
};

describe('Bilingual Translations Parity (es & en)', () => {
  it('contains all essential namespaces in both languages', () => {
    const requiredNamespaces = [
      'app',
      'features',
      'measurement_show',
      'user_show',
      'nutritionist_show',
      'results',
      'somatotype',
      'myroot',
      'resources',
      'user_list',
      'measurement_list',
      'nutritionist_list',
      'referenced_somatotype_list',
      'measurement_form',
    ];
    requiredNamespaces.forEach((ns) => {
      expect(es[ns], `Missing namespace ${ns} in es`).toBeDefined();
      expect(en[ns], `Missing namespace ${ns} in en`).toBeDefined();
    });
  });

  it('has identical keys in custom app namespaces between es and en', () => {
    const customNamespaces = [
      'app',
      'features',
      'measurement_show',
      'user_show',
      'nutritionist_show',
      'results',
      'somatotype',
      'user_list',
      'measurement_list',
      'nutritionist_list',
      'referenced_somatotype_list',
      'measurement_form',
    ];
    
    customNamespaces.forEach((ns) => {
      const esSubKeys = getKeys(es[ns] || {}, `${ns}.`);
      const enSubKeys = getKeys(en[ns] || {}, `${ns}.`);

      const missingInEn = esSubKeys.filter((k) => !enSubKeys.includes(k));
      const missingInEs = enSubKeys.filter((k) => !esSubKeys.includes(k));

      expect(missingInEn, `Keys in es.${ns} missing from en.${ns}`).toEqual([]);
      expect(missingInEs, `Keys in en.${ns} missing from es.${ns}`).toEqual([]);
    });
  });

  it('i18nProvider translates correctly in both Spanish and English', async () => {
    expect(i18nProvider.translate('app.title')).toBe('Atelier Antropometría');
    expect(i18nProvider.translate('features.title')).toBe('Configuración de Módulos & Funcionalidades');

    await i18nProvider.changeLocale('en');
    expect(i18nProvider.translate('app.title')).toBe('Anthropometry Atelier');
    expect(i18nProvider.translate('features.title')).toBe('Module & Feature Configuration');

    // Revert back to default
    await i18nProvider.changeLocale('es');
    expect(i18nProvider.translate('app.title')).toBe('Atelier Antropometría');
  });
});
