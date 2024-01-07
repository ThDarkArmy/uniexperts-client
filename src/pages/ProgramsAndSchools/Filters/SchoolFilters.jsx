import { Box, Chip, Grid, Typography } from "@mui/material";
import { getStates } from "apis/geography";
import DropdownWithSearch from "components/DropdownWithSearch";
import { SchoolTypes } from "constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "store";

const SchoolFilters = ({ schools = [], schoolFilter, handleOnChange }) => {
	// const { app: { countries = [] } = {} } = useSelector(state => state);
	const dispatch = useDispatch();

	const countries = [
		{
		  name: "United States",
		  states: ["California", "New York", "Texas", "Florida", "Illinois"],
		},
		{
		  name: "India",
		  states: ["Maharashtra", "Uttar Pradesh", "Tamil Nadu", "Karnataka", "Delhi"],
		},
		{
		  name: "China",
		  states: ["Guangdong", "Shandong", "Henan", "Sichuan", "Jiangsu"],
		},
		{
		  name: "Brazil",
		  states: ["Sao Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia", "Rio Grande do Sul"],
		},
		{
		  name: "United Kingdom",
		  states: ["England", "Scotland", "Wales", "Northern Ireland"],
		},
		{
		  name: "Canada",
		  states: ["Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba"],
		},
		{
		  name: "Australia",
		  states: ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia"],
		},
		{
		  name: "Germany",
		  states: ["North Rhine-Westphalia", "Bavaria", "Baden-Wurttemberg", "Lower Saxony", "Hesse"],
		},
		{
		  name: "Japan",
		  states: ["Tokyo", "Osaka", "Kanagawa", "Aichi", "Hokkaido"],
		},
		{
		  name: "France",
		  states: ["Ile-de-France", "Auvergne-Rhone-Alpes", "Provence-Alpes-Cote d'Azur", "Hauts-de-France", "Normandy"],
		},
		{
		  name: "Italy",
		  states: ["Lombardy", "Lazio", "Campania", "Veneto", "Emilia-Romagna"],
		},
		{
		  name: "Spain",
		  states: ["Madrid", "Catalonia", "Andalusia", "Valencia", "Galicia"],
		},
		{
		  name: "South Korea",
		  states: ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon"],
		},
		{
		  name: "Russia",
		  states: ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Nizhny Novgorod"],
		},
		{
		  name: "Mexico",
		  states: ["Mexico City", "Jalisco", "Nuevo Leon", "Mexico State", "Puebla"],
		},
		{
		  name: "Argentina",
		  states: ["Buenos Aires", "Cordoba", "Santa Fe", "Mendoza", "Tucuman"],
		},
		{
		  name: "Nigeria",
		  states: ["Lagos", "Kano", "Ibadan", "Kaduna", "Port Harcourt"],
		},
		{
		  name: "South Africa",
		  states: ["Gauteng", "KwaZulu-Natal", "Western Cape", "Eastern Cape", "Limpopo"],
		},
		{
		  name: "Turkey",
		  states: ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya"],
		},
		{
		  name: "Saudi Arabia",
		  states: ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam"],
		},
	  ];

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

	useEffect(()=> {

	},[])

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
						handleOnChange={(data)=> {
							setStates([...countries.filter(c=>c.name===data.value)[0]?.states])
							handleOnChange(data)
						}}
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
						options={countries.filter(c=>c.name===schoolFilter?.preferredCountry)[0]?.states}
						placeholder='Province/State'
						//disabled={!schoolFilter?.preferredCountry}
						// renderTags={(value, getTagProps) =>
						// 	value.map((option, index) => (
						// 		<Chip
						// 			key={index}
						// 			variant='filled'
						// 			size='small'
						// 			label={option}
						// 			sx={{ fontSize: "0.75rem" }}
						// 			{...getTagProps({ index })}
						// 		/>
						// 	))
						// }
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
