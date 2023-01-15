import { Alert, AlertColor, Snackbar, SnackbarOrigin, SnackbarProps } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { AppConfigContext } from "../AppConfProvider";

interface MessageType extends SnackbarProps {
}
export interface State extends SnackbarOrigin {
  open: boolean;
  message: string;
  type: AlertColor;
}

export default (props: MessageType) => {
  const { msg } = useContext(AppConfigContext) || ({} as any);

  const [state, setState] = React.useState<State>({
    message: msg.info,
    open: msg.open,
    vertical: 'top',
    horizontal: 'center',
    type: msg.type
  });

  useEffect(() => {
    const { open, info, type } = msg;
    setState({ ...state, open, type, message: info });
  }, [msg])

  const { vertical, horizontal, open, message, type } = state;

  const handleClose = () => {
    setState({ ...state, open: false, message: '' });
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={2000}
      key={vertical + horizontal}
      anchorOrigin={{ vertical, horizontal }}
      {...props}
    >
      <Alert className="flex items-center" onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}