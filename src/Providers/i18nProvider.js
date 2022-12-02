// in src/i18nProvider.js
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import spanishMessages from '@blackbox-vision/ra-language-spanish';

export const es = {
  ...spanishMessages,
  myroot: {
    password: 'Contraseña',
    addressAndPhone: 'Dirección & Teléfono',
    identity: 'Identidad',
    male: 'Masculino',
    female: 'Femenino',
    mediciones: 'Mediciones',
    AddressPhone: 'direccion y telefono',
    pliegues:'Pliegues (m.m)',
    perímetros:'Perímetros (cm)',
    diametro:'Diametro (cm)',
    somatotipo:'somatotipo de referencia',
  },
  resources: {
    // TODO: Completar los nombres de todos
    user: {
      name: 'Usuario |||| Usuarios',
      fields: {
        firstname: 'Nombre',
        lastname: 'Apellido',
        email: 'correo eletronico',
        phone: 'Teléfono',
        address: 'Dirección',
        birthday: 'Fecha De Nacimiento',
        gender: 'Genero',
        created_at: 'Creado',
        updated_at: 'Actualizado',
        password: 'Contraseña',
        confirm_password: 'Confirmar Contraseña',
      },
    },
    measurement: {
      name: 'Medición |||| Mediciones',
      fields: {
        dm_elbow: 'Diametro Codo (cms)',
        dm_knee: 'Diametro rodilla (cms)',
        dm_wrist: 'Diametro muñeca (cms)',
        plg_abdominal: 'Pliege abdominal (mm)',
        plg_armpit: 'Pliege Axila (mm)',
        plg_calf: 'Pliege pantorrilla (mm)',
        plg_chest: 'Pliege pecho (mm)',
        plg_subscapular: 'Pliege subscapular (mm) ',
        plg_suprailiac: 'Pliege suprailiac (mm)',
        plg_supraspinal: 'Plige supraspinal (mm)',
        plg_thigh: 'Pliege muslo (mm)',
        plg_triceps: 'Pliege triceps(mm)',
        prm_arm: 'Perímetro brazo (cms)',
        prm_calf: 'Perímetro Pantorrilla (cms)',
        prm_chest: 'Perímetro pecho (cms)',
        prm_hip: 'Perímetro cadera (cms)',
        prm_thigh: 'Perímetro muslo (cms)',
        prm_waist: 'Perímetro cintura (cms)',
        x: 'x',
        y: 'y',
        fitness_level: 'Nivel de entrenamiento',
        height: 'Altura (Cms)',
        weight: 'Peso (Kg)',
        creatinine: 'Creatinine',
        t3_t4: 't3_t4',
        triglycerides: 'Triglicérios',
        uric_acid: 'Ácido úrico',
        user_id: 'Usuario',
        referenced_somatotype_id: 'Deporte',
        control: 'Control',
      },
    },
    food_category: {
      name: 'Categoria |||| Categorias',
      fields: {
        name: 'Nombre',
        created_at: 'Creado',
        updated_at: 'Actualizado',
      },
    },
    goal: {
      name: 'Objetivo |||| Objetivos',
      fields: {
        name: 'Nombre',
        created_at: 'Creado',
        updated_at: 'Actualizado',
      },
    },
    plan: {
      name: 'Plan |||| Planes',
      fields: {
        comments: 'Comentario',
        goal_id: 'Meta',
        user_id: 'Usuario',
        created_at: 'Creado',
        updated_at: 'Actualizado',
      },
    },
    food_has_eating_moment: {
      name: 'Alimento X Momento',
      fields: {
        eating_moment_id: 'Momento',
        food_id: 'Alimento',
        created_at: 'Creado',
        updated_at: 'Actualizado',
      },
    },
    food: {
      name: 'Alimento |||| Alimentos',
      fields: {
        calories: 'Calorías',
        chos: 'Carbohidratos',
        description: 'Descripción',
        fat: 'Grasa',
        measure_unit: 'Unidad de medida',
        protein: 'Proteína',
        quantity: 'Cantidad',
        created_at: 'Creado',
        updated_at: 'Actualizado',
      },
    },
    food_has_food_category: {
      name: 'Categoria de alimento |||| Categoria de alimentos',
      fields: {
        food_id: 'Alimento',
        food_category_id: 'Categoria',
        created_at: 'Creado',
        updated_at: 'Actualizado',
      },
    },
    eating_moment: {
      name: 'Momento |||| Momentos',
      fields: {
        name: 'Nombre',
        time: 'Hora',
        created_at: 'Creado',
        updated_at: 'Actualizado',
      },
    },
    nutritionist: {
      name: 'Nutricionista |||| Nutricionistas',
      fields: {
        address: 'Dirección',
        email: 'Correo Electronico',
        firstname: 'Nombre',
        phone: 'Teléfono',
        lastname: 'Apellido',
        created_at: 'Creado',
        updated_at: 'Actualizado',
      },
    },
    prescribed_food: {
      name: 'Alimentos en plan |||| Alimentos en planes',
      fields: {
        eating_moment_name: 'Eating_moment_name',
        eating_moment_time: 'Eating_moment_time',
        food_id: 'Alimento',
        plan_id: 'plan',
        prescribed_quantity: 'Cantidad Prescrita',
        created_at: 'Creado',
        updated_at: 'Actualizado',
      },
    },
    referenced_somatotype: {
      name: 'Somatotipo de referencia |||| Somatotipos de referencias',
      fields: {
        sport: 'Deporte',
        gender: 'Genero',
        endomorph: 'Endomorfo',
        mesomorph: 'Mesomorfo',
        ectomortph: 'Ectomorfo',
        x: 'x',
        y: 'y',
        created_at: 'Creado',
        updated_at: 'Actualizado',
      },
    },
  },
};

export const en = {
  ...englishMessages,
  resources: {
    food_has_food_category: {
      name: 'Food x Category',
    },
    food_has_eating_moment: {
      name: 'Food x Eating Moment',
    },
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
