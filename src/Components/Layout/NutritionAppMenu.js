// in src/MyMenu.js
import { Menu } from 'react-admin';
import LabelIcon from '@mui/icons-material/Label';

export const NutritionAppMenu = () => (
    <Menu>
        {<Menu.DashboardItem />
        /*<Menu.ResourceItem name="user" />
        <Menu.ResourceItem name="measurement" />
        <Menu.ResourceItem name="plan" />
        <Menu.ResourceItem name="food" />
        <Menu.ResourceItem name="prescribed_food" />
        <Menu.ResourceItem name="food_category" />
        <Menu.ResourceItem name="goal" />
        <Menu.ResourceItem name="nutritionist" />
        <Menu.ResourceItem name="referenced_somatotype" />
        <Menu.ResourceItem name="eating_moment" />
        <Menu.ResourceItem name="food_has_eating_moment" />
        <Menu.ResourceItem name="food_has_food_category" />
        <Menu.Item to="/notes" primaryText="Notes" leftIcon={<LabelIcon />}/>*/}
        <Menu.ResourceItem name="athlete" />
        <Menu.ResourceItem name="physical_test" />
        <Menu.ResourceItem name="skill_test" />
        <Menu.ResourceItem name="psychological_test" />
        
    </Menu>
); 