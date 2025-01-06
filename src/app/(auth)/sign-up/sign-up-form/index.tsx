"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useAlert } from "@/components/contexts/alert-provider";
import { signUpFieldsType } from "./types";
import { SignUpCard, SignUpContainer } from "./styles";
import FormField from "@/components/form-field";
import { signUpWithEmail } from "@/lib/auth";

const emptySignUpFields = {
  email: "",
  password: "",
  confirmPass: "",
  fullName: "",
};

export default function SignUpForm() {
  const { showAlert } = useAlert();
  const [values, setValues] = useState<signUpFieldsType>({
    ...emptySignUpFields,
  });
  const [errorMessages, setErrorMessages] = useState<signUpFieldsType>({
    ...emptySignUpFields,
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof signUpFieldsType
  ) => {
    const valuesCopy = { ...values };
    valuesCopy[fieldName] = e.target.value;
    setValues(valuesCopy);
  };

  const validateInputs = () => {
    let isValid = true;

    const copyError = { ...errorMessages };

    if (!values.email || !/\S+@\S+\.\S+/.test(values.email)) {
      copyError.email = "Please enter a valid email address.";
      isValid = false;
    } else {
      copyError.email = "";
    }

    if (!values.password || values.password.length < 6) {
      copyError.password = "Password must be at least 6 characters long.";
      isValid = false;
    } else {
      copyError.password = "";
    }

    if (!values.fullName || values.fullName.length < 1) {
      copyError.fullName = "Name is required.";
      isValid = false;
    } else {
      copyError.fullName = "";
    }

    if (values.password !== values.confirmPass) {
      copyError.confirmPass = "Passwords do not match.";
      isValid = false;
    } else {
      copyError.confirmPass = "";
    }

    setErrorMessages(copyError);

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputs()) return;
    signUpWithEmail(
      values.email,
      values.password,
      values.fullName,
      (msg: string) => showAlert("error", msg)
    );
  };

  return (
    <SignUpContainer direction="column" justifyContent="space-between">
      <SignUpCard variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormField
            name="name"
            autoComplete="name"
            placeholder="Jon Snow"
            type="text"
            id="name"
            label="Full name"
            errorMsg={errorMessages.fullName}
            value={values.fullName}
            changeHandler={(e) => handleFormChange(e, "fullName")}
          />
          <FormField
            name="email"
            autoComplete="email"
            placeholder="your@email.com"
            type="text"
            id="email"
            label="Email"
            errorMsg={errorMessages.email}
            value={values.email}
            changeHandler={(e) => handleFormChange(e, "email")}
          />
          <FormField
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            label="Password"
            errorMsg={errorMessages.password}
            value={values.password}
            changeHandler={(e) => handleFormChange(e, "password")}
          />
          <FormField
            name="confirm-password"
            placeholder="••••••"
            type="password"
            id="confirm-password"
            label="Confirm Password"
            errorMsg={errorMessages.confirmPass}
            value={values.confirmPass}
            changeHandler={(e) => handleFormChange(e, "confirmPass")}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
          >
            Sign up
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link href="/login" variant="body2" sx={{ alignSelf: "center" }}>
              Sign in
            </Link>
          </Typography>
        </Box>
      </SignUpCard>
    </SignUpContainer>
  );
}
