import { Box, Grid, Typography } from "@mui/material";
import { getSchoolPrograms } from "apis/program";
import { getStudents } from "apis/student";
import ProgramCard from "components/ProgramCard";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "store";

const Programs = ({ schoolId }) => {
	const dispatch = useDispatch();

	const [programs, setPrograms] = useState([]);
	const [studentList, setStudentList] = useState([]);

	console.log("Student List: f: " + studentList)

	useEffect(() => {
		dispatch(setLoader(true));

		Promise.all([getSchoolPrograms(schoolId), 
			getStudents()
		])
			.then(([programList, students]) => {
				setPrograms(programList);
				setStudentList(students);
			})
			.finally(dispatch(setLoader(false)));
	}, []);

	return (
		<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem 1.25rem'>
			{programs?.length ? (
				<Grid container spacing={2}>
					{programs?.map(program => (
						<ProgramCard
							key={program?.id}
							studentList={studentList}
							{...program}
						/>
					))}
				</Grid>
			) : (
				<Box>
					<Typography fontSize='0.825rem' align='center'>
						No Data !
					</Typography>
				</Box>
			)}
		</Box>
	);
};

export default Programs;
