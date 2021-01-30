import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { FieldOfStudy, Organization } from "@examsystem/common";
import { RootState } from "../../../redux/reducers/mainReducer";
import { Header, PopupMessage } from "../../uiElements";
import classes from "./MainMenuPage.module.scss";
import { useEffect } from "react";
import { SelectFields, SelectOrganization } from "./Selects";

interface IMainMenuPageProps {
  organizations: Organization[] | undefined;
}

const MainMenuPage: React.FC<IMainMenuPageProps> = ({ organizations }) => {
  const [organization, setOrganization] = useState<Organization>();
  const [field, setField] = useState<FieldOfStudy>();
  const [errMsg, setErrMsg] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (organizations && organizations.length > 0)
      setOrganization(organizations[0]);
  }, [organizations, setOrganization]);

  useEffect(() => {
    if (organization && organization.fields.length > 0)
      setField(organization.fields[0]);
  }, [organization, setField]);

  const navigationHandler = (path: string) => {
    if (organization && field)
      history.push(
        `${path}/?organizationId=${organization.id}&fieldId=${field.id}`
      );
    else setErrMsg(true);
  };

  return (
    <div className={classes.main}>
      <Header>
        Administration System {organization ? `- ${organization.name}` : ""}
      </Header>

      {organizations && organizations.length > 1 && (
        <h4>
          You have more than one organization associated to you, please choose
          one:{" "}
          <SelectOrganization
            organizations={organizations}
            onChange={setOrganization}
          />
        </h4>
      )}
      <b> Main Menu </b>
      <section>
        {organization && organization?.fields.length > 1 ? (
          <p>
            Choose a field of study:{" "}
            <SelectFields fields={organization?.fields} onChange={setField} />
          </p>
        ) : (
          <p>
            Field of study:{" "}
            {organization?.fields[0].title || "No fields in this organization"}
          </p>
        )}
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
          onClick={() => navigationHandler("/Reports")}
        >
          Reports »{" "}
        </p>
      </section>
      <PopupMessage
        title="Please choose field of study"
        text="Before you continue you need to choose field of study"
        show={errMsg}
        clear={() => setErrMsg(false)}
      />
    </div>
  );
};

const mapState2Props = (state: RootState) => ({
  organizations: state.admin.admin?.organizations,
});

export default connect(mapState2Props)(MainMenuPage);
