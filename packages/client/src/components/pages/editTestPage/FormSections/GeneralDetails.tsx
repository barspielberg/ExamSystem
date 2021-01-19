import React from "react";
import classes from "./FormSections.module.scss";
import { Language, Test } from "@examsystem/common";

interface IGeneralDetailsProps {
  test: Test;
  fieldTitle?: string;
  onTestChange: (test: Test) => void;
}

export const GeneralDetails: React.FC<IGeneralDetailsProps> = ({
  test,
  onTestChange,
  fieldTitle,
}) => {
  return (
    <section className={classes.section}>
      <header>General Test Details</header>
      <div className={classes.inputs}>
        <label>Field of study:</label>
        <b>{fieldTitle}</b>
        <label htmlFor="language_select">Language:</label>
        <select
          id="language_select"
          value={test?.lang}
          onChange={(e) => onTestChange({ ...test, lang: +e.target.value })}
        >
          <option value={Language.english}>English</option>
          <option value={Language.hebrew}>Hebrew</option>
        </select>
        <label htmlFor="garde_input">Passing Grade:</label>
        <input
          id="garde_input"
          type="number"
          min={0}
          max={100}
          value={test.passingGrade}
          onChange={(e) =>
            onTestChange({ ...test, passingGrade: +e.target.value })
          }
        />
        <label htmlFor="show_checkbox">
          Show Correct Answers After Submission
        </label>
        <div>
          <input
            id="show_checkbox"
            type="checkbox"
            value={`${test.reviewAnswers}`}
            onChange={(e) =>
              onTestChange({
                ...test,
                reviewAnswers: e.target.checked,
              })
            }
          />
          <label htmlFor="show_checkbox"> Show</label>
        </div>
        <label htmlFor="title_textarea">Title:</label>
        <textarea
          id="title_textarea"
          dir={test.lang ? "ltr" : "rtl"}
          rows={1}
          value={test.title}
          onChange={(e) => onTestChange({ ...test, title: e.target.value })}
        />
        <label htmlFor="introduction_textarea">Introduction:</label>
        <textarea
          id="introduction_textarea"
          dir={test.lang ? "ltr" : "rtl"}
          value={test.introduction}
          onChange={(e) =>
            onTestChange({ ...test, introduction: e.target.value })
          }
        />
        <label htmlFor="successmessage_textarea">SuccessMessage:</label>
        <textarea
          id="successmessage_textarea"
          dir={test.lang ? "ltr" : "rtl"}
          value={test.successMessage}
          onChange={(e) =>
            onTestChange({ ...test, successMessage: e.target.value })
          }
        />
        <label htmlFor="failmessage_textarea">FailMessage:</label>
        <textarea
          id="failmessage_textarea"
          dir={test.lang ? "ltr" : "rtl"}
          value={test.failMessage}
          onChange={(e) =>
            onTestChange({ ...test, failMessage: e.target.value })
          }
        />
      </div>
    </section>
  );
};
