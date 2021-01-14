import React from "react";
import { connect } from "react-redux";
import { Admin, Organization } from "../../../../../common/models";
import { getOrganization } from "../../../redux/actions/organizationActions";
import { RootState } from "../../../redux/reducers/mainReducer";
import Header from "../../uiElements/Header/Header";

interface ILoginPageProps {
  organization: Organization | null;
  err: string;
  login: (admin: Admin) => void;
}
//TODO by Michael (at the end when all is done?)
const LoginPage: React.FC<ILoginPageProps> = ({ login, err, organization }) => {
  return (
    <div>
      <Header>Title</Header>
      LoginPage Worked!
    </div>
  );
};

const mapState2Props = (state: RootState) => ({
  organization: state.organization.organization,
  err: state.organization.error,
});
const mapDispatch2Props = {
  login: getOrganization,
};

export default connect(mapState2Props, mapDispatch2Props)(LoginPage);
