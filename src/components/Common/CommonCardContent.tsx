import React from "react";
import { CardContent, CardContentProps } from "@mui/material";

interface CommonCardContentProps extends CardContentProps {}

const CommonCardContent: React.FC<CommonCardContentProps> = ({
  children,
  ...props
}) => {
  return <CardContent {...props}>{children}</CardContent>;
};

export default CommonCardContent;
