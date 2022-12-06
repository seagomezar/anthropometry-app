import React, { useState } from 'react';
import {
  useRecordContext,
  useGetManyReference,
  useTranslate,
  useDataProvider,
} from 'react-admin';
import { Card, CardContent } from '@mui/material';
import PieChart from './PieChart';

export const PlanSummaryField = ({ source }) => {
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  const translate = useTranslate();
  const { data } = useGetManyReference('prescribed_food', {
    target: 'plan_id',
    id: record.id,
    meta: { _embed: 'food' },
  });
  const [foods, setFoods] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  React.useEffect(() => {
    if (data?.length) {
      const arrayOfData = data.map((f) => f.food_id);
      console.log(arrayOfData);
      dataProvider
        .getMany('food', { ids: arrayOfData })
        .then((foods) => {
          if (foods) {
            const dataY = [0, 0, 0];
            let totalCalories = 0;
            foods.data.forEach((f, index) => {
              console.log(f);
              dataY[0] += f.chos * data[index].prescribed_quantity;
              dataY[1] += f.fat * data[index].prescribed_quantity;
              dataY[2] += f.protein * data[index].prescribed_quantity;
              totalCalories +=
                f.calories * data[index].prescribed_quantity;
            });
            setFoods(dataY);
            setTotalCalories(totalCalories);
          }
        });
    }
  }, [data]);

  return (
    <Card>
      <CardContent>
        <PieChart
          title="Total Calories"
          x={[translate('resources.food.fields.calories')]}
          y={[totalCalories]}
        />
        <PieChart
          title={translate('myroot.grams')}
          x={[
            translate('resources.food.fields.chos'),
            translate('resources.food.fields.fat'),
            translate('resources.food.fields.protein'),
          ]}
          y={foods}
        />
      </CardContent>
    </Card>
  );
};
