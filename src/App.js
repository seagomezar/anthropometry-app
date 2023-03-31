// Initialize the dataProvider before rendering react-admin resources.
import React, { useState, useEffect } from 'react';
import buildHasuraProvider from 'ra-data-hasura';
import { customBuildFields } from './Providers/dataProvider';
import { Admin, CustomRoutes, Resource } from 'react-admin';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Route } from 'react-router-dom';

import UserIcon from '@mui/icons-material/Group';
import StraightenIcon from '@mui/icons-material/Straighten';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import KitchenIcon from '@mui/icons-material/Kitchen';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import NearMeIcon from '@mui/icons-material/NearMe';
import Dashboard from './Components/Dashboard';
import authProvider from './Providers/authProvider';
import { i18nProvider } from './Providers/i18nProvider';

import { MeasurementList } from './Components/Measurements/MeasurementList';
import { MeasurementEdit } from './Components/Measurements/MeasurementEdit';
import { MeasurementCreate } from './Components/Measurements/MeasurementCreate';
import { MeasurementShowPageTable } from './Components/Measurements/tablas';

import { FoodCategoryList } from './Components/FoodCategory/FoodCategoryList';
import { FoodCategoryEdit } from './Components/FoodCategory/FoodCategoryEdit';
import { FoodCategoryCreate } from './Components/FoodCategory/FoodCategoryCreate';
import { FoodCategoryShow } from './Components/FoodCategory/FoodCategoryShow';

import { FoodList } from './Components/Food/FoodList';
import { FoodEdit } from './Components/Food/FoodEdit';
import { FoodCreate } from './Components/Food/FoodCreate';
import { FoodShow } from './Components/Food/FoodShow';

import { GoalList } from './Components/Goal/GoalList';
import { GoalEdit } from './Components/Goal/GoalEdit';
import { GoalCreate } from './Components/Goal/GoalCreate';
import { GoalShow } from './Components/Goal/GoalShow';

import { PlanList } from './Components/Plan/PlanList';
import { PlanEdit } from './Components/Plan/PlanEdit';
import { PlanCreate } from './Components/Plan/PlanCreate';
import { PlanShow } from './Components/Plan/PlanShow';

import { FoodHasEatingMomentList } from './Components/FoodHasEatingMoment/FoodHasEatingMomentList';
import { FoodHasEatingMomentEdit } from './Components/FoodHasEatingMoment/FoodHasEatingMomentEdit';
import { FoodHasEatingMomentCreate } from './Components/FoodHasEatingMoment/FoodHasEatingMomentCreate';
import { FoodHasEatingMomentShow } from './Components/FoodHasEatingMoment/FoodHasEatingMomentShow';

import { FoodHasFoodCategoryList } from './Components/FoodHasFoodCategory/FoodHasFoodCategoryList';
import { FoodHasFoodcategoryEdit } from './Components/FoodHasFoodCategory/FoodHasFoodcategoryEdit';
import { FoodHasFoodCategoryCreate } from './Components/FoodHasFoodCategory/FoodHasFoodCategoryCreate';
import { FoodHasFoodCategoryShow } from './Components/FoodHasFoodCategory/FoodHasFoodCategoryShow';

import { EatingMomentList } from './Components/EatingMoment/EatingMomentList';
import { EatingMomentEdit } from './Components/EatingMoment/EatingMomentEdit';
import { EatingMomentCreate } from './Components/EatingMoment/EatingMomentCreate';
import { EatingMomentShow } from './Components/EatingMoment/EatingMomentShow';

import { NutritionistList } from './Components/Nutritionist/NutritionistList';
import { NutritionistEdit } from './Components/Nutritionist/NutritionistEdit';
import { NutritionistCreate } from './Components/Nutritionist/NutritionistCreate';
import { NutritionistShow } from './Components/Nutritionist/NutritionistShow';

import { ReferencedSomatotypeList } from './Components/ReferencedSomatotype/ReferencedSomatotypeList';
import { ReferencedSomatotypeEdit } from './Components/ReferencedSomatotype/ReferencedSomatotypeEdit';
import { ReferencedSomatotypeCreate } from './Components/ReferencedSomatotype/ReferencedSomatotypeCreate';
import { ReferencedSomatotypeShow } from './Components/ReferencedSomatotype/ReferencedSomatotypeShow';

