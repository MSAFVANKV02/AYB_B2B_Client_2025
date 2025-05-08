import { useEffect, useState, useRef } from "react";
import { ThreeDot } from "react-loading-indicators";
import { useNavigate, useLocation } from "react-router-dom";

export default function ConfirmOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  const hasRedirected = useRef(false); // Track whether the redirection has occurred

  const initialCountdown = 10; // Default countdown value
  const [countdown, setCountdown] = useState(initialCountdown);

  useEffect(() => {
    // Reset the countdown and clear localStorage on page load for new orders
    localStorage.setItem("countdown", initialCountdown.toString());
    setCountdown(initialCountdown);
    hasRedirected.current = false; // Allow the redirection to happen again
  }, [location.pathname]); // Reset when the pathname changes (new navigation to this page)

  useEffect(() => {
    // Prevent the countdown and redirection if already navigated
    if (hasRedirected.current) return;

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          hasRedirected.current = true; // Mark as redirected
          localStorage.removeItem("countdown"); // Clear countdown from localStorage
          navigate("/my-account/my-orders", { replace: true }); // Redirect to orders page
          return 0;
        }

        const updatedCountdown = prevCountdown - 1;
        localStorage.setItem("countdown", updatedCountdown.toString()); // Store countdown as string
        return updatedCountdown;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [navigate]);

  return (
    <div className="h-screen w-full bg-bg flex justify-center items-center">
      <div className="flex flex-col items-center gap-5">
        <ThreeDot color="#fcfcfc" size="medium" text="" textColor="" />
        <span className="text-white text-sm">Creating order... {countdown}s</span>
      </div>
    </div>
  );
}
