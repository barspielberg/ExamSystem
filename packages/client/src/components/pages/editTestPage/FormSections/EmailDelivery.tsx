import React from "react";
import classes from "./FormSections.module.scss";
import { Test } from "@examsystem/common";

interface IEmailDeliveryProps {
  test: Test;
  onTestChange: (test: Test) => void;
}

export const EmailDelivery: React.FC<IEmailDeliveryProps> = ({
  test,
  onTestChange,
}) => {
  return (
    <section className={classes.section}>
      <header>Email Delivery Upon Test Completion</header>
      <div className={classes.inputs}>
        <label htmlFor="sendFrom_input">From:</label>
        <input
          id="sendFrom_input"
          type="text"
          value={test.testerEmail}
          onChange={(e) =>
            onTestChange({ ...test, testerEmail: e.target.value })
          }
        />
        <h4>Passing the Test Email</h4>
        <label htmlFor="successEmaiSubject_input">Subject:</label>
        <input
          id="successEmaiSubject_input"
          type="text"
          value={test.successEmail?.subject}
          onChange={(e) =>
            onTestChange({
              ...test,
              successEmail: {
                subject: e.target.value,
                body: test.successEmail?.body || "",
              },
            })
          }
        />
        <label htmlFor="successEmailBody_textarea">Body:</label>
        <textarea
          id="successEmailBody_textarea"
          rows={5}
          value={test.successEmail?.body}
          onChange={(e) =>
            onTestChange({
              ...test,
              successEmail: {
                subject: test.successEmail?.subject || "",
                body: e.target.value,
              },
            })
          }
        />

        <div
          className={classes.tampInfo}
          onClick={() =>
            onTestChange({
              ...test,
              successEmail: {
                subject: test.successEmail?.subject || "",
                body: successDefault,
              },
            })
          }
        >
          <b>Click here to insrt predefined template</b>
          <br />
          @TestName@, @FirstName@, @LastName@, @Date@, @Grade@, @Certificate@
        </div>

        <h4>Failling the Test Email</h4>
        <label htmlFor="failEmaiSubject_input">Subject:</label>
        <input
          id="failEmaiSubject_input"
          type="text"
          value={test.failEmail?.subject}
          onChange={(e) =>
            onTestChange({
              ...test,
              failEmail: {
                subject: e.target.value,
                body: test.failEmail?.body || "",
              },
            })
          }
        />
        <label htmlFor="failEmailBody_textarea">Body:</label>
        <textarea
          id="failEmailBody_textarea"
          rows={5}
          value={test.failEmail?.body}
          onChange={(e) =>
            onTestChange({
              ...test,
              failEmail: {
                subject: test.failEmail?.subject || "",
                body: e.target.value,
              },
            })
          }
        />

        <div
          className={classes.tampInfo}
          onClick={() =>
            onTestChange({
              ...test,
              failEmail: {
                subject: test.failEmail?.subject || "",
                body: failDefault,
              },
            })
          }
        >
          <b>Click here to insrt predefined template</b>
          <br />
          @TestName@, @FirstName@, @LastName@, @Date@, @Grade@
        </div>
      </div>
    </section>
  );
};

const successDefault = `Hell ya! 
@FirstName@ @LastName@, 
On the @Date@
you successfully passed the "@TestName@" exam with a grade of @Grade@.
Your certificat is here: @Certificate@`;

const failDefault = `Dear @FirstName@ @LastName@, 
We are sorry to inform you that you received @Grade@ in the "@TestName@" exam you took on the @Date@ and this is not a passing grade.`;
