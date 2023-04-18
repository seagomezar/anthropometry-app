import { useTranslate, CreateButton } from "react-admin";
import { Typography, Box } from "@mui/material";

export const Empty = () => {
  const translate = useTranslate();
  return (
    <Box
      textAlign="center"
      m={1}
      border={1}
      borderColor="lightgrey"
      role="region"
      aria-labelledby="empty-region-label"
    >
      <Typography variant="h6" paragraph id="empty-region-label">
        {translate("myroot.empty")}
      </Typography>
      <CreateButton />
    </Box>
  );
};
