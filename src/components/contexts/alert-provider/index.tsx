"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { AlertContextType, AlertPropsType, AlertSeverityType } from "./types";

const AlertContext = createContext<AlertContextType | undefined>(undefined);
interface AlertProviderProps {
  children: ReactNode;
}

const alertDefaults: AlertPropsType = {
  open: false,
  severity: "info",
  message: "",
};

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alert, setAlert] = useState<AlertPropsType>({ ...alertDefaults });

  const showAlert = (severity: AlertSeverityType, message: string) => {
    setAlert({ open: true, severity, message });
  };

  const closeAlert = () => {
    setAlert({ ...alertDefaults });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={alert.open}
        autoHideDuration={5000}
        onClose={closeAlert}
      >
        <Alert severity={alert.severity} variant="filled" onClose={closeAlert}>
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

/**
 * custom hook for consuming the context
 * example usage:
 * const ExampleComponent = () => {
 *   const { showAlert } = useAlert();
 *
 *   return (
 *    <Button
 *      onClick={() =>
 *        showAlert("warning", "This Alert displays the default close icon.")
 *      }
 *    >
 *      Show Warning Alert
 *    </Button>
 *   )
 * }
 * @returns React.context
 */
export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
