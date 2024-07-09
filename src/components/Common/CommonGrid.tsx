import React from "react";
import { Grid, GridProps } from "@mui/material";

interface CommonGridProps extends GridProps {}

const CommonGrid: React.FC<CommonGridProps> = ({ children, ...props }) => {
  return (
    <Grid {...props} sx={{ flexGrow: 1, ...props.sx }}>
      {children}
    </Grid>
  );
};

export default CommonGrid;
