"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { AlertPropsType, AlertSeverityType } from "./types";

// Define the context value type
interface AlertContextType {
  showAlert: (
    severity: AlertPropsType["severity"],
    message: string,
    action?: React.ReactNode
  ) => void;
}

interface AlertProviderProps {
  children: ReactNode;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

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
      <Snackbar open={alert.open} autoHideDuration={5000} onClose={closeAlert}>
        <Alert severity={alert.severity} onClose={closeAlert}>
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
