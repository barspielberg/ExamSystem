import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router";
import { Organization } from "../../../../common/models";
import { RootState } from "../../redux/reducers/mainReducer";

interface IPrivateRouteProps extends RouteProps {
  Component: React.FC<any>;
  org: Organization | null;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  Component,
  org,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => (org ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
};

const mapState2Props = (state: RootState) => ({
  org: state.organization.organization,
});
export default connect(mapState2Props)(PrivateRoute);
