import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {  Organization } from "../../../../../common/models";
import { getOrganization } from "../../../redux/actions/organizationActions";
import { RootState } from "../../../redux/reducers/mainReducer";
import Header from "../../uiElements/Header/Header";

interface ILoginPageProps {
  organization: Organization | null;
  err: string;
  login: (email: string, password: string) => void;
}

const LoginPage: React.FC<ILoginPageProps> = ({ login, err, organization }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (organization) {
      history.replace("/MainMenu");
    }
    
  }, [organization,history]);

  const submitForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div>
      <Header>Administration Sytem Login</Header>
      <div>
        <form>
          <div>
            <label>Email: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={submitForm}>Sumbit</button>
        </form>
      </div>
      {err && (
        <div>
          <p>{err}</p>
        </div>
      )}
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
