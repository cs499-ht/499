import React, { useRef, useEffect } from "react";
import "./css/HabitRing.css";
import Confetti from "react-dom-confetti";

const HabitRing = ({ completed, total }) => {
  const circleRef = useRef(null);
  let isCompleted = false;

  useEffect(() => {
    const circle = circleRef.current.querySelector(".ring-circle");
    const radius = 84;
    const circumference = radius * 2 * Math.PI;

    circle.style.strokeDasharray = `${circumference}, ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    function setProgress(percent) {
      const offset = circumference + (percent / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    }
    setProgress((completed / total) * 100);
  }, [completed, total]);
  if (completed === total) {
    isCompleted = true;
  }

  const config = {
    angle: 90,
    spread: "325",
    startVelocity: "14",
    elementCount: "137",
    dragFriction: "0.05",
    duration: "3930",
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  return (
    <div ref={circleRef}>
      <div className="right-confetti-container">
        <Confetti active={isCompleted} config={config} />
      </div>
      <div className="left-confetti-container">
        <Confetti active={isCompleted} config={config} />
      </div>
      <h4 className="habit-ring-count">
        {completed} / {total}
      </h4>
      <svg className="ring" height="200" width="200">
        <circle
          strokeWidth="18"
          stroke="#C2D6D5"
          fill="transparent"
          r="84"
          cx="100"
          cy="100"
        />
        <circle
          className="ring-circle"
          strokeWidth="18"
          stroke="#555B6E"
          fill="transparent"
          r="84"
          cx="100"
          cy="100"
        />
      </svg>
    </div>
  );
};

export default HabitRing;
