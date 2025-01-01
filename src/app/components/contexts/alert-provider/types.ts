export type AlertSeverityType = "info" | "warning" | "success" | "error";

export interface AlertPropsType {
  open: boolean;
  severity: AlertSeverityType;
  message: string;
}