import { PrescribedFoodList } from './Components/PrescribedFood/PrescribedFoodList';
import { PrescribedFoodEdit } from './Components/PrescribedFood/PrescribedFoodEdit';
import { PrescribedFoodCreate } from './Components/PrescribedFood/PrescribedFoodCreate';
import { PrescribedFoodShow } from './Components/PrescribedFood/PrescribedFoodShow';

import { SkillTestList } from './Components/SkillTest/SkillTestList';
import { SkillTestEdit } from './Components/SkillTest/SkillTestEdit';
import { SkillTestCreate } from './Components/SkillTest/SkillTestCreate';
import { SkillTestShow } from './Components/SkillTest/SkillTestShow';

import { AthleteList } from './Components/Athlete/AthleteList';
import { AthleteEdit } from './Components/Athlete/AthleteEdit';
import { AthleteCreate } from './Components/Athlete/AthleteCreate';
import { AthleteShow } from './Components/Athlete/AthleteShow';

import { PhysicalTestList } from './Components/PhysicalTest/PhysicalTestList';
import { PhysicalTestEdit } from './Components/PhysicalTest/PhysicalTestEdit';
import { PhysicalTestCreate } from './Components/PhysicalTest/PhysicalTestCreate';
import { PhysicalTestShow } from './Components/PhysicalTest/PhysicalTestShow';

import { PsychologicalTestList } from './Components/PsychologicalTest/PsychologicalTestList';
import { PsychologicalTestEdit } from './Components/PsychologicalTest/PsychologicalTestEdit';
import { PsychologicalTestCreate } from './Components/PsychologicalTest/PsychologicalTestCreate';
import { PsychologicalTestShow } from './Components/PsychologicalTest/PsychologicalTestShow';

import { UserList } from './Components/Users/UserList';
import { UserEdit } from './Components/Users/UserEdit';
import { UserCreate } from './Components/Users/UserCreate';
import { UserShow } from './Components/Users/UserShow';
import { Results } from './Components/Results/Results';
import LoginPage from './Components/LoginPage';
import Notes from './Components/Notes/Notes';
import { NutritionAppLayout } from './Components/Layout/NutritionAppLayout';
import byPassAuthProvider from './Providers/byPassAuthProvider';

/*import { Notes } from './Components/Notes/Notes';
/*import { ChangeAlert } from './Components/Notes/ChangeAlert ';*/

const isLoginEnabled = process.env.REACT_APP_ENABLE_LOGIN;
console.log({isLoginEnabled})

const myClientWithAuth = new ApolloClient({
  uri: 'https://nutrition-app.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret':
      process.env.REACT_APP_HASHURA_API_KEY || '',
  },
});

