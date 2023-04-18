// in src/MyMenu.js
import { Menu } from 'react-admin';

export const NutritionAppMenu = () => (
    <Menu>
        <Menu.ResourceItem name="user" />
        <Menu.ResourceItem name="measurement" />
        <Menu.ResourceItem name="nutritionist" />
        <Menu.ResourceItem name="referenced_somatotype" />
    </Menu>
); 