import { useTranslate, CreateButton } from "react-admin";
import { Typography, Box } from "@mui/material";
export const Empty = () => {
  const translate = useTranslate();
  return (
    <Box textAlign="center" m={1} border={1} borderColor="lightgrey">
      <Typography variant="h6" paragraph>
        {translate("myroot.empty")}
      </Typography>
      <CreateButton />
    </Box>
  );
};
