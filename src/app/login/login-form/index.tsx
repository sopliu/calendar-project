"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { SignInContainer, SignInCard } from "./styles";
import { signIn } from "@/lib/firebase/auth";
import FormField from "@/components/form-field";
import { useAlert } from "@/components/contexts/alert-provider";
import { signInFieldsType } from "./types";

const emptySignInFields = {
  email: "",
  password: "",
  isPersistent: false,
};

export default function LoginForm() {
  const { showAlert } = useAlert();
  const [values, setValues] = useState<signInFieldsType>({
    ...emptySignInFields,
  });
  const [errorMessages, setErrorMessages] = useState<signInFieldsType>({
    ...emptySignInFields,
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof signInFieldsType
  ) => {
    const valuesCopy = { ...values };
    if (fieldName === "isPersistent") {
      valuesCopy[fieldName] = (e.target as HTMLInputElement).checked;
    } else {
      valuesCopy[fieldName] = e.target.value;
    }
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

    setErrorMessages(copyError);

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputs()) return;
    signIn(values.email, values.password, values.isPersistent, (msg: string) =>
      showAlert("warning", msg)
    );
  };

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <SignInCard variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
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
          <FormControlLabel
            control={<Checkbox value="isPersistent" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
          >
            Sign in
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" variant="body2" sx={{ alignSelf: "center" }}>
              Sign up
            </Link>
          </Typography>
        </Box>
      </SignInCard>
    </SignInContainer>
  );
}
