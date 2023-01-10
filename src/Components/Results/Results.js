import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';

import { generateResults } from '../../Providers/retultsProvider';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'react-router-dom';
import {
  useGetOne,
  useDataProvider,
  useTranslate,
} from 'react-admin';
import PolarChart from '../PolarChart';
import BarChart from '../BarChart';
import ScatterChart from '../ScatterChart';
import ResultsChart from './ResultsChart';

export const Results = () => {
  let { measurementId } = useParams();
  const translate = useTranslate();
  const { data } = useGetOne('measurement', {
    id: measurementId,
  });
  const [user, setUser] = React.useState();
  const [result, setResult] = React.useState({
    activeMass: 0,
    complexion: 0,
    conicIndex: 0,
    desiredFat2MethodPercentage: 0,
    desiredWeight: 0,
    desiredIMC: 0,
    ectomorph: 0,
    endoFactor: 0,
    endomorph: 0,
    fatWeight: 0,
    faulknerFatPercentage: 0,
    freeFatWeight: 0,
    iaks: 0,
    imc: 0,
    mesomorph: 0,
    parizcovaFatPercentage: 0,
    ponderalIndex: 0,
    raizPT: 0,
    residualWeight: 0,
    resultX: 0,
    resultY: 0,
    sumOfPlgs: 0,
    sumaPlieguesEndo: 0,
    yhaszFatPercentage: 0,
  });
  const [referecedSomatotype, setReferencedSomatotype] =
    React.useState({
      x: 0,
      y: 0,
    });
  const dataProvider = useDataProvider();
  React.useEffect(() => {
    dataProvider.getOne('user', { id: data.user_id }).then((user) => {
      setResult(
        generateResults(
          data,
          data.height,
          data.weight,
          user.gender === 'Femenino' ? false : true
        )
      );
      console.log(user);
      setUser(user);
    });
    dataProvider
      .getOne('referenced_somatotype', {
        id: data.referenced_somatotype_id,
      })
      .then((r) => {
        setReferencedSomatotype(r.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            {translate('resources.result.tabbed_data')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <Typography variant="h6" gutterBottom>
                {translate('resources.result.fields.activeMass')}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                {parseFloat(result.activeMass).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <Typography variant="h6" gutterBottom>
                {translate('resources.result.fields.complexion')}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                {parseFloat(result.complexion).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <Typography variant="h6" gutterBottom>
                {translate('resources.result.fields.conicIndex')}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                {parseFloat(result.conicIndex).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <Typography variant="h6" gutterBottom>
                {translate(
                  'resources.result.fields.desiredFat2MethodPercentage'
                )}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                {parseFloat(
                  result.desiredFat2MethodPercentage
                ).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <Typography variant="h6" gutterBottom>
                {translate('resources.result.fields.desiredWeight')}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                {parseFloat(result.desiredWeight).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <Typography variant="h6" gutterBottom>
                {translate('resources.result.fields.ectomorph')}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                {parseFloat(result.ectomorph).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <Typography variant="h6" gutterBottom>
                {translate('resources.result.fields.endoFactor')}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                {parseFloat(result.endoFactor).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <Typography variant="h6" gutterBottom>
                {translate('resources.result.fields.endomorph')}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                {parseFloat(result.endomorph).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <Typography variant="h6" gutterBottom>
                {translate('resources.result.fields.fatWeight')}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                {parseFloat(result.fatWeight).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <Typography variant="h6" gutterBottom>
                {translate(
                  'resources.result.fields.faulknerFatPercentage'
                )}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                {parseFloat(result.faulknerFatPercentage).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <Typography variant="h6" gutterBottom>
                {translate('resources.result.fields.freeFatWeight')}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                {parseFloat(result.freeFatWeight).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <Typography variant="h6" gutterBottom>
                {translate('resources.result.fields.iaks')}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                {parseFloat(result.iaks).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <Typography variant="h6" gutterBottom>
                {translate('resources.result.fields.imc')}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                {parseFloat(result.imc).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <Typography variant="h6" gutterBottom>
                {translate('resources.result.fields.mesomorph')}
              </Typography>
              <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                {parseFloat(result.mesomorph).toFixed(2)}
              </Box>
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <Typography variant="h6" gutterBottom>
                {translate(
                  'resources.result.fields.parizcovaFatPercentage'
                )}
              </Typography>{' '}
              {parseFloat(result.parizcovaFatPercentage).toFixed(2)}
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <Typography variant="h6" gutterBottom>
                {translate('resources.result.fields.ponderalIndex')}
              </Typography>{' '}
              {parseFloat(result.ponderalIndex).toFixed(2)}
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <Typography variant="h6" gutterBottom>
                {translate('resources.result.fields.raizPT')}
              </Typography>{' '}
              {parseFloat(result.raizPT).toFixed(2)}
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <Typography variant="h6" gutterBottom>
                {translate('resources.result.fields.residualWeight')}
              </Typography>{' '}
              {parseFloat(result.residualWeight).toFixed(2)}
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <Typography variant="h6" gutterBottom>
                {translate('resources.result.fields.resultX')}
              </Typography>{' '}
              {parseFloat(result.resultX).toFixed(2)}
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <Typography variant="h6" gutterBottom>
                {translate('resources.result.fields.resultY')}
              </Typography>{' '}
              {parseFloat(result.resultY).toFixed(2)}
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <Typography variant="h6" gutterBottom>
                {translate('resources.result.fields.sumOfPlgs')}
              </Typography>{' '}
              {parseFloat(result.sumOfPlgs).toFixed(2)}
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <Typography variant="h6" gutterBottom>
                {translate(
                  'resources.result.fields.sumaPlieguesEndo'
                )}
              </Typography>{' '}
              {parseFloat(result.sumaPlieguesEndo).toFixed(2)}
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
              <Typography variant="h6" gutterBottom>
                {translate(
                  'resources.result.fields.yhaszFatPercentage'
                )}
              </Typography>{' '}
              {parseFloat(result.yhaszFatPercentage).toFixed(2)}
            </Box>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            {translate('resources.result.body_type')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ maxWidth: 500 }}>
            <PolarChart
              x={[
                translate('resources.result.fields.ectomorph'),
                translate('resources.result.fields.endomorph'),
                translate('resources.result.fields.mesomorph'),
              ]}
              y={[
                result.ectomorph,
                result.endomorph,
                result.mesomorph,
              ]}
              title={translate('resources.result.body_type')}
            />
          </Box>
          <Box sx={{ maxWidth: 500 }}>
            <ScatterChart
              labels={[
                translate('resources.result.x_y_actual'),
                translate('resources.result.x_y_referenced'),
              ]}
              points={[
                { x: result.resultX, y: result.resultY },
                {
                  x: referecedSomatotype.x,
                  y: referecedSomatotype.y,
                },
              ]}
              title={translate('resources.result.x_y_compairson')}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            {translate('resources.result.fat_percentages')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ maxWidth: 500 }}>
            <BarChart
              x={[
                translate(
                  'resources.result.fields.yhaszFatPercentage'
                ),
                translate(
                  'resources.result.fields.faulknerFatPercentage'
                ),
                translate(
                  'resources.result.fields.parizcovaFatPercentage'
                ),
              ]}
              y={[
                result.yhaszFatPercentage,
                result.faulknerFatPercentage,
                result.parizcovaFatPercentage,
              ]}
              title={translate('resources.result.fat_percentages')}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            {translate('resources.result.imc_analysis')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ maxWidth: 500 }}>
            <BarChart
              x={[
                translate('resources.result.fields.desiredIMC'),
                translate('resources.result.fields.imc'),
              ]}
              y={[result.desiredIMC, result.imc]}
              title={translate('resources.result.imc_analysis')}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            {translate('resources.result.historic')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {user && <ResultsChart user={user.data} />}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
