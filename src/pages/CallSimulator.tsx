import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { ActiveCallScreen } from "@/components/ActiveCallScreen";

const CallSimulator = () => {
  const navigate = useNavigate();
  const [isCallActive, setIsCallActive] = useState(false);

  const handleStartCall = () => {
    setIsCallActive(true);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    // Optionally navigate back to dashboard after ending call
    navigate("/citizen");
  };

  return (
    <div className="min-h-screen bg-background">
      {isCallActive ? (
        <ActiveCallScreen onEndCall={handleEndCall} />
      ) : (
        <WelcomeScreen onStartCall={handleStartCall} />
      )}
    </div>
  );
};

export default CallSimulator;
