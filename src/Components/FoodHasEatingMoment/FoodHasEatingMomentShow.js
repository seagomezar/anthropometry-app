import React from "react";
import {
  ReferenceField,
  useTranslate,
  Show,
  SimpleShowLayout,
} from "react-admin";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const FoodHasEatingMomentShow = () => {
  const translate = useTranslate();
  return (
    <Show>
      <SimpleShowLayout sx={{ maxWidth: 500 }}>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate(
                "resources.food_has_eating_moment.fields.eating_moment_id"
              )}
            </Typography>
            <ReferenceField
              source="eating_moment_id"
              reference="eating_moment"
            />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.food_has_eating_moment.fields.food_id")}
            </Typography>
            <ReferenceField source="food_id" reference="food" fullWidth />
          </Box>
        </Box>
      </SimpleShowLayout>
    </Show>
  );
};
