import { Edit } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
	Box,
	Button,
	Dialog,
	FormControlLabel,
	FormLabel,
	Grid,
	IconButton,
	Paper,
	Radio,
	RadioGroup,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { addTestScore, getTestScore, updateTestScore } from "apis/student";
import { getExamFields } from "apis/testScore";
import FieldInput from "components/FieldInput";
import { format } from "date-fns";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const tableHead = [
	"",
	"Certification ID",
	"Exam Type",
	"Date of Exam",
	"Percentile",
	"Action",
];

const TestScore = ({ studentId, examTypes, name }) => {
	const initialValues = {
		examType: "",
		name: name ?? "",
		doe: "",
		certificateNo: "",
		url: "",
		username: "",
		password: "",
	};

	const [tests, setTests] = useState([]);
	const [open, setOpen] = useState(false);
	const [selectedTest, setSelectedTest] = useState(null);
	const [selectedExamType, setSelectedExamType] = useState(null);
	const [fieldList, setFieldList] = useState([]);
	const [showFields, setShowFields] = useState(false);
	const [validationSchema, setValidationSchema] = useState(null);

	useEffect(() => {
		_fetchTestScores();
	}, []);

	useEffect(() => {
		const temp = {};
		fieldList?.forEach(key => {
			initialValues[key] = "";
			temp[key] = Yup.string().nullable().required("Required");
		});

		Object.keys(initialValues)?.forEach(key => {
			if (key === "url") {
				temp[key] = Yup.string()
					.matches(
						/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
						"Enter correct url"
					)
					.required("Required");

				return;
			}

			temp[key] = Yup.string().nullable().required("Required");
		});

		setValidationSchema(Yup.object(temp));
	}, [fieldList]);

	const _fetchTestScores = () => {
		getTestScore(studentId).then((ts = []) => setTests(ts));
	};

	const getFields = () => {
		getExamFields(selectedExamType).then(fields => {
			setFieldList(fields);
			setShowFields(true);
		});
	};

	const onSubmit = values => {
		const requestData = {
			name: values?.name,
			doe: new Date(values?.doe),
			certificateNo: values?.certificateNo,
			examType: selectedExamType,
			scoreInformation: fieldList?.map(fld => ({
				key: fld,
				value: values[fld],
			})),
			verificationPortal: {
				url: values?.url,
				username: values?.username,
				password: values?.password,
			},
		};

		if (selectedTest?.id) {
			updateTestScore({
				studentId,
				testScoreId: selectedTest?.id,
				data: requestData,
			}).then(() => {
				_fetchTestScores();
				toast.success("Test Score Updated SuccessFully");
				onClose();
			});

			return;
		}

		addTestScore({ studentId, data: requestData }).then(() => {
			_fetchTestScores();
			toast.success("Test Score Added SuccessFully");
			onClose();
		});
	};

	const onClose = () => {
		setSelectedTest(null);
		setSelectedExamType(null);
		setOpen(close);
		setShowFields(false);
		setFieldList([]);
	};

	return (
		<>
			<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem' overflow='auto'>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 700 }}>
						<TableHead>
							<TableRow sx={{ backgroundColor: "#F37B21" }}>
								{tableHead?.map(label => (
									<TableCell key={label} sx={{ color: "#fff" }}>
										{label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>

						<TableBody>
							{tests?.length ? (
								tests?.map((row, index) => (
									<TableRow key={row?.id}>
										<TableCell>{index + 1}</TableCell>

										<TableCell>{row?.certificateNo}</TableCell>

										<TableCell>{row?.examType}</TableCell>

										<TableCell>{format(new Date(row?.doe), "PP")}</TableCell>

										<TableCell>
											{row?.scoreInformation?.filter(
												({ key }) => key?.toLowerCase() === "ts"
											)[0]?.value || "N/A"}
										</TableCell>

										<TableCell>
											<IconButton
												sx={{ p: 0 }}
												disabled={row?.isLocked}
												onClick={() => {
													setSelectedTest(row);
													setOpen(true);
												}}>
												<Edit />
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
									<TableCell colSpan={tableHead.length} align='center'>
										No Data !
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>

				<Box display='flex' justifyContent='flex-end' mt='1rem'>
					<Button
						variant='outlined'
						size='small'
						startIcon={<AddIcon />}
						onClick={() => setOpen(true)}
						sx={{
							borderColor: "#f37b21 !important",
							color: "#f37b21 !important",
							textTransform: "none",
						}}>
						Add More
					</Button>
				</Box>
			</Box>

			<Dialog
				open={open}
				onClose={onClose}
				PaperProps={{
					sx: {
						width: { xs: "100%", sm: "80vw" },
						height: { xs: "100%", sm: "auto" },
						maxWidth: "unset",
						maxHeight: { xs: "unset", sm: "calc(100% - 64px)" },
						m: 0,
					},
				}}>
				<Box
					p='1rem 2rem'
					display='flex'
					flexDirection='column'
					gap='1rem'
					height='100%'>
					<Formik
						enableReinitialize
						initialValues={selectedTest ? selectedTest : initialValues}
						validationSchema={validationSchema}
						onSubmit={onSubmit}>
						<Form>
							<Box
								display='flex'
								flexDirection='column'
								gap='1rem'
								height='100%'>
								<Box
									display='flex'
									alignItems='center'
									justifyContent='space-between'
									gap='1rem'>
									<Typography
										fontSize='1.2rem'
										fontWeight={500}
										color='#f37b21'>
										Test Score
									</Typography>

									<IconButton onClick={onClose} sx={{ p: 0 }}>
										<CloseIcon />
									</IconButton>
								</Box>

								<Grid container spacing={1} mt={0}>
									{showFields ? (
										<>
											<Grid item xs={12} sm={6}>
												<FieldInput name='name' label='Student Name' />
											</Grid>

											<Grid item xs={12} sm={6}>
												<FieldInput
													type='date'
													name='doe'
													label='Date of Exam'
												/>
											</Grid>

											<Grid item xs={12} sm={6}>
												<FieldInput
													name='certificateNo'
													label='ID/Certificate No.'
												/>
											</Grid>

											<Grid item xs={12} sm={6}>
												<FieldInput
													name='url'
													label='Verification Portal URL'
												/>
											</Grid>

											<Grid item xs={12} sm={6}>
												<FieldInput
													name='username'
													label='Verification Portal Username'
												/>
											</Grid>

											<Grid item xs={12} sm={6}>
												<FieldInput
													name='password'
													label='Verification Portal Password'
												/>
											</Grid>

											{fieldList?.map(field => (
												<Grid key={field} item xs={12} sm={6}>
													<FieldInput name={field} label={field} />
												</Grid>
											))}
										</>
									) : (
										<Grid item xs={12} sm={12}>
											<FormLabel>Select an Exam:</FormLabel>

											<Field name='examType'>
												{props => {
													const {
														field,
														form: { setFieldValue },
													} = props || {};

													return (
														<RadioGroup
															{...field}
															onChange={({ target: { name, value } }) => {
																setFieldValue(name, value);
																setSelectedExamType(value);
															}}>
															{examTypes?.map(exam => (
																<FormControlLabel
																	key={exam}
																	value={exam}
																	control={<Radio size='small' />}
																	label={exam}
																	sx={{
																		"& .Mui-checked": {
																			color: "#f37b21 !important",
																		},
																		"& .MuiFormControlLabel-label": {
																			fontSize: "0.825rem",
																		},
																	}}
																/>
															))}
														</RadioGroup>
													);
												}}
											</Field>
										</Grid>
									)}
								</Grid>

								<Box display='flex' justifyContent='flex-end'>
									{showFields ? (
										<Button
											type='submit'
											variant='contained'
											size='small'
											sx={{
												textTransform: "none",
												bgcolor: "#f37b21 !important",
												"&:disabled": {
													bgcolor: "rgba(0, 0, 0, 0.12) !important",
												},
											}}>
											Submit
										</Button>
									) : (
										<Button
											variant='contained'
											size='small'
											type='button'
											disabled={!selectedExamType}
											onClick={getFields}
											sx={{
												textTransform: "none",
												bgcolor: "#f37b21 !important",
												"&:disabled": {
													bgcolor: "rgba(0, 0, 0, 0.12) !important",
												},
											}}>
											Next
										</Button>
									)}
								</Box>
							</Box>
						</Form>
					</Formik>
				</Box>
			</Dialog>
		</>
	);
};

export default TestScore;
