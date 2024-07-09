import React from "react";
import { CardActions, CardActionsProps } from "@mui/material";

interface CommonCardActionsProps extends CardActionsProps {}

const CommonCardActions: React.FC<CommonCardActionsProps> = ({
  children,
  ...props
}) => {
  return <CardActions {...props}>{children}</CardActions>;
};

export default CommonCardActions;
