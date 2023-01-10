import React from "react";
import {
  ReferenceField,
  NumberField,
  useTranslate,
  Show,
  SimpleShowLayout,
} from "react-admin";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TimeField } from "../TimeField";

export const PrescribedFoodShow = () => {
  const translate = useTranslate();
  return (
    <Show>
      <SimpleShowLayout sx={{ maxWidth: 500 }}>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.prescribed_food.fields.plan_id")}
            </Typography>
            <ReferenceField source="plan_id" reference="plan" fullWidth />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.prescribed_food.fields.food_id")}
            </Typography>
            <ReferenceField source="food_id" reference="food" fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.prescribed_food.fields.eating_moment_time")}
            </Typography>
            <TimeField source="eating_moment_time" />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.prescribed_food.fields.eating_moment_name")}
            </Typography>
            <ReferenceField
              source="eating_moment_name"
              reference="eating_moment"
              fullWidth
            />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate(
                "resources.prescribed_food.fields.prescribed_quantity"
              )}
            </Typography>
            <NumberField source="prescribed_quantity" fullWidth />
          </Box>
        </Box>
      </SimpleShowLayout>
    </Show>
  );
};
