import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Dialog, IconButton, Typography } from "@mui/material";
import CustomTextField from "components/CustomTextField";
import { useEffect, useState } from "react";
import StudentCard from "./StudentCard";

const CheckEligibilityDialog = ({
	open,
	onClose,
	studentList = [],
	schoolId,
	selectedIntake,
	programId,
}) => {
	const [search, setSearch] = useState("");
	const [students, setStudents] = useState(studentList);

	useEffect(() => {
		onSearch();
	}, [studentList]);

	const onSearch = () => {
		if (!search) {
			setStudents(studentList);
			return;
		}

		const tempStudents = [];

		studentList?.forEach(student => {
			const { firstName, lastName, email, mobile } = student.studentInformation || {};

			if (firstName?.toLowerCase()?.includes(search?.toLowerCase())) {
				tempStudents.push(student);
				return;
			}

			if (lastName?.toLowerCase()?.includes(search?.toLowerCase())) {
				tempStudents.push(student);
				return;
			}

			if (
				`${firstName} ${lastName}`
					?.toLowerCase()
					?.includes(search?.toLowerCase())
			) {
				tempStudents.push(student);
				return;
			}

			if (email?.toLowerCase()?.includes(search?.toLowerCase())) {
				tempStudents.push(student);
				return;
			}

			if (mobile?.includes(search)) {
				tempStudents.push(student);
				return;
			}
		});

		setStudents(tempStudents);
	};

	console.log("students: " + JSON.stringify(students))

	return (
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
			<Box p='1rem 2rem' display='flex' flexDirection='column' gap='1rem'>
				<Box
					display='flex'
					alignItems='center'
					justifyContent='space-between'
					gap='1rem'>
					<Typography fontSize='1.2rem' fontWeight={500} color='#f37b21'>
						Select a Student
					</Typography>

					<IconButton onClick={onClose} sx={{ p: 0 }}>
						<CloseIcon />
					</IconButton>
				</Box>

				<Box display='flex' alignItems='center' gap='1rem'>
					<CustomTextField
						value={search}
						handleOnChange={({ value }) => setSearch(value)}
						onKeyDown={({ key }) => {
							if (key === "Enter") {
								onSearch();
							}
						}}
					/>

					<Button
						variant='contained'
						size='small'
						onClick={onSearch}
						sx={{ bgcolor: "#f37b21 !important", textTransform: "none" }}>
						Search
					</Button>
				</Box>

				<Box
					display='flex'
					flexDirection='column'
					gap='1rem'
					height='75vh'
					overflow='auto'>
					{students?.map(student => (
						<StudentCard
							key={student?.id}
							studentData={student.studentInformation}
							schoolId={schoolId}
							selectedIntake={selectedIntake}
							programId={programId}
							studentId={student?._id}
						/>
					))}
				</Box>
			</Box>
		</Dialog>
	);
};

export default CheckEligibilityDialog;
