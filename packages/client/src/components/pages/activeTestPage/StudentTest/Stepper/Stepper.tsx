import React from "react";
import { Button } from "../../../../uiElements";

interface IStepperProps {
  current: number;
  max: number;
  moveTo: (index: number) => void;
}

const Stepper: React.FC<IStepperProps> = ({ moveTo, current, max }) => {
  return (
    <div>
      <Button disabled={current <= 0} onClick={() => moveTo(current - 1)}>
        « Previous
      </Button>
      <Button disabled={current >= max} onClick={() => moveTo(current + 1)}>
        Next »
      </Button>
    </div>
  );
};

export default Stepper;
