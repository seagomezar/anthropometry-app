// in src/MyLayout.js
import { Layout } from 'react-admin';

import { NutritionAppMenu } from './NutritionAppMenu';

export const NutritionAppLayout = props => <Layout {...props} menu={NutritionAppMenu} />;