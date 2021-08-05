import React from "react";
import "./Letter.css";
import { useEffect, useState } from "react";

const Letter = (props) => {
  const letter = props.letter || "A";
  const upDownTime = 200;
  const offset = props.offset || 0;
  const completeTime = props.time || 8000;
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const interval = setInterval(
      (function upDown() {
        setTimeout(() => {
          setToggle(true);
        }, upDownTime * offset);
        setTimeout(() => {
          setToggle(false);
        }, upDownTime * (offset + 2));
        return upDown;
      })(),
      completeTime
    );

    return () => clearInterval(interval);
  }, []);
  return (
    <span className="container">
      <h1 className={`${toggle ? "toggled" : ""} container`}>{letter}</h1>
    </span>
  );
};

export default Letter;
