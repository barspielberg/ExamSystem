import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router";
import { Admin } from "@examsystem/common";
import { RootState } from "../../redux/reducers/mainReducer";

interface IPrivateRouteProps extends RouteProps {
  Component: React.FC<any>;
  admin: Admin | null;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  Component,
  admin,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        admin ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

const mapState2Props = (state: RootState) => ({
  admin: state.admin.admin,
});
export default connect(mapState2Props)(PrivateRoute);
