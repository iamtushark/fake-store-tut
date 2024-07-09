import React from "react";
import { Typography, TypographyProps } from "@mui/material";

interface CommonTypographyProps extends TypographyProps {}

const CommonTypography: React.FC<CommonTypographyProps> = ({
  children,
  ...props
}) => {
  return (
    <Typography {...props} sx={{ color: "black", ...props.sx }}>
      {children}
    </Typography>
  );
};

export default CommonTypography;
