// Initialize the dataProvider before rendering react-admin resources.
import React, { useState, useEffect } from 'react';
import buildHasuraProvider from 'ra-data-hasura';
import { customBuildFields } from './Providers/dataProvider';
import { Admin, CustomRoutes, Resource } from 'react-admin';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Route } from 'react-router-dom';

import UserIcon from '@mui/icons-material/Group';
import NearMeIcon from '@mui/icons-material/NearMe';
import StraightenIcon from '@mui/icons-material/Straighten';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import authProvider from './Providers/authProvider';
import { i18nProvider } from './Providers/i18nProvider';

import { MeasurementList } from './Components/Measurements/MeasurementList';
import { MeasurementEdit } from './Components/Measurements/MeasurementEdit';
import { MeasurementCreate } from './Components/Measurements/MeasurementCreate';
import { MeasurementShowPageTable } from './Components/Measurements/MeasurementShow';

import { NutritionistList } from './Components/Nutritionist/NutritionistList';
import { NutritionistEdit } from './Components/Nutritionist/NutritionistEdit';
import { NutritionistCreate } from './Components/Nutritionist/NutritionistCreate';
import { NutritionistShow } from './Components/Nutritionist/NutritionistShow';

import { ReferencedSomatotypeList } from './Components/ReferencedSomatotype/ReferencedSomatotypeList';
import { ReferencedSomatotypeEdit } from './Components/ReferencedSomatotype/ReferencedSomatotypeEdit';
import { ReferencedSomatotypeCreate } from './Components/ReferencedSomatotype/ReferencedSomatotypeCreate';
import { ReferencedSomatotypeShow } from './Components/ReferencedSomatotype/ReferencedSomatotypeShow';

import { UserList } from './Components/Users/UserList';
import { UserEdit } from './Components/Users/UserEdit';
import { UserCreate } from './Components/Users/UserCreate';
import { UserShow } from './Components/Users/UserShow';
import { Results } from './Components/Results/Results';
import LoginPage from './Components/Login/Login';
import { NutritionAppLayout } from './Components/Layout/NutritionAppLayout';
import byPassAuthProvider from './Providers/byPassAuthProvider';



const isLoginEnabled = process.env.REACT_APP_ENABLE_LOGIN;

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

      <CustomRoutes>
        <Route path="/results/:measurementId" element={<Results />} />
      </CustomRoutes>

      
    </Admin>
  );
};

export default App;
