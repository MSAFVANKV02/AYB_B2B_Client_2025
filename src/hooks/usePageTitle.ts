import { useEffect } from 'react';

// Custom hook for changing the page title
const usePageTitle = (title: string) => {
  useEffect(() => {
    // Set the document title to the passed title
    document.title = title;

    // Cleanup function to reset the title when the component unmounts or title changes
    return () => {
      document.title = 'My App'; // Default title (change this to your app name)
    };
  }, [title]); // Run this effect whenever the title changes
};

export default usePageTitle;
