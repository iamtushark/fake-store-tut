import React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";

const CommonCircularProgress: React.FC<CircularProgressProps> = ({}) => (
  <CircularProgress size={24} color="inherit" />
);

export default CommonCircularProgress;
