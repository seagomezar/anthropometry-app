import { LocalesMenuButton, AppBar } from "react-admin";
import { Typography } from "@mui/material";

export const MyAppBar = (props) => (
  <AppBar {...props}>
    <Typography flex="1" variant="h6" id="react-admin-title"></Typography>
    <LocalesMenuButton />
  </AppBar>
);
