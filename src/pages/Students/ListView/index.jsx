import { DeleteOutline } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
	Box,
	Button,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from "@mui/material";
import { getStudents, removeStudent } from "apis/student";
import Warning from "components/Warning";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { RouteNames } from "routes/_base";
import { setLoader } from "store";
import Filters from "./Filters";

const daysList = [
	{
		value: 30,
		label: "Last 30 Days",
	},
	{
		value: 60,
		label: "Last 60 Days",
	},
	{
		value: 90,
		label: "Last 90 Days",
	},
];

const sortByList = [
	{
		value: "studentId",
		label: "Student Id",
	},
	{
		value: "name",
		label: "Name",
	},
	{
		value: "email",
		label: "Email",
	},
	{
		value: "mobile",
		label: "Mobile",
	},
	{
		value: "country",
		label: "Country",
	},
	{
		value: "createdBy",
		label: "Created By",
	},
	{
		value: "counsellor",
		label: "Counsellor",
	},
];

const sortByTypeList = ["Ascending", "Descending"];

const headCells = [
	"",
	"Name",
	"Email",
	"Phone Number",
	"Country",
	"Created by",
	"Counsellor",
	"View",
	"Delete",
];

const Students = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const [data, setData] = useState([]);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const [page, setPage] = useState(0);
	const [total, setTotal] = useState(0);
	const [filters, setFilters] = useState({});
	const [showFilters, setShowFilters] = useState(false);
	const [showWarning, setShowWarning] = useState(false);
	const [deletingStudent, setDeletingStudent] = useState({});

	useEffect(() => {
		_fetchData();
	}, [page, rowsPerPage]);

	const _fetchData = () => {
		let requestParams = {
			perPage: rowsPerPage,
			pageNo: page + 1,
		};

		// if (filters) {
		// 	for (const [key, value] of Object.entries(filters)) {
		// 		if (!value) continue;
		// 		requestParams[key] = value?.value ?? value;
		// 	}
		// }

		dispatch(setLoader(true));

		getStudents(requestParams = {})
			.then(response => {
				console.log(response, 'in index file');
				setData(response);
				setTotal(response?.meta?.total);
			})
			.finally(() => dispatch(setLoader(false)));
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(event.target.value);
		setPage(0);
	};

	const onView = id => {
		history.push(RouteNames.edit_student?.replace(":id", id));
	};

	const onDelete = student => {
		setDeletingStudent(student);
		setShowWarning(true);
	};

	const onCancelDelete = () => {
		setShowWarning(false);
		setDeletingStudent({});
	};

	const onConfirmDelete = () => {
		removeStudent(deletingStudent?._id).then(() => {
			toast.success("Student Deleted Successfully");

			setShowWarning(false);
			setDeletingStudent({});

			_fetchData();
		});
	};

	return (
		<>
			<Box
				sx={{
					bgcolor: "#fff",
					p: "1rem 1.25rem",
					borderRadius: "0.625rem",
				}}>
				<Box
					display='flex'
					flexDirection={{ xs: "column", sm: "row" }}
					alignItems={{ xs: "baseline", sm: "center" }}
					justifyContent='space-between'
					gap='1rem'>
					<Typography fontSize='1.2rem' color='#f37b21' fontWeight={700}>
						Students
					</Typography>

					<Box display='flex' alignItems='center' gap='1rem'>
						<Button
							variant='outlined'
							size='small'
							onClick={() => setShowFilters(!showFilters)}
							sx={{
								color: "#f37b21 !important",
								borderColor: "#f37b21 !important",
								textTransform: "none",
								borderRadius: 99
							}}>
							{`${showFilters ? "Hide" : "Show"} Filters`}
						</Button>

						<Button
							variant='contained'
							size='small'
							onClick={() => history.push(RouteNames.new_student)}
							sx={{
								backgroundColor: "#F37B21 !important",
								textTransform: "none",
								borderRadius: 99
							}}>
							Add Student
						</Button>
					</Box>
				</Box>

				{showFilters ? (
					<Filters
						filters={filters}
						setFilters={setFilters}
						daysList={daysList}
						sortByList={sortByList}
						sortByTypeList={sortByTypeList}
						_fetchData={_fetchData}
					/>
				) : null}
			</Box>

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
									<TableCell key={label} align='left' sx={{ color: "#fff" }}>
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

										<TableCell>
											<Link
												to={RouteNames.edit_student?.replace(":id", row?._id)}
												style={{
													color: "inherit",
												}}>{`${row?.studentInformation.firstName} ${row?.studentInformation.lastName}`}</Link>
										</TableCell>

										<TableCell>{row?.studentInformation.email ?? "N/A"}</TableCell>

										<TableCell>{row?.studentInformation.mobile ?? "N/A"}</TableCell>

										<TableCell>{row?.address.country ?? "N/A"}</TableCell>

										<TableCell>{row?.createdBy ?? "N/A"}</TableCell>

										<TableCell>{row?.studentInformation.counsellorId ?? "N/A"}</TableCell>

										<TableCell>
											<IconButton sx={{ p: 0 }} onClick={() => onView(row?._id)}>
												<VisibilityIcon />
											</IconButton>
										</TableCell>

										<TableCell>
											<IconButton sx={{ p: 0 }} onClick={() => onDelete(row)}>
												<DeleteOutline />
											</IconButton>
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

						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[25, 50, 100]}
									colSpan={headCells.length}
									count={total}
									rowsPerPage={rowsPerPage}
									page={page}
									onPageChange={handleChangePage}
									onRowsPerPageChange={handleChangeRowsPerPage}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</TableContainer>
			</Box>

			{showWarning ? (
				<Warning
					open={showWarning}
					onCancel={onCancelDelete}
					onConfirm={onConfirmDelete}
					message={`${deletingStudent?.studentInformation?.firstName} ${deletingStudent?.studentInformation?.lastName} will be deleted!`}
				/>
			) : null}
		</>
	);
};

export default Students;
