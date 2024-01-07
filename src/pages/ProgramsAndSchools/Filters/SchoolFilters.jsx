import { Box, Chip, Grid, Typography } from "@mui/material";
import { getStates } from "apis/geography";
import DropdownWithSearch from "components/DropdownWithSearch";
import { SchoolTypes } from "constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "store";

const SchoolFilters = ({ schools = [], schoolFilter, handleOnChange }) => {
	const { app: { countries = [] } = {} } = useSelector(state => state);
	const dispatch = useDispatch();

	const [states, setStates] = useState([]);

	useEffect(() => {
		if (!schoolFilter?.preferredCountry) {
			handleOnChange({ key: "state", value: [] });
			setStates([]);

			return;
		}

		dispatch(setLoader(true));

		getStates(
			countries?.filter(
				({ name }) => name === schoolFilter?.preferredCountry
			)[0]?.isoCode
		)
			.then(setStates)
			.finally(dispatch(setLoader(false)));
	}, [schoolFilter?.preferredCountry]);

	return (
		<Box bgcolor='#F5F5F5' p='0.75rem' borderRadius='0.25rem' height='100%'>
			<Typography fontSize='1rem' fontWeight={500} color='#f37b21'>
				School Filters
			</Typography>

			<Grid
				container
				spacing={1}
				mt={0}
				sx={{ "& .MuiGrid-item": { width: "100%" } }}>
				<Grid item xs={12}>
					<DropdownWithSearch
						name='preferredCountry'
						value={schoolFilter?.preferredCountry}
						handleOnChange={handleOnChange}
						options={countries?.map(({ name }) => name)}
						placeholder='Preferred Country'
					/>
				</Grid>

				<Grid item xs={12}>
					<DropdownWithSearch
						multiple
						disableCloseOnSelect
						name='state'
						value={schoolFilter?.state}
						handleOnChange={handleOnChange}
						options={states?.map(({ name }) => name)}
						placeholder='Province/State'
						disabled={!schoolFilter?.preferredCountry}
						renderTags={(value, getTagProps) =>
							value.map((option, index) => (
								<Chip
									key={index}
									variant='filled'
									size='small'
									label={option}
									sx={{ fontSize: "0.75rem" }}
									{...getTagProps({ index })}
								/>
							))
						}
						getOptionDisabled={() => schoolFilter?.state?.length >= 3}
					/>
				</Grid>

				<Grid item xs={12}>
					<DropdownWithSearch
						multiple
						disableCloseOnSelect
						name='schoolType'
						value={schoolFilter?.schoolType}
						handleOnChange={handleOnChange}
						options={SchoolTypes}
						placeholder='School Types'
						renderTags={(value, getTagProps) =>
							value.map((option, index) => (
								<Chip
									key={index}
									variant='filled'
									size='small'
									label={option}
									sx={{ fontSize: "0.75rem" }}
									{...getTagProps({ index })}
								/>
							))
						}
					/>
				</Grid>

				<Grid item xs={12}>
					<DropdownWithSearch
						multiple
						disableCloseOnSelect
						name='schoolIds'
						value={schoolFilter?.schoolIds}
						handleOnChange={handleOnChange}
						options={schools?.map(({ id }) => id)}
						placeholder='Schools'
						renderOption={(props, schoolId) => {
							const selectedSchool = schools?.filter(
								({ id }) => id === schoolId
							)[0];

							return (
								<li {...props}>
									<Typography fontSize='0.75rem'>
										{selectedSchool?.basicDetails?.name}
									</Typography>
								</li>
							);
						}}
						renderTags={(value, getTagProps) =>
							value.map((schoolId, index) => {
								const selectedSchool = schools?.filter(
									({ id }) => id === schoolId
								)[0];

								return (
									<Chip
										key={index}
										variant='filled'
										size='small'
										label={selectedSchool?.basicDetails?.name}
										sx={{ fontSize: "0.75rem" }}
										{...getTagProps({ index })}
									/>
								);
							})
						}
						getOptionDisabled={() => schoolFilter?.schoolIds?.length >= 5}
					/>
				</Grid>
			</Grid>
		</Box>
	);
};

export default SchoolFilters;
