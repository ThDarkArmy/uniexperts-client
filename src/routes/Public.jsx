import { Redirect, Route } from "react-router-dom";
import { _getToken } from "utils/token";
import { RouteNames } from "./_base";

const Public = ({ exact, path, Component }) => {
	const token = _getToken();

	if (token && localStorage.getItem("userDetails.docUploaded")==="true") return <Redirect to={RouteNames.dashboard} />;

	return <Route exact={exact} path={path} component={Component} />;
};

Public.defaultProps = {
	exact: true,
	path: "/",
	Component: null,
};

export default Public;
