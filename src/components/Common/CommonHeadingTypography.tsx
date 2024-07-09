import React from "react";
import { Typography, TypographyProps } from "@mui/material";

interface CommonTypographyProps extends TypographyProps {}

const CommonHeadingTypography: React.FC<CommonTypographyProps> = ({
  children,
  ...props
}) => {
  return (
    <Typography {...props} variant="h4" gutterBottom sx={{ color: "black" }}>
      {children}
    </Typography>
  );
};

export default CommonHeadingTypography;
