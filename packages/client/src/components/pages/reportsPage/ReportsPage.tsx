import classes from "./ReportsPage.module.scss";
import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../../redux/reducers/mainReducer";
import { useHistory } from "react-router";
import { useParams } from "../../../hooks";

interface IReportsPageProps {}

const ReportsPage: React.FC<IReportsPageProps> = ({}) => {
  const history = useHistory();
  const { organizationId, fieldId } = useParams();

  return (
    <div className={classes.main}>
      <b> Reports </b>
      <section>
        <p
          className={classes.clickable}
          onClick={() =>
            history.push(
              `/TestReport/?organizationId=${organizationId}&fieldId=${fieldId}`
            )
          }
        >
          Tests Reports »{" "}
        </p>
        <p
          className={classes.clickable}
          onClick={() =>
            history.push(
              `/StudentReport/?organizationId=${organizationId}&fieldId=${fieldId}`
            )
          }
        >
          Students Reports »{" "}
        </p>
      </section>
    </div>
  );
};

const mapState2Props = (state: RootState) => ({});
const mapDispatch2Props = {};
export default connect(mapState2Props, mapDispatch2Props)(ReportsPage);
