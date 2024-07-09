import React from "react";
import { Card, CardProps } from "@mui/material";

interface CommonCardProps extends CardProps {}

const CommonCard: React.FC<CommonCardProps> = ({ children, ...props }) => {
  return (
    <Card
      {...props}
      sx={{
        maxWidth: 800,
        margin: "auto",
        marginTop: 2,
        padding: 2,
        marginBottom: 4,
        backgroundColor: "white",
        color: "black",
        ...props.sx,
      }}
    >
      {children}
    </Card>
  );
};

export default CommonCard;
