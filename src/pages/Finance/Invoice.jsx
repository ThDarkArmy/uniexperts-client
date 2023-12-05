import DownloadIcon from "@mui/icons-material/Download";
import {
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow
} from "@mui/material";
import { Box } from "@mui/system";
import { getInvoices } from "apis/invoice";
import { DateFilter } from "components/DateFilter";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "store";

const headCells = [
	"",
	"Invoice No.",
	"Amount",
	"Currency",
	"Created By",
	"Created On",
	"Approved By",
	"Approved On",
	"Download",
];

const Invoice = () => {
	const dispatch = useDispatch();

	const [dateRange, setDateRange] = useState([null, null]);
	const [rowsPerPage, setRowsPerPage] = useState(25);
	const [page, setPage] = useState(0);
	const [total, setTotal] = useState(0);

	const [data, setData] = useState([]);

	useEffect(() => {
		_fetchData();
	}, [page, rowsPerPage, dateRange]);

	const _fetchData = () => {
		let requestParams = {
			perPage: rowsPerPage,
			pageNo: page + 1,
		};

		const [startDate, endDate] = dateRange || [];

		if (startDate) {
			requestParams.startDate = format(startDate, "yyyy-MM-dd");
		}

		if (endDate) {
			requestParams.endDate = format(endDate, "yyyy-MM-dd");
		}

		dispatch(setLoader(true));

		getInvoices(requestParams)
			.then(response => {
				setData(response?.data ?? []);
				setTotal(response?.meta?.total ?? 0);
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

	return (
		<Box sx={{ p: "1rem 0" }}>
			<DateFilter dateRange={dateRange} setDateRange={setDateRange} />

			<TableContainer component={Paper} sx={{ mt: "1rem" }}>
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

									<TableCell>{row?.invoiceNumber ?? "N/A"}</TableCell>

									<TableCell>{row?.amount ?? "N/A"}</TableCell>

									<TableCell>{row?.currency ?? "N/A"}</TableCell>

									<TableCell>{row?.createdBy ?? "N/A"}</TableCell>

									<TableCell>
										{format(new Date(row?.createdOn), "PPp")}
									</TableCell>

									<TableCell>{row?.approvedBy ?? "N/A"}</TableCell>

									<TableCell>
										{format(new Date(row?.approvedOn), "PPp")}
									</TableCell>

									<TableCell>
										<IconButton sx={{ color: "#F37B21" }}>
											<DownloadIcon color='inherit' />
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
	);
};

export default Invoice;
