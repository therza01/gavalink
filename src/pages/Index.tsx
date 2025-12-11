import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { ActiveCallScreen } from "@/components/ActiveCallScreen";

const Index = () => {
  const [isInCall, setIsInCall] = useState(false);

  const handleStartCall = () => {
    setIsInCall(true);
  };

  const handleEndCall = () => {
    setIsInCall(false);
  };

  return (
    <main className="min-h-screen">
      {isInCall ? (
        <ActiveCallScreen onEndCall={handleEndCall} />
      ) : (
        <WelcomeScreen onStartCall={handleStartCall} />
      )}
    </main>
  );
};

export default Index;
