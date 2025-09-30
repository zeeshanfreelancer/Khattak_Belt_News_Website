import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useIntersectionObserver() {
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show-items");
        } else {
          entry.target.classList.remove("show-items");
        }
      });
    });

    const scrollScale = document.querySelectorAll(".scroll-scale");
    const scrollBottom = document.querySelectorAll(".scroll-bottom");
    const scrollTop = document.querySelectorAll(".scroll-top");

    scrollScale.forEach((el) => observer.observe(el));
    scrollBottom.forEach((el) => observer.observe(el));
    scrollTop.forEach((el) => observer.observe(el));

    return () => {
      scrollScale.forEach((el) => observer.unobserve(el));
      scrollBottom.forEach((el) => observer.unobserve(el));
      scrollTop.forEach((el) => observer.unobserve(el));
    };
  }, [location.pathname]); // re-run on route change
}