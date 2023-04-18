import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useLogin, useNotify, useTranslate } from 'react-admin';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  CardMedia,
  Button,
} from '@mui/material';
import logo from '../logo.jpg';

const LoginPage = ({ theme }) => {
  const login = useLogin();
  const notify = useNotify();
  const translate = useTranslate();

  const handleLogin = useCallback(() => {
    login().catch(() => notify('Invalid email or password'));
  }, [login, notify]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      flexDirection="column"
      style={{ minHeight: '100vh', paddingTop: '8%' }}
    >
      <Grid item xs={3}>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            style={{ textAlign: 'center' }}
            title={translate('myroot.welcomelogin')}
          />
          <CardMedia component="img" image={logo} alt="Paella dish" />
          <CardContent>
            <Button onClick={handleLogin} variant="contained">
              {translate('myroot.login')}
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

LoginPage.propTypes = {
  theme: PropTypes.object,
};

export default LoginPage;
