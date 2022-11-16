// Initialize the dataProvider before rendering react-admin resources.
import React, { useState, useEffect } from 'react';
import buildHasuraProvider from 'ra-data-hasura';
import {
  Admin,
  EditGuesser,
  Layout,
  ListGuesser,
  Resource,
} from 'react-admin';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { UserCreate, UserEdit, UserList } from './Components/Users';
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
} from './Components/Measurements';
import {
  FoodCategoryEdit,
  FoodCategoryList,
} from './Components/FoodCategory';
import { FoodCreate, FoodEdit, FoodList } from './Components/Food';
import { GoalCreate, GoalEdit, GoalList } from './Components/Goal';
import { PlanCreate, PlanEdit, PlanList } from './Components/Plan';
import {
  FoodHasEatingMomentCreate,
  FoodHasEatingMomentEdit,
  FoodHasEatingMomentList,
} from './Components/FoodHasEatingMomment';
import {
  FoodHasFoodcategoryEdit,
  FoodHasFoodCategoryList,
} from './Components/FoodHasFoodCategory';
import {
  EatingMomentCreate,
  EatingMomentEdit,
  EatingMomentList,
} from './Components/EatingMoment';
import {
  NutritionistCreate,
  NutritionistEdit,
  NutritionistList,
} from './Components/Nutritionist';
import { MyAppBar } from './Components/MyAppBar';

/*
const myClientWithAuth = new ApolloClient({
  uri: 'https://nutrition-app.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret':
      'CLc8hYc2WXlT803cRh718KIV6PpHECfEChKn66Aa68Am7mxg05gaBtYYwkyrFIhk',
  },
});
*/
const myClientWithAuth = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  const [dataProvider, setDataProvider] = useState(null);

  useEffect(() => {
    const buildDataProvider = async () => {
      const dataProvider = await buildHasuraProvider({
        client: myClientWithAuth,
      });
      setDataProvider(() => dataProvider);
    };
    buildDataProvider();
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
      />
      <Resource
        name="food_category"
        icon={MenuBookIcon}
        list={FoodCategoryList}
        edit={FoodCategoryEdit}
        create={GoalCreate}
        recordRepresentation={(record) => `${record.name}`}
      />
      <Resource
        name="food"
        icon={LocalDiningIcon}
        list={FoodList}
        edit={FoodEdit}
        create={FoodCreate}
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
      />
      <Resource
        name="plan"
        icon={NextPlanIcon}
        list={PlanList}
        edit={PlanEdit}
        create={PlanCreate}
      />
      {/* TODO: Arreglar este con la informacion correcta*/}
      <Resource
        name="prescribed_food"
        icon={MedicationLiquidIcon}
        list={ListGuesser}
        edit={EditGuesser}
      />
      <Resource
        name="food_has_eating_moment"
        icon={AlarmOnIcon}
        list={FoodHasEatingMomentList}
        edit={FoodHasEatingMomentEdit}
        create={FoodHasEatingMomentCreate}
      />
      <Resource
        name="food_has_food_category"
        icon={KitchenIcon}
        list={FoodHasFoodCategoryList}
        edit={FoodHasFoodcategoryEdit}
        create={FoodHasEatingMomentCreate}
      />
      <Resource
        name="eating_moment"
        icon={CalendarMonthIcon}
        list={EatingMomentList}
        edit={EatingMomentEdit}
        create={EatingMomentCreate}
      />
      <Resource
        name="nutritionist"
        icon={LocalPharmacyIcon}
        list={NutritionistList}
        edit={NutritionistEdit}
        create={NutritionistCreate}
      />
    </Admin>
  );
};

export default App;
