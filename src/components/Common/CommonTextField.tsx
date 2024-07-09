import React from "react";
import { TextField } from "@mui/material";
import { Controller, Control } from "react-hook-form";

interface CommonTextFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  type?: string;
  select?: boolean;
  children?: React.ReactNode;
}

const CommonTextField: React.FC<CommonTextFieldProps> = ({
  name,
  control,
  label,
  type = "text",
  select = false,
  children,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <TextField
        {...field}
        label={label}
        type={type}
        variant="outlined"
        select={select}
        error={!!error}
        helperText={error ? error.message : ""}
        fullWidth
        margin="normal"
        InputLabelProps={{
          style: { color: "black" },
        }}
        InputProps={{
          style: { color: "black" },
        }}
      >
        {children}
      </TextField>
    )}
  />
);

export default CommonTextField;
