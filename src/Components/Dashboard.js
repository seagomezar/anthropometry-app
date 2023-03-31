import * as React from 'react';
import {
  Link, useAuthenticated, useTranslate, useGetOne,
  useDataProvider
} from 'react-admin';
import { Card, CardContent, CardHeader, Box, Button, CardActions } from '@mui/material';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import PolarChart from './BarChart';
import { useMediaQuery } from "@mui/material";

const Dashboard = () => {
  const translate = useTranslate();
  const dataProvider = useDataProvider();
  const [athleteCount, setAthleteCount] = React.useState(0);
  const [skillTestCount, setSkillTestCount] = React.useState(0);
  const [physicalTestCount, setPhysicalTestCount] = React.useState(0);
  const [psychologicalTestCount, setPsychologicalTestCount] = React.useState(0);
  React.useEffect(() => {
    dataProvider.getList('athlete', {}).then((dataResponse) => {
      console.log(dataResponse.data.length);
      setAthleteCount(dataResponse.data.length);
    });
    dataProvider.getList('skill_test', {}).then((dataResponse) => {
      console.log(dataResponse.data.length);
      setSkillTestCount(dataResponse.data.length);
    });
    dataProvider.getList('physical_test', {}).then((dataResponse) => {
      console.log(dataResponse.data.length);
      setPhysicalTestCount(dataResponse.data.length);
    });
    dataProvider.getList('psychological_test', {}).then((dataResponse) => {
      console.log(dataResponse.data.length);
      setPsychologicalTestCount(dataResponse.data.length);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useAuthenticated();
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Box maxWidth={600}>
      <Card>
        <CardHeader title="Tablero" />
        <CardContent>
          <PolarChart x={["Altletas", "Pruebas de Habilidad", "Pruebas Fisicas", "Pruebas Psicologicas"]} y={[athleteCount, skillTestCount, physicalTestCount, psychologicalTestCount]} title={"Atletas vs Tests"} />

        </CardContent>
        <CardActions>
          <Button
            color="secondary"
            variant='contained'
            component={Link}
            to={`/athlete`}
            startIcon={<NextPlanIcon />}
          >
            Lista de Atletas
          </Button>
          <Button
            color="error"
            variant='contained'
            component={Link}
            to={`/skill_test`}
            startIcon={<NextPlanIcon />}
          >
            Tests de Habilidad
          </Button>
          <Button
            variant='contained'
            component={Link}
            to={`/physical_test`}
            startIcon={<NextPlanIcon />}
          >
            Tests Físicos
          </Button>
          <Button
            variant='contained'
            component={Link}
            to={`/psychological_test`}
            startIcon={<NextPlanIcon />}
          >
            Tests Psicológicos
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Dashboard;
