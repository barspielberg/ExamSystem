import React from "react";
import classes from "./Stepper.module.scss";

interface IStepperProps {
  onChange: (num: number) => void;
  value: number;
}

const Stepper: React.FC<IStepperProps> = ({ onChange, value }) => {
  return (
    <div className={classes.stepper}>
      <div
        className={classes.step}
        aria-selected={value === 0}
        onClick={() => onChange(0)}
      >
        General Details
      </div>
      <div className={classes.line}>
        <span />
      </div>
      <div
        className={classes.step}
        aria-selected={value === 1}
        onClick={() => onChange(1)}
      >
        Email Delivery
      </div>
      <div className={classes.line}>
        <span />
      </div>
      <div
        className={classes.step}
        aria-selected={value === 2}
        onClick={() => onChange(2)}
      >
        Questions
      </div>
    </div>
  );
};

export default Stepper;
