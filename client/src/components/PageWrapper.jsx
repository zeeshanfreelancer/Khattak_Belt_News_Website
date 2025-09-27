// components/PageWrapper.jsx
import React from 'react';
import useIntersectionObserver from './IntersectionObserver';

export default function PageWrapper({ children }) {
  useIntersectionObserver();
  return <>{children}</>;
}
