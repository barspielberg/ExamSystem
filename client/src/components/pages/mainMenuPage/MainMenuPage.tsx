import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { FieldOfStudy } from "../../../../../common/models";
import { RootState } from "../../../redux/reducers/mainReducer";
import Header from "../../uiElements/Header/Header";
import classes from "./MainMenuPage.module.scss";

interface IMainMenuPageProps {
  organizationName: string | undefined;
  fields: FieldOfStudy[] | undefined;
}

const MainMenuPage: React.FC<IMainMenuPageProps> = ({
  organizationName,
  fields,
}) => {
  const [fieldId, setFieldId] = useState("");
  const history = useHistory();

  const navigationHandler = (path: string) => {
    history.push(`${path}/${fieldId}`);
  };

  return (
    <div className={classes.main}>
      <Header>Administration System - {organizationName} </Header>
      <b> Main Menu </b>
      <section>
        <p>
          Choose a field of study:{" "}
          <select
            className={classes.clickable}
            value={fieldId}
            onChange={(e) => setFieldId(e.target.value)}
          >
            <option value="">please choose field of study</option>
            {fields?.map((f) => (
              <option key={f.id} value={f.id}>
                {f.title}
              </option>
            ))}
          </select>
        </p>
        <p
          className={classes.clickable}
          onClick={() => navigationHandler("/ManageQuestions")}
        >
          Manage Questions »{" "}
        </p>
        <p
          className={classes.clickable}
          onClick={() => navigationHandler("/ManageTests")}
        >
          Manage Tests »{" "}
        </p>
        <p
          className={classes.clickable}
          onClick={() => navigationHandler("/TestReport")}
        >
          Reports »{" "}
        </p>
      </section>
    </div>
  );
};

const mapState2Props = (state: RootState) => ({
  organizationName: state.organization.organization?.name,
  fields: state.organization.organization?.fields,
});

export default connect(mapState2Props)(MainMenuPage);