const App = () => {
  const [dataProvider, setDataProvider] = useState(null);
  useEffect(() => {
    const buildDataProvider = async (customBuildFields) => {
      const dataProvider = await buildHasuraProvider(
        {
          client: myClientWithAuth,
        },
        customBuildFields
      );
      setDataProvider(() => dataProvider);
    };
    buildDataProvider({ buildFields: customBuildFields });
  }, []);

  if (!dataProvider) return <p>Loading...</p>;

  return (
    <Admin
      layout={NutritionAppLayout}
      dashboard={Dashboard}
      authProvider={(isLoginEnabled==='true') ? authProvider: byPassAuthProvider}
      i18nProvider={i18nProvider}
      dataProvider={dataProvider}
      loginPage={LoginPage}
    >
      <Resource
        name="user"
        icon={UserIcon}
        list={UserList}
        edit={UserEdit}
        create={UserCreate}
        show={UserShow}
        recordRepresentation={(record) =>
          `${record.firstname} ${record.lastname}`
        }
      />
      <Resource
        name="measurement"
        icon={StraightenIcon}
        list={MeasurementList}
        edit={MeasurementEdit}
        create={MeasurementCreate}
        show={MeasurementShowPageTable}
      />
      <Resource
        name="food_category"
        icon={MenuBookIcon}
        list={FoodCategoryList}
        edit={FoodCategoryEdit}
        create={FoodCategoryCreate}
        show={FoodCategoryShow}
        recordRepresentation={(record) => `${record.name}`}
      />
      <Resource
        name="food"
        icon={LocalDiningIcon}
        list={FoodList}
        edit={FoodEdit}
        create={FoodCreate}
        show={FoodShow}
        recordRepresentation={(record) =>
          `${
            record.description[0].toUpperCase() +
            record.description.substring(1)
          }`
        }
      />
      <Resource
        name="goal"
        icon={SportsScoreIcon}
        list={GoalList}
        edit={GoalEdit}
        create={GoalCreate}
        show={GoalShow}
        recordRepresentation={(record) => `${record.name}`}
      />
      <Resource
        name="plan"
        icon={NextPlanIcon}
        list={PlanList}
        edit={PlanEdit}
        create={PlanCreate}
        show={PlanShow}
        recordRepresentation={(record) => `${record.comments}`}
      />
      <Resource
        name="prescribed_food"
        icon={MedicationLiquidIcon}
        list={PrescribedFoodList}
        edit={PrescribedFoodEdit}
        create={PrescribedFoodCreate}
        show={PrescribedFoodShow}
      />
      <Resource
        name="food_has_eating_moment"
        icon={AlarmOnIcon}
        list={FoodHasEatingMomentList}
        edit={FoodHasEatingMomentEdit}
        create={FoodHasEatingMomentCreate}
        show={FoodHasEatingMomentShow}
      />
      <Resource
        name="food_has_food_category"
        icon={KitchenIcon}
        list={FoodHasFoodCategoryList}
        edit={FoodHasFoodcategoryEdit}
        create={FoodHasFoodCategoryCreate}
        show={FoodHasFoodCategoryShow}
      />
      <Resource
        name="eating_moment"
        icon={CalendarMonthIcon}
        list={EatingMomentList}
        edit={EatingMomentEdit}
        create={EatingMomentCreate}
        show={EatingMomentShow}
        recordRepresentation={(record) => `${record.name}`}
      />
      <Resource
        name="nutritionist"
        icon={LocalPharmacyIcon}
        list={NutritionistList}
        edit={NutritionistEdit}
        create={NutritionistCreate}
        show={NutritionistShow}
        recordRepresentation={(record) =>
          `${record.firstname} ${record.lastname}`
        }
      />
      <Resource
        name="referenced_somatotype"
        icon={NearMeIcon}
        list={ReferencedSomatotypeList}
        edit={ReferencedSomatotypeEdit}
        create={ReferencedSomatotypeCreate}
        show={ReferencedSomatotypeShow}
        recordRepresentation={(record) =>
          `${record.sport} - ${record.gender ? 'M' : 'F'}`
        }
      />
      <Resource
        name="skill_test"
        icon={NearMeIcon}
        list={SkillTestList}
        edit={SkillTestEdit}
        create={SkillTestCreate}
        show={SkillTestShow}
      />
      <Resource
        name="athlete"
        icon={NearMeIcon}
        list={AthleteList}
        edit={AthleteEdit}
        create={AthleteCreate}
        show={AthleteShow}
        recordRepresentation={(record) =>
          `${record.name}`}
      />
      <Resource
        name="physical_test"
        icon={NearMeIcon}
        list={PhysicalTestList}
        edit={PhysicalTestEdit}
        create={PhysicalTestCreate}
        show={PhysicalTestShow}
      />
      <Resource
        name="psychological_test"
        icon={NearMeIcon}
        list={PsychologicalTestList}
        edit={PsychologicalTestEdit}
        create={PsychologicalTestCreate}
        show={PsychologicalTestShow}
      />


      <CustomRoutes>
        <Route path="/results/:measurementId" element={<Results />} />
        <Route path="/notes" element={<Notes />} />
      </CustomRoutes>

      
    </Admin>
  );
};

export default App;
