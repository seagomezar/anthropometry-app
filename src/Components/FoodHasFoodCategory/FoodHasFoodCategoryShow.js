import React from "react";
import {
  ReferenceField,
  useTranslate,
  Show,
  SimpleShowLayout,
} from "react-admin";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const FoodHasFoodCategoryShow = () => {
  const translate = useTranslate();
  return (
    <Show>
      <SimpleShowLayout sx={{ maxWidth: 500 }}>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate(
                "resources.food_has_food_category.fields.food_category_id"
              )}
            </Typography>
            <ReferenceField
              source="food_category_id"
              reference="food_category"
              fullWidth
            />
          </Box>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Typography variant="h6" gutterBottom>
              {translate("resources.food_has_food_category.fields.food_id")}
            </Typography>
            <ReferenceField source="food_id" reference="food" fullWidth />
          </Box>
        </Box>
      </SimpleShowLayout>
    </Show>
  );
};
