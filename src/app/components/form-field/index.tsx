import { FormControl, FormLabel, TextField } from "@mui/material";
import React from "react";

interface FormFieldTypes {
  name: string;
  placeholder: string;
  type: string;
  id: string;
  label: string;
  errorMsg: string;
  value: string;
  changeHandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  autoComplete?: string;
}

const FormField: React.FC<FormFieldTypes> = ({
  name,
  placeholder,
  type,
  id,
  autoComplete,
  label,
  errorMsg,
  value,
  changeHandler,
}) => {
  return (
    <FormControl>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <TextField
        required
        fullWidth
        name={name}
        placeholder={placeholder}
        type={type}
        id={id}
        autoComplete={autoComplete}
        variant="outlined"
        error={!!errorMsg}
        helperText={errorMsg}
        color={errorMsg ? "error" : "primary"}
        value={value}
        onChange={changeHandler}
      />
    </FormControl>
  );
};

export default FormField;
