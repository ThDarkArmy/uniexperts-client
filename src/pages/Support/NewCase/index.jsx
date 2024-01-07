import { Grid } from "@mui/material";
import { getCaseTypes, getFAQ } from "apis/support";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "store";
import Answers from "./Answers";
import CaseInformation from "./CaseInformation";

const NewCase = () => {
	const dispatch = useDispatch();

	const [typeList, setTypeList] = useState([]);
	const [faqs, setFaqs] = useState([]);

	useEffect(() => {
		dispatch(setLoader(true));

		Promise.all([getCaseTypes(), getFAQ()])
			.then(([resp1, resp2]) => {
				setTypeList(resp1);
				setFaqs(resp2);
			})
			.finally(dispatch(setLoader(false)));
	}, []);

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={6}>
				<CaseInformation typeList={typeList} />
			</Grid>

			<Grid item xs={12} sm={6}>
				<Answers faqs={faqs} />
			</Grid>
		</Grid>
	);
};

export default NewCase;
