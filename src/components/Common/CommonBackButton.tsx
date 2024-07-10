import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <IconButton sx={{ml:1}}
      edge="start"
      color="inherit"
      aria-label="back"
      onClick={handleGoBack}
    >
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackButton;
