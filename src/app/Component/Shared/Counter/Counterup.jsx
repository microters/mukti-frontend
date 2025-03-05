"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const Counterup = ({ target, title, description }) => {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start({ opacity: 1, y: 0 });
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls]);

  return (
    <div
      ref={ref}
      className="relative before:w-[calc(100%-20px)] before:h-[calc(100%-20px)] before:border before:border-M-primary-color/50 before:absolute before:left-0 before:top-0 before:rounded-2xl before:z-0"
    >
      <motion.div
        className="px-6 py-8 relative z-10 shadow-md rounded-2xl text-center mt-5 ml-5 bg-white"
        initial={{ opacity: 0, y: 30 }}
        animate={controls}
        transition={{ duration: 0.6 }}
      >
        {isVisible && <AnimatedCounter target={target} />}
        <h3 className="text-xl mb-1 capitalize">{title}</h3>
        <p className="font-jost">{description}</p>
      </motion.div>
    </div>
  );
};

export default Counterup;

// Counter Animation Component
function AnimatedCounter({ target }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // Animation duration in ms
    const increment = target / (duration / 16); // Adjust based on frame rate

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return <h4 className="text-4xl md:text-7xl mb-3">{count}+</h4>;
}
