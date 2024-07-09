import React from "react";
import { Typography, TypographyProps } from "@mui/material";

interface CommonTypographyProps extends TypographyProps {}

const CommonErrorTypography: React.FC<CommonTypographyProps> = ({
  children,
  ...props
}) => {
  return (
    <Typography {...props} color="error">
      {children}
    </Typography>
  );
};

export default CommonErrorTypography;
