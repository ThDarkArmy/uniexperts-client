import { getCasesDetails } from "apis/support";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { RouteNames } from "routes/_base";
import { setLoader } from "store";
import Tabs from "../Tabs";
import CaseInformation from "./CaseInformation";
import Conversation from "./Conversation";

const tabs = ["Case Information", "Conversation"];

const SingleCase = () => {
	const history = useHistory();
	const {
		location: { pathname },
	} = history || {};

	const caseId = pathname?.split(
		RouteNames.support_case?.replace(":id", "")
	)?.[1];

	const dispatch = useDispatch();

	const [data, setData] = useState({});
	const [selectedTab, setSelectedTab] = useState(0);

	useEffect(() => {
		if (!caseId) {
			history.goBack();
			return;
		}

		dispatch(setLoader(true));

		getCasesDetails(caseId)
			.then(setData)
			.catch(() => {
				history.goBack();
			})
			.finally(dispatch(setLoader(false)));
	}, [caseId]);

	return (
		<>
			<Tabs
				tabs={tabs}
				selectedTab={selectedTab}
				setSelectedTab={setSelectedTab}
			/>

			{selectedTab === 0 ? <CaseInformation data={data} /> : null}

			{selectedTab === 1 ? (
				<Conversation caseId={caseId} data={data?.comments} />
			) : null}
		</>
	);
};

export default SingleCase;
