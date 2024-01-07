import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import Card from "./Card";

const Category = ({ label, dataList = [], updateInformation = () => {} }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Box bgcolor='#fff' borderRadius='0.625rem' p='1rem 1.25rem'>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='space-between'
				gap='1rem'
				mb={isOpen ? "1rem" : 0}
				onClick={() => setIsOpen(!isOpen)}
				sx={{ cursor: "pointer" }}>
				<Typography
					fontSize='1.25rem'
					fontWeight={500}
					maxWidth='75vw'
					color='#f37b21'
					noWrap>
					{label}
				</Typography>

				{isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
			</Box>

			{isOpen ? (
				<Box display='flex' flexDirection='column' gap='1rem'>
					{dataList?.map(taskDetails => (
						<Card
							key={taskDetails?.id}
							updateInformation={updateInformation}
							{...taskDetails}
						/>
					))}
				</Box>
			) : null}
		</Box>
	);
};

export default Category;
