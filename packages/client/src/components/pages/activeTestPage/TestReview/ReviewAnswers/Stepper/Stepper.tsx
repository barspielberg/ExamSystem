import classes from "./Stepper.module.scss";
import React from "react";
import { Button } from "../../../../../uiElements";

interface IStepperProps {
  current: number;
  max: number;
  steps: step[];
  moveTo: (index: number) => void;
}

const Stepper: React.FC<IStepperProps> = ({ current, max, moveTo, steps }) => {
  return (
    <div>
      <div className={classes.btns}>
        <Button disabled={current <= 0} onClick={() => moveTo(current - 1)}>
          « Previous
        </Button>
        <Button disabled={current >= max} onClick={() => moveTo(current + 1)}>
          Next »
        </Button>
      </div>
      <div className={classes.steps}>
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
      </div>
    </div>
  );
};

export default Stepper;

type step = {
  index: number;
  ok: boolean;
};
