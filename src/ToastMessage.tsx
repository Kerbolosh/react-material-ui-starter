import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { ComponentProps, useCallback, useState } from "react";

export function ToastMessage({
  message,
  severity,
  elevation,
  action,
}: {
  message: string | Error;
  severity: Exclude<ComponentProps<typeof MuiAlert>["severity"], undefined>;
  elevation?: number;
  action?: Exclude<ComponentProps<typeof MuiAlert>["action"], undefined>;
}) {
  const [isOpen, setIsOpen] = useState(!!message);
  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert
        elevation={elevation ?? 6}
        variant="filled"
        severity={severity ?? "error"}
        onClose={handleClose}
        action={action}
      >
        {typeof message === "string" ? message : message.message}
      </MuiAlert>
    </Snackbar>
  );
}
