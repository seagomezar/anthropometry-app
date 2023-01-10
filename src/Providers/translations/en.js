import englishMessages from "ra-language-english";

export const en = {
  ...englishMessages,
  "Missing Refresh Token (audience: '', scope: 'openid profile email offline_access')":
    "Please Log in",
  myroot: {
    password: "Password",
    addressAndPhone: "Address Phone",
    identity: "Identity",
    male: "Male",
    female: "Female",
    mediciones: "measurements",
    AddressPhone: "Address Phone",
    pliegues: "folds (m.m)",
    perímetros: "perimeter (cm)",
    diametro: "Diameter (cm)",
    somatotipo: "Reference Somatotype",
    empty: "No items created",
    total_calories: "Calorías Totales",
    simulate_results: "Simular Resultados",
    welcomelogin: "Welcome to the Nutritionist portal",
    login: "Login",
  },
  resources: {
    user: {
      name: "Usuario |||| Usuarios",
      fields: {
        firstname: "Name",
        lastname: "Last name",
        email: "Email",
        phone: "Telephone",
        address: "Address",
        birthday: "Birthday",
        gender: "Gender",
        created_at: "Created",
        updated_at: "Updated",
        password: "Password",
        confirm_password: "Confirm Password",
        plans: "Meal Plans",
        measurements: "Measurements",
        nutritionist: "Nutritionist",
      },
    },
    measurement: {
      name: "Medición |||| Mediciones",
      fields: {
        dm_elbow: "Elbow Diameter (cms)",
        dm_knee: "Knee Diameter(cms)",
        dm_wrist: "Wrist Diameter (cms)",
        plg_abdominal: "Abdominal fold (mm)",
        plg_armpit: "Tuck Armpit (mm)",
        plg_calf: "Calf fold (mm)",
        plg_chest: "Chest fold (mm)",
        plg_subscapular: "Subscapularis fold (mm) ",
        plg_suprailiac: "Suprailiac fold (mm)",
        plg_supraspinal: "Supraspinal fold (mm)",
        plg_thigh: "Thigh crease (mm)",
        plg_triceps: "Triceps tuck (mm)",
        prm_arm: "Arm perimeter (cms)",
        prm_calf: "Calf circumference (cms)",
        prm_chest: "Chest perimeter (cms)",
        prm_hip: "Hip circumference (cms)",
        prm_thigh: "Thigh perimeter (cms)",
        prm_waist: "Waist circumference (cms)",
        x: "x",
        y: "y",
        fitness_level: "Training level",
        height: "Height (Cms)",
        weight: "Weight (Kg)",
        creatinine: "Creatinine",
        t3_t4: "T3_T4",
        triglycerides: "triglycerides",
        uric_acid: "Uric acid",
        user_id: "User",
        referenced_somatotype_id: "Sport",
        control: "Control",
      },
    },
    food_category: {
      name: "Categoria |||| Categorias",
      fields: {
        name: "Name",
        created_at: "Created",
        updated_at: "Updated",
      },
    },
    goal: {
      name: "Objetivo |||| Objetivos",
      fields: {
        name: "Name",
        created_at: "Created",
        updated_at: "Updated",
      },
    },
    plan: {
      name: "Plan |||| Planes",

      fields: {
        comments: "Comment",
        goal_id: "Goal",
        user_id: "User",
        created_at: "Created",
        updated_at: "Updated",
        prescribed_food: "Meals in Plan",
      },
    },
    food_has_eating_moment: {
      name: "Alimento X Momento",
      fields: {
        eating_moment_id: "Moment",
        food_id: "Food",
        created_at: "Created",
        updated_at: "Updated",
      },
    },
    food: {
      name: "Alimento |||| Alimentos",
      fields: {
        calories: "Calories",
        chos: "carbohydrates",
        description: "Description",
        fat: "Fat",
        measure_unit: "Unit of measurement",
        protein: "Protein",
        quantity: "Quantity",
        created_at: "Created",
        updated_at: "Updated",
      },
    },
    food_has_food_category: {
      name: "Categoria de alimento |||| Categoria de alimentos",
      fields: {
        food_id: "Food",
        food_category_id: "Categoria",
        created_at: "Created",
        updated_at: "Updated",
      },
    },
    eating_moment: {
      name: "Momento |||| Momentos",
      fields: {
        name: "Name",
        time: "Time",
        created_at: "Created",
        updated_at: "Updated",
      },
    },
    nutritionist: {
      name: "Nutricionista |||| Nutricionistas",
      fields: {
        address: "Address",
        email: "Email",
        firstname: "Name",
        phone: "Telephone",
        lastname: "Last name",
        created_at: "Created",
        updated_at: "Updated",
      },
    },
    prescribed_food: {
      name: "Alimentos en plan |||| Alimentos en planes",
      fields: {
        eating_moment_name: "Moment",
        eating_moment_time: "Time",
        food_id: "Food",
        plan_id: "plan",
        prescribed_quantity: "Prescribed Amount",
        created_at: "Created",
        updated_at: "Updated",
      },
    },
    referenced_somatotype: {
      name: "Somatotipo de referencia |||| Somatotipos de referencias",
      fields: {
        sport: "Sport",
        gender: "Gender",
        endomorph: "Endomorph",
        mesomorph: "Mesomorph",
        ectomortph: "Ectomorph",
        x: "x",
        y: "y",
        created_at: "Created",
        updated_at: "Updated",
      },
    },
    result: {
      name: "Resultado |||| Resultados",
      body_type: "Tipo de cuerpo",
      tabbed_data: "Datos Tabulados",
      fat_percentages: "Porcentajes de Grasa",
      imc_analysis: "Análisis de IMC",
      x_y_compairson: "Comparacion X / Y",
      x_y_actual: "Resulado Actual",
      x_y_referenced: "Referencia",
      historic: "Histórico de Resultados",
      fields: {
        endomorph: "Endomorfo",
        mesomorph: "Mesomorfo",
        ectomorph: "Ectomorfo",
        resultX: "Resultado X",
        resultY: "Resultado Y",
        imc: "IMC",
        iaks: "IAKS",
        complexion: "Compleción",
        raizPT: "Raíz PT",
        conicIndex: "Índice Cónico",
        sumOfPlgs: "Suma de Pliegues",
        sumaPlieguesEndo: "Suma de Pliegues Endo",
        endoFactor: "Factor Endo",
        yhaszFatPercentage: "Porcentaje de Grasa Yhasz",
        ponderalIndex: "Índice Ponderal",
        faulknerFatPercentage: "Porcentaje de Grasa Faulkner",
        parizcovaFatPercentage: "Porcentaje de Grasa Parizcova",
        fatWeight: "Peso de Grasa",
        freeFatWeight: "Peso Libre de Grasa",
        activeMass: "Masa Activa",
        residualWeight: "Peso Residual",
        desiredWeight: "Peso Deseado",
        desiredIMC: "IMC Deseado",
        desiredFat2MethodPercentage: "Porcentaje Deseado del Método 2 de Grasa",
      },
    },
  },
};
