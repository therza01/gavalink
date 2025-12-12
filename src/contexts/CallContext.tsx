import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface CallContextType {
  isInCall: boolean;
  isConnected: boolean;
  duration: number;
  setIsInCall: (value: boolean) => void;
  setIsConnected: (value: boolean) => void;
  setDuration: (value: number) => void;
  startCall: () => void;
  endCall: () => void;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

export const CallProvider = ({ children }: { children: ReactNode }) => {
  const [isInCall, setIsInCall] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [duration, setDuration] = useState(0);

  const startCall = useCallback(() => {
    setIsInCall(true);
  }, []);

  const endCall = useCallback(() => {
    setIsInCall(false);
    setIsConnected(false);
    setDuration(0);
  }, []);

  return (
    <CallContext.Provider
      value={{
        isInCall,
        isConnected,
        duration,
        setIsInCall,
        setIsConnected,
        setDuration,
        startCall,
        endCall,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

export const useCall = () => {
  const context = useContext(CallContext);
  if (context === undefined) {
    throw new Error("useCall must be used within a CallProvider");
  }
  return context;
};
