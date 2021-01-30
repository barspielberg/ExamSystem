import classes from "./Stepper.module.scss";
import React from "react";
import { Button } from "../../../../uiElements";

interface IStepperProps {
  current: number;
  max: number;
  steps: step[];
  moveTo: (index: number) => void;
}

const Stepper: React.FC<IStepperProps> = ({ moveTo, current, max, steps }) => {
  return (
    <div className={classes.steps}>
      <Button disabled={current <= 0} onClick={() => moveTo(current - 1)}>
        « Previous
      </Button>
      {steps.map((s) => (
        <div
          onClick={() => moveTo(s.index)}
          key={s.index}
          className={[
            classes.step,
            current === s.index ? classes.current : "",
            s.ok ? classes.ok : "",
          ].join(" ")}
        >
          {s.index + 1}
        </div>
      ))}
      <Button disabled={current >= max} onClick={() => moveTo(current + 1)}>
        Next »
      </Button>
    </div>
  );
};

export default Stepper;

export type step = {
  index: number;
  ok: boolean;
};
