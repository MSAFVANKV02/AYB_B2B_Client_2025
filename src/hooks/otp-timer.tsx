import { useEffect, useState } from "react";

type OtpTimerProps = {
  initialTime: number; // Add this to make timer configurable
  onTimerFinish?: () => void; 
  resendOtp: () => void; 
};

const OtpTimer: React.FC<OtpTimerProps> = ({
  initialTime = 60, // Default to 60 seconds
  resendOtp,
}) => {
  const [timer, setTimer] = useState<number>(() => {
    const savedTimer = localStorage.getItem("otp-timer");
    return savedTimer ? Number(savedTimer) : initialTime;
  });

  const [isResendVisible, setIsResendVisible] = useState<boolean>(() => {
    const isFinished = localStorage.getItem("otp-finished") === "true";
    return isFinished; 
  });

  useEffect(() => {
    // Timer logic
    if (timer > 0 && !isResendVisible) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            const newTimer = prevTimer - 1;
            localStorage.setItem("otp-timer", newTimer.toString());
            return newTimer;
          } else {
            clearInterval(interval);
            setIsResendVisible(true);
            localStorage.removeItem("otp-timer");
            localStorage.setItem("otp-finished", "true");
            return 0;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer, isResendVisible]);

  useEffect(() => {
    // Ensure finished state is reflected in UI
    if (timer === 0) {
      setIsResendVisible(true);
      localStorage.setItem("otp-finished", "true");
    }
  }, [timer]);

  const handleResendOtp = () => {
    // Reset the timer and resend OTP logic
    setTimer(initialTime);
    setIsResendVisible(false);
    localStorage.setItem("otp-timer", initialTime.toString());
    localStorage.setItem("otp-finished", "false");
    resendOtp();
  };

  return (
    <>
      {isResendVisible ? (
        <p
          className="text-center text-sm hover:underline cursor-pointer text-blue-400"
          onClick={handleResendOtp}
        >
          Resend OTP
        </p>
      ) : (
        <p className="text-center text-sm text-gray-500">
          Resend in {timer} seconds
        </p>
      )}
    </>
  );
};

export default OtpTimer;
