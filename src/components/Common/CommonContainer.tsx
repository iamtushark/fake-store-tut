import React from "react";
import { Container, ContainerProps } from "@mui/material";

interface CommonContainerProps extends ContainerProps {}

const CommonContainer: React.FC<CommonContainerProps> = ({
  children,
  ...props
}) => {
  return (
    <Container
      {...props}
      // maxWidth="lg" // Limiting the container's width to the viewport size
      sx={{
        backgroundColor: "#f0f0f0",
        padding: 0, // Reset padding
        margin: 0, // Reset margin

        width: "100%",
        ...props.sx,
      }}
    >
      {children}
    </Container>
  );
};

export default CommonContainer;
