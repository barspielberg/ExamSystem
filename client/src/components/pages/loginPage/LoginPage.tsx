import React, { useState } from "react";
import { connect } from "react-redux";
import { StringLiteralLike } from "typescript";
import { Admin, Organization } from "../../../../../common/models";
import { getOrganization } from "../../../redux/actions/organizationActions";
import { RootState } from "../../../redux/reducers/mainReducer";
import Header from "../../uiElements/Header/Header";

interface ILoginPageProps {
  organization: Organization | null;
  err: string;
  login: (email: string, password: string) => void;
}
//TODO by Michael (at the end when all is done?)
const LoginPage: React.FC<ILoginPageProps> = ({ login, err, organization }) => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const submitForm = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    login(email,password);
  }
  return (
    <div>
      <Header>Administration Sytem Login</Header>
      <div>
        <form>
          <div>
            <label>Email: </label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div>
            <label>Password: </label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <button onClick={submitForm}>Sumbit</button>
        </form>
      </div>
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
