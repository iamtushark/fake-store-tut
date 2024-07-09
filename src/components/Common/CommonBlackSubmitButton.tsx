import React from "react";
import { Button, CircularProgress } from "@mui/material";

interface CommonBlackSubmitButtonProps {
  loading: boolean;
  text: string;
  fullWidth?: boolean;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

const CommonBlackSubmitButton: React.FC<CommonBlackSubmitButtonProps> = ({
  loading,
  text,
  fullWidth = true,
  size = "medium",
  onClick,
}) => (
  <Button
    type="submit"
    variant="contained"
    color="primary"
    disabled={loading}
    fullWidth={fullWidth}
    size={size}
    onClick={onClick}
    sx={{
      backgroundColor: "black",
      color: "white",
      "&:hover": { backgroundColor: "gray" },
    }}
  >
    {loading ? <CircularProgress size={24} color="inherit" /> : text}
  </Button>
);

export default CommonBlackSubmitButton;
