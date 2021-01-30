import React from "react";

interface IStepperProps {
  current: number;
  max: number;
  steps: step[];
  moveTo: (index: number) => void;
}

const Stepper: React.FC<IStepperProps> = ({}) => {
  return <div>Stepper Worked!</div>;
};

export default Stepper;

type step = {
  index: number;
  ok: boolean;
};
