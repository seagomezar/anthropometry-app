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
      name: "Medición |||| Mediciones",
      fields: {
        dm_elbow: 'Diametro Codo (cms)',
        plg_armpit: "Pliege Axila (mm)",
        prm_calf: "Perímetro Pantorrilla (cms)"
      }
    },
    food_category: {
      name: "Categoria |||| Categorias",
      fields: {
        name: 'Nombre',
        created_at: 'Creado',
        updated_at: 'Actualizado'
      }
    },
    goal: {
      name: "Meta |||| Metas",
      fields: {
        name: 'Nombre',
        created_at: 'Creado',
        updated_at: 'Actualizado'
      }
    },
    plan: {
      name: "Plan |||| Planes",
      fields: {
        comments: 'Comentario',
        goal_id: 'Meta',
        user_id: 'Usuario',
        created_at: 'Creado',
        updated_at: 'Actualizado'
      }
    },
    food_has_eating_moment: {
      name: "Momento de comida |||| Momento de comidas ",
      fields: {
        eating_moment_id: 'Momento',
        food_id: 'Alimento',
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
