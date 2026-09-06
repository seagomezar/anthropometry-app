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
import { vintageTheme } from './theme/vintageTheme';
import './theme/vintage.css';
import { useFeaturePreferences } from './config/features';



const isLoginEnabled = process.env.REACT_APP_ENABLE_LOGIN;

const getHasuraHeaders = () => {
  const adminSecret = (
    process.env.REACT_APP_HASURA_ADMIN_SECRET ||
    process.env.REACT_APP_HASURA_API_KEY ||
    process.env.REACT_APP_HASHURA_API_KEY ||
    ''
  ).trim();

  const headers = {};
  if (adminSecret) {
    headers['x-hasura-admin-secret'] = adminSecret;
  }
  return headers;
};

const hasuraUri =
  process.env.REACT_APP_HASURA_GRAPHQL_URL ||
  'https://nutrition-app.hasura.app/v1/graphql';

const myClientWithAuth = new ApolloClient({
  uri: hasuraUri,
  cache: new InMemoryCache(),
  headers: getHasuraHeaders(),
});

const App = () => {
  const [dataProvider, setDataProvider] = useState(null);
  const [error, setError] = useState(null);
  const { isFeatureEnabled } = useFeaturePreferences();

  useEffect(() => {
    const buildDataProvider = async (customBuildFields) => {
      try {
        const provider = await buildHasuraProvider(
          {
            client: myClientWithAuth,
          },
          customBuildFields
        );
        setDataProvider(() => provider);
      } catch (err) {
        console.error('Failed to initialize Hasura data provider:', err);
        setError(err);
      }
    };
    buildDataProvider({ buildFields: customBuildFields });
  }, []);

  if (error) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto' }}>
        <h2>Error Initializing Data Provider</h2>
        <p style={{ color: '#d32f2f' }}>{error.message || 'Could not connect to Hasura GraphQL backend.'}</p>
        <p>Please ensure that <code>REACT_APP_HASHURA_API_KEY</code> is set in your <code>.env</code> file if required by your Hasura backend.</p>
      </div>
    );
  }

  if (!dataProvider) return <p style={{ padding: '2rem', fontFamily: 'sans-serif' }}>Loading Anthropometry App...</p>;

  return (
    <Admin
      theme={vintageTheme}
      layout={NutritionAppLayout}
      authProvider={isLoginEnabled === 'false' ? byPassAuthProvider : authProvider}
      i18nProvider={i18nProvider}
      dataProvider={dataProvider}
      loginPage={LoginPage}
    >
      {(permissions) => (
        <>
          {isFeatureEnabled('user') && (
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
          )}
          {isFeatureEnabled('measurement') && (
            <Resource
              name="measurement"
              icon={StraightenIcon}
              list={MeasurementList}
              edit={MeasurementEdit}
              create={MeasurementCreate}
              show={MeasurementShowPageTable}
            />
          )}
          {isFeatureEnabled('nutritionist') && (!permissions || permissions?.role === 'admin') && (
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
          )}
          {isFeatureEnabled('referenced_somatotype') && (
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
          )}

          {isFeatureEnabled('results_analytics') && (
            <CustomRoutes>
              <Route path="/results/:measurementId" element={<Results />} />
            </CustomRoutes>
          )}
        </>
      )}
    </Admin>
  );
};

export default App;
