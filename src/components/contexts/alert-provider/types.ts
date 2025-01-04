export type AlertSeverityType = "info" | "warning" | "success" | "error";

export interface AlertPropsType {
  open: boolean;
  severity: AlertSeverityType;
  message: string;
}

export interface AlertContextType {
  showAlert: (
    severity: AlertPropsType["severity"],
    message: string,
    action?: React.ReactNode
  ) => void;
}
