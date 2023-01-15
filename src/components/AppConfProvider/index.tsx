import React, { useMemo, useState } from "react";
import Message from "../Message";

interface AppConfigProps { }

export const AppConfigContext = React.createContext<AppConfigProps>({});

const AppConfigProvider = ({ children, value }: { children: React.ReactNode; value: AppConfigProps; }) => {
  const [msg, setMsg] = useState({
    info: '',
    open: false,
    type: 'success',
    switch: (open: boolean, info = '', type = 'success') => setMsg({ ...msg, info, open, type }) 
  })
  const cValue = useMemo(() => ({ ...value, msg }), [msg, value]);

  return (
    <AppConfigContext.Provider value={cValue}>
      {children}
      <Message />
    </AppConfigContext.Provider>
  );
};

export default AppConfigProvider;
