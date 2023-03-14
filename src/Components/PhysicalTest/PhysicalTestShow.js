import React from "react";
import {
  NumberField,
  TextField,
  useTranslate,
  Show,
  SimpleShowLayout,
} from "react-admin";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const PhysicalTestShow = () => {
  const translate = useTranslate();
  return (
    <Show>
      <SimpleShowLayout sx={{ maxWidth: 600 }}>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <Typography variant="h6" gutterBottom>
              {translate("resources.physical_test.fields.position")}
            </Typography>
            <TextField source="position" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.physical_test.fields.weight")}
            </Typography>
            <NumberField source="weight" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.physical_test.fields.height")}
            </Typography>
            <NumberField source="height" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.physical_test.fields.wingspan")}
            </Typography>
            <NumberField source="wingspan" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.physical_test.fields.five_mt")}
            </Typography>
            <NumberField source="five_mt" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.physical_test.fields.ten_mt")}
            </Typography>
            <NumberField source="ten_mt" fullWidth />
          </Box>
          </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.physical_test.fields.t_test_left")}
            </Typography>
            <NumberField source="t_test_left" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <Typography variant="h6" gutterBottom>
              {translate("resources.physical_test.fields.t_test_right")}
            </Typography>
            <NumberField source="t_test_right" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.physical_test.fields.cmj")}
            </Typography>
            <NumberField source="cmj" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <Typography variant="h6" gutterBottom>
              {translate("resources.physical_test.fields.legger")}
            </Typography>
            <NumberField source="legger" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.physical_test.fields.athlete_id")}
            </Typography>
            <NumberField source="athlete_id" fullWidth />
          </Box>
        </Box>
      </SimpleShowLayout>
    </Show>
  );
};
