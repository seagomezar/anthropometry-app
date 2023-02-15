// in src/MyMenu.js
import { Menu } from 'react-admin';
import LabelIcon from '@mui/icons-material/Label';

export const NutritionAppMenu = () => (
    <Menu>
        <Menu.DashboardItem />
        <Menu.ResourceItem name="user" />
        <Menu.ResourceItem name="measurement" />
        <Menu.ResourceItem name="plan" />
        <Menu.Item to="/notes" primaryText="Notes" leftIcon={<LabelIcon />}/>
    </Menu>
); 