import React from "react";
import { Box, BoxProps } from "@mui/material";

interface CommonBoxProps extends BoxProps {}

const CommonBox: React.FC<CommonBoxProps> = ({ children, ...props }) => {
  return (
    <Box
      {...props}
      padding={2}
      sx={{
        minHeight: "90vh",
        backgroundColor: "#f0f0f0",
        alignItems: "center",
        display : "flex",
        justifyContent : "center",
        ...props.sx,
        // alignContent : "center",
      }}
    >
      {children}
    </Box>
  );
};

export default CommonBox;
