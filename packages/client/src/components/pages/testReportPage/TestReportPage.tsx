import classes from "./TestReportPage.module.scss";
import { Organization } from "@examsystem/common";
import React from "react";
import { connect } from "react-redux";
import { useParams } from "../../../hooks";
import { RootState } from "../../../redux/reducers/mainReducer";

interface ITestReportPageProps {
  organizations: Organization[] | undefined;
}

const TestReportPage: React.FC<ITestReportPageProps> = ({ organizations }) => {
  const { organizationId, fieldId } = useParams();
  const field = organizations
    ?.find((o) => o.id === organizationId)
    ?.fields.find((f) => f.id === fieldId);

  return (
    <div className={classes.main}>
      <h1>
        Test Report for{" "}
        <span className={classes.fieldTitle}>{field?.title}</span>
      </h1>
      <section>
        
      </section>
    </div>
  );
};
const mapState2Props = (state: RootState) => ({
  organizations: state.admin.admin?.organizations,
});
const mapDispatch2Props = {};
export default connect(mapState2Props, mapDispatch2Props)(TestReportPage);
