// src/components/ScrollToHashElement.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToHashElement() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // if no hash, scroll to top when navigating
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return null; // this component does not render anything
}