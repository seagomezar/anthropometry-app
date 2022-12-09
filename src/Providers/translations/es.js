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
    pliegues: 'Pliegues (m.m)',
    perímetros: 'Perímetros (cm)',
    diametro: 'Diametro (cm)',
    somatotipo: 'Somatotipo de Referencia',
    empty: 'No hay elementos creados',
    grams: 'Gramos',
    total_calories: 'Calorías Totales',
  },
  resources: {
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
        plans: 'Planes de Alimentación',
        measurements: 'Mediciones',
      },
    },
    measurement: {
      name: 'Medición |||| Mediciones',
      fields: {
        dm_elbow: 'Diametro Codo (cms)',
        dm_knee: 'Diametro rodilla (cms)',
        dm_wrist: 'Diametro muñeca (cms)',
        plg_triceps: 'Pliege triceps(mm)',
        plg_bicep: 'pliege bicep (mm)',
        plg_subscapular: 'Pliege subscapular (mm) ',
        plg_suprailiac: 'Pliege suprailiaco (mm)',
        plg_supraspinal: 'Plige supraspinal (mm)',
        plg_abdominal: 'Pliege abdominal (mm)',
        plg_thigh: 'Pliege muslo (mm)',
        plg_calf: 'Pliege pierna (mm)',
        plg_armpit: 'Pliege Axila (mm)',
        plg_chest: 'Pliege pecho (mm)',
        
        prm_arm: 'Perímetro brazo (cms)',
        prm_wrist: 'perimetro muñeca (cms)',
        prm_waist: 'Perímetro cintura (cms)',
        prm_hip: 'Perímetro cadera (cms)',
        prm_calf: 'Perímetro pierna (cms)',
        prm_chest: 'Perímetro pecho (cms)',
        prm_thigh: 'Perímetro muslo (cms)',

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
      summary: 'Resumen del Plan',
      add_to_plan: 'Añadir alimento',
      fields: {
        comments: 'Comentario',
        goal_id: 'Meta',
        user_id: 'Usuario',
        created_at: 'Creado',
        updated_at: 'Actualizado',
        prescribed_food: 'Alimentos en Plan',
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
        eating_moment_name: 'Momento',
        eating_moment_time: 'Hora',
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
