// in src/MyLoginPage.js
import * as React from 'react';
import { useLogin, useNotify, useTranslate } from 'react-admin';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  CardMedia,
  Button,
} from '@mui/material';
import logo from './Logo.png';

const LoginPage = ({ theme }) => {
  const login = useLogin();
  const notify = useNotify();
  const translate = useTranslate();

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
            <Button
              onClick={() => {
                login().catch(() =>
                  notify('Invalid email or password')
                );
              }}
              variant="contained"
            >
              {translate('myroot.login')}
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
