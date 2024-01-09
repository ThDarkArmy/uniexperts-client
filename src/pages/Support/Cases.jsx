import {
	Box,
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { getCases } from "apis/support";
import { format } from "date-fns";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { RouteNames } from "routes/_base";
import { setLoader } from "store";

const headCells = [
	"",
	"Case ID",
	"Topic",
	"Requirement",
	"Status",
	"Date Created",
	"Last Modified",
	"Action",
];

const Cases = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const [data, setData] = useState([]);

	useEffect(() => {
		dispatch(setLoader(true));
		getCases()
			.then(setData)
			.finally(dispatch(setLoader(false)));
	}, []);

	const viewCase = caseId => {
		history.push(RouteNames?.support_case?.replace(":id", caseId));
	};

	return (
		<Box
			sx={{
				bgcolor: "#fff",
				p: "1rem 1.25rem",
				borderRadius: "0.625rem",
			}}>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }}>
					<TableHead>
						<TableRow sx={{ backgroundColor: "#F37B21" }}>
							{headCells?.map(label => (
								<TableCell key={label} sx={{ color: "#fff" }}>
									{label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>

					<TableBody>
						{data?.length ? (
							data.map((row, index) => (
								<TableRow key={row?.id}>
									<TableCell>{index + 1}</TableCell>

									<TableCell>{row?.caseId ?? "N/A"}</TableCell>

									<TableCell>{row?.subject ?? "N/A"}</TableCell>

									<TableCell>{row?.priority ?? "N/A"}</TableCell>

									<TableCell>
										{row?.status ? (
											<Box
												bgcolor='#FDBC64'
												p='0.25rem 0.5rem'
												minWidth='5.25rem'
												borderRadius='0.25rem'>
												<Typography
													fontSize='0.825rem'
													color='#fff'
													align='center'>
													{row?.status}
												</Typography>
											</Box>
										) : (
											"N/A"
										)}
									</TableCell>

									<TableCell>
										{format(new Date(row?.createdAt), "PPP")}
									</TableCell>

									<TableCell>
										{format(new Date(row?.updatedAt), "PPP")}
									</TableCell>

									<TableCell>
										<Button
											variant='contained'
											size='small'
											style={{
												backgroundColor: "#f37b21",
												textTransform: "none",
											}}
											onClick={() => viewCase(row?._id)}>
											View
										</Button>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow
								key='no-data'
								style={{
									height: "10rem",
								}}>
								<TableCell colSpan={headCells.length} align='center'>
									No Data !
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default Cases;
