import React from "react";
import classes from "./FormSections.module.scss";
import { Test } from "@examsystem/common";

interface IEmailDeliveryProps {
  test?: Test;
  onTestChange: (test: Test) => void;
}

export const EmailDelivery: React.FC<IEmailDeliveryProps> = ({}) => {
  return (
    <section className={classes.section}>
      <header>Email Delivery Upon Test Completion</header>
    </section>
  );
};
