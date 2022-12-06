// Initialize the dataProvider before rendering react-admin resources.
import React, { useState, useEffect } from 'react';
import buildHasuraProvider from 'ra-data-hasura';
import { customBuildFields } from './Providers/dataProvider';
import { Admin, Resource } from 'react-admin';
import { ApolloClient, InMemoryCache } from '@apollo/client';

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
import Dashboard from './Components/Dashboard';
import authProvider from './Providers/authProvider';
import { i18nProvider } from './Providers/i18nProvider';
import {
  MeasurementCreate,
  MeasurementEdit,
  MeasurementList,
  MeasurementShow,
} from './Components/Measurements';
import {
  FoodCategoryEdit,
  FoodCategoryList,
  FoodCategoryCreate,
  FoodCategoryShow,
} from './Components/FoodCategory';
import {
  FoodCreate,
  FoodEdit,
  FoodList,
  FoodShow,
} from './Components/Food';
import {
  GoalCreate,
  GoalEdit,
  GoalList,
  GoalShow,
} from './Components/Goal';
import {
  PlanCreate,
  PlanEdit,
  PlanList,
  PlanShow,
} from './Components/Plan';
import {
  FoodHasEatingMomentCreate,
  FoodHasEatingMomentEdit,
  FoodHasEatingMomentList,
  FoodHasEatingMomentShow,
} from './Components/FoodHasEatingMomment';
import {
  FoodHasFoodcategoryEdit,
  FoodHasFoodCategoryList,
  FoodHasFoodCategoryCreate,
  FoodHasFoodCategoryShow,
} from './Components/FoodHasFoodCategory';
import {
  EatingMomentCreate,
  EatingMomentEdit,
  EatingMomentList,
  EatingMomentShow,
} from './Components/EatingMoment';
import {
  NutritionistCreate,
  NutritionistEdit,
  NutritionistList,
  NutritionistShow,
} from './Components/Nutritionist';
import {
  ReferencedSomatotypeCreate,
  ReferencedSomatotypeEdit,
  ReferencedSomatotypeList,
  ReferencedSomatotypeShow,
} from './Components/ReferencedSomatotype';
import {
  PrescribedFoodCreate,
  PrescribedFoodEdit,
  PrescribedFoodList,
  PrescribedFoodShow,
} from './Components/PrescribedFood';
import { UserList } from './Components/Users/UserList';
import { UserEdit } from './Components/Users/UserEdit';
import { UserCreate } from './Components/Users/UserCreate';
import { UserShow } from './Components/Users/UserShow';

const myClientWithAuth = new ApolloClient({
  uri: 'https://nutrition-app.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret':
      'CLc8hYc2WXlT803cRh718KIV6PpHECfEChKn66Aa68Am7mxg05gaBtYYwkyrFIhk',
  },
});
/* const myClientWithAuth = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql',
  cache: new InMemoryCache(),
}); */

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
      dashboard={Dashboard}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
      dataProvider={dataProvider}
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
        show={MeasurementShow}
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
      />
      <Resource
        name="referenced_somatotype"
        icon={LocalPharmacyIcon}
        list={ReferencedSomatotypeList}
        edit={ReferencedSomatotypeEdit}
        create={ReferencedSomatotypeCreate}
        show={ReferencedSomatotypeShow}
        recordRepresentation={(record) =>
          `${record.sport} - ${record.gender ? 'M' : 'F'}`
        }
      />
    </Admin>
  );
};

export default App;
