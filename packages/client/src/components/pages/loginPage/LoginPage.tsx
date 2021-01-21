import classes from "./LoginPage.module.scss";
import React, { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Admin } from "@examsystem/common";
import { getAdmin } from "../../../redux/actions/adminActions";
import { RootState } from "../../../redux/reducers/mainReducer";
import { Header,Button } from "../../uiElements";

interface ILoginPageProps {
  admin: Admin | null;
  err: string;
  login: (email: string, password: string) => void;
}

const LoginPage: React.FC<ILoginPageProps> = ({ login, err, admin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (admin) {
      history.replace("/MainMenu");
    }
  }, [admin, history]);

  const submitForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div>
      <Header>Administration Sytem Login</Header>
      <div className={classes.page}>
      <header>Sign in</header>
        <form className={classes.form}>
          <div>
            <label>Email: </label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <button onClick={submitForm}>Sumbit</button> */}
          <Button success  onClick={submitForm}>Sumbit</Button>
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
  admin: state.admin.admin,
  err: state.admin.error,
});
const mapDispatch2Props = {
  login: getAdmin,
};

export default connect(mapState2Props, mapDispatch2Props)(LoginPage);
