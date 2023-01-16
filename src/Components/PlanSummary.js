import React, { useState } from 'react';
import {
  useRecordContext,
  useGetManyReference,
  useTranslate,
  useDataProvider,
} from 'react-admin';
import {
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import PieChart from './PieChart';

export const PlanSummaryField = ({ source }) => {
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  const translate = useTranslate();
  const [foods, setFoods] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const { data } = useGetManyReference('prescribed_food', {
    target: 'plan_id',
    id: record.id,
  });
  const [prescribed, setPrescribed] = useState([]);

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
            const p = foods.data.map((f, index) => {
              console.log(f);
              dataY[0] += f.chos * data[index].prescribed_quantity;
              dataY[1] += f.fat * data[index].prescribed_quantity;
              dataY[2] += f.protein * data[index].prescribed_quantity;
              totalCalories +=
                f.calories * data[index].prescribed_quantity;
              return {
                ...f,
                totalCalories:
                  f.calories * data[index].prescribed_quantity,
                prescribedQuantity: data[index].prescribed_quantity,
              };
            });
            setPrescribed(p);
            setFoods(dataY);
            setTotalCalories(totalCalories);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Card>
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                <TableCell align="right">
                  Prescribed Quantity
                </TableCell>
                <TableCell align="right">Total Calories(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prescribed.map((row) => (
                <TableRow
                  key={row.description}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.description}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.chos}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                  <TableCell align="right">
                    {row.prescribedQuantity} ({row.measure_unit})
                  </TableCell>
                  <TableCell align="right">
                    {row.totalCalories}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>Totales</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="right">{totalCalories}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <CardContent>
        <PieChart
          title={translate('myroot.total_calories')}
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
