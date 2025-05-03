import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom hook for handling navigation clicks
const useNavigateClicks = () => {
  // console.log('clicks components');
  
  const router = useNavigate();

  // const handleClick = useCallback((redirect: string) => {
  //   router(redirect,{replace: true});
  // }, [router]);
  const handleClick = useCallback((redirect: string, isNewTab?: boolean) => {
    if (isNewTab) {
      window.open(redirect, "_blank", "noopener,noreferrer");
    } else {
      router(redirect, { replace: true });
    }
  }, [router]);

  return {
    handleClick,
  };
};

export default useNavigateClicks;
