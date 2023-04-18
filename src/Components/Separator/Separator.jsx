import React from "react";
import { Box } from "@mui/material";

const Separator = React.memo(() => (
  <Box
    role="separator"
    aria-hidden="true"
    data-testid="separator"
    sx={{
      pt: "1em",
    }}
  />
));

Separator.displayName = "Separator";

export { Separator };
