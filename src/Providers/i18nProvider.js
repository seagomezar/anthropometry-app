// in src/i18nProvider.js
import polyglotI18nProvider from 'ra-i18n-polyglot';
import en from 'ra-language-english';
import spanishMessages from '@blackbox-vision/ra-language-spanish';

export const es = {
  ...spanishMessages,
  resources: {
    // TODO: Completar los nombres de todos
    user: {
      name: 'Usuario |||| Usuarios',
      fields: {
        firstname: 'Nombre',
        lastname: 'Apellido',
        phone: 'Teléfono',
        address: 'Dirección',
        created_at: 'Creado',
        updated_at: 'Actualizado'
      },
    },
    measurement: {
      name: "Medición |||| Mediciones"
    },
    food_category: {
      name: "Categoria |||| Categorias",
      fields: {
        name: 'nombre',
        created_at: 'Creado',
        updated_at: 'Actualizado'
      }
    },
    goal: {
      name: "meta |||| metas",
      fields: {
        name: 'nombre',
        created_at: 'Creado',
        updated_at: 'Actualizado'
      }
    }
  },
};

const translations = { en, es };

export const i18nProvider = polyglotI18nProvider(
  (locale) => translations[locale],
  'en', // default locale
  [
    { locale: 'en', name: 'English' },
    { locale: 'es', name: 'Español' },
  ]
);
