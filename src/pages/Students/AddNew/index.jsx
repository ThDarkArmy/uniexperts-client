import { Box, Step, StepButton, Stepper } from "@mui/material";
import { getIntakes } from "apis/intake";
import { getStaff } from "apis/staff";
import { getPreferredCountries } from "apis/student";
import { useEffect, useState } from "react";
import Documents from "./Documents";
import Education from "./Education";
import General from "./General";
import TestScore from "./TestScore";
import WorkHistory from "./WorkHistory";

const tabs = [
	"GENERAL DETAILS",
	"EDUCATIONAL",
	"TEST SCORES",
	"WORK HISTORY",
	"DOCUMENTS",
];

const AddNewStudent = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [studentId, setStudentId] = useState(null);
	const [staff, setStaff] = useState([]);
	const intakes = [{
		createdBy: "User3",
		endDate: "2023-09-30T00:00:00.000Z",
		externalId: "DEF789",
		id: "650e7f88570444f8b500753c",
		month: "September",
		document: "Document 3",
		programId: "6480db07e566433a3ce5bd32",
		schoolId: "6480c85c8614530be8738701333",
		startDate: "2023-09-15T00:00:00.000Z",
		status: "Open",
		updatedBy: "User3",
		year: 2023,
		name: 'January 2023'
	}, {
		createdBy: "User3",
		endDate: "2023-09-30T00:00:00.000Z",
		externalId: "DEF789",
		id: "650e7f88570444f8b500752c",
		month: "September",
		document: "Document 3",
		programId: "6480db07e566433a3ce5bd32",
		schoolId: "6480c85c8614530be8738701333",
		startDate: "2023-09-15T00:00:00.000Z",
		status: "Open",
		updatedBy: "User3",
		year: 2023,
		name: 'March 2023'
	}, {
		createdBy: "User3",
		endDate: "2023-09-30T00:00:00.000Z",
		externalId: "DEF789",
		id: "650e7f88570444f8b500751c",
		month: "September",
		document: "Document 3",
		programId: "6480db07e566433a3ce5bd32",
		schoolId: "6480c85c8614530be8738701333",
		startDate: "2023-09-15T00:00:00.000Z",
		status: "Open",
		updatedBy: "User3",
		year: 2023,
		name: 'May 2023'
	}, {
		createdBy: "User3",
		endDate: "2023-09-30T00:00:00.000Z",
		externalId: "DEF789",
		id: "650e7f88570444f8b500750c",
		month: "September",
		document: "Document 3",
		programId: "6480db07e566433a3ce5bd32",
		schoolId: "6480c85c8614530be8738701333",
		startDate: "2023-09-15T00:00:00.000Z",
		status: "Open",
		updatedBy: "User3",
		year: 2023,
		name: 'September 2023'
	}, {
		createdBy: "User3",
		endDate: "2023-09-30T00:00:00.000Z",
		externalId: "DEF789",
		id: "650e7f88570444f8b500749c",
		month: "September",
		document: "Document 3",
		programId: "6480db07e566433a3ce5bd32",
		schoolId: "6480c85c8614530be8738701333",
		startDate: "2023-09-15T00:00:00.000Z",
		status: "Open",
		updatedBy: "User3",
		year: 2023,
		name: 'October 2023'
	}];
	const preferredCountries = ["India", "Andorra", "United Arab Emirates", "Afghanistan", "Antigua and Barbuda", "Anguilla", "Albania", "Armenia", "Angola", "Antarctica", "Argentina", "Austria", "Australia*", "Aruba", "Aland Islands", "Azerbaijan", "Bosnia and Herzegovina", "Barbados", "Bangladesh", "Belgium", "Burkina Faso", "Bulgaria", "Bahrain", "Burundi", "Benin", "Saint Barthélemy", "Bermuda", "Brunei Darussalam", "Bolivia, Plurinational State of", "Bonaire, Sint Eustatius and Saba", "Brazil*", "Bahamas", "Bhutan", "Bouvet Island", "Botswana", "Belarus", "Belize", "Canada*", "Cocos (Keeling) Islands", "Congo, the Democratic Republic of the", "Central African Republic", "Congo", "Switzerland", "Cote d’Ivoire", "Cook Islands", "Chile", "Cameroon", "China*", "Colombia", "Costa Rica", "Cuba", "Cape Verde", "Curaçao", "Christmas Island", "Cyprus", "Czech Republic", "Germany", "Djibouti", "Denmark", "Dominica", "Dominican Republic", "Algeria", "Ecuador", "Estonia", "Egypt", "Western Sahara", "Eritrea", "Spain", "Ethiopia", "Finland", "Fiji", "Falkland Islands (Malvinas)", "Faroe Islands", "France", "Gabon", "United Kingdom", "Grenada", "Georgia", "French Guiana", "Guernsey", "Ghana", "Gibraltar", "Greenland", "Gambia", "Guinea", "Guadeloupe", "Equatorial Guinea", "Greece", "South Georgia and the South Sandwich Islands", "Guatemala", "Guinea-Bissau", "Guyana", "Heard Island and McDonald Islands", "Honduras", "Croatia", "Haiti", "Hungary", "Indonesia", "Ireland*", "Israel", "Isle of Man", "India*", "British Indian Ocean Territory", "Iraq", "Iran, Islamic Republic of", "Iceland", "Italy*", "Jersey", "Jamaica", "Jordan", "Japan", "Kenya", "Kyrgyzstan", "Cambodia", "Kiribati", "Comoros", "Saint Kitts and Nevis", "Korea, Democratic People’s Republic of", "Korea, Republic of", "Kuwait", "Cayman Islands", "Kazakhstan", "Lao People’s Democratic Republic", "Lebanon", "Saint Lucia", "Liechtenstein", "Sri Lanka", "Liberia", "Lesotho", "Lithuania", "Luxembourg", "Latvia", "Libyan Arab Jamahiriya", "Morocco", "Monaco", "Moldova, Republic of", "Montenegro", "Saint Martin (French part)", "Madagascar", "Macedonia, the former Yugoslav Republic of", "Mali", "Myanmar", "Mongolia", "Macao", "Martinique", "Mauritania", "Montserrat", "Malta", "Mauritius", "Maldives", "Malawi", "Mexico*", "Malaysia", "Mozambique", "Namibia", "New Caledonia", "Niger", "Norfolk Island", "Nigeria", "Nicaragua", "Netherlands", "Norway", "Nepal", "Nauru", "Niue", "New Zealand", "Oman", "Panama", "Peru", "French Polynesia", "Papua New Guinea", "Philippines", "Pakistan", "Poland", "Saint Pierre and Miquelon", "Pitcairn", "Palestine", "Portugal", "Paraguay", "Qatar", "Reunion", "Romania", "Serbia", "Russian Federation", "Rwanda", "Saudi Arabia", "Solomon Islands", "Seychelles", "Sudan", "Sweden", "Singapore", "Saint Helena, Ascension and Tristan da Cunha", "Slovenia", "Svalbard and Jan Mayen", "Slovakia", "Sierra Leone", "San Marino", "Senegal", "Somalia", "Suriname", "South Sudan", "Sao Tome and Principe", "El Salvador", "Sint Maarten (Dutch part)", "Syrian Arab Republic", "Swaziland", "Turks and Caicos Islands", "Chad", "French Southern Territories", "Togo", "Thailand", "Tajikistan", "Tokelau", "Timor-Leste", "Turkmenistan", "Tunisia", "Tonga", "Turkey", "Trinidad and Tobago", "Tuvalu", "Taiwan", "Tanzania, United Republic of", "Ukraine", "Uganda", "United States*", "Uruguay", "Uzbekistan", "Holy See (Vatican City State)", "Saint Vincent and the Grenadines", "Venezuela, Bolivarian Republic of", "Virgin Islands, British", "Vietnam", "Vanuatu", "Wallis and Futuna", "Samoa", "Yemen", "Mayotte", "South Africa", "Zambia", "Zimbabwe"]

	useEffect(() => {
		Promise.all([getStaff(), getIntakes(), getPreferredCountries()]).then(
			([staffs, intakes, preferredCountries]) => {
				// setPreferredCountries(Object.values(preferredCountries || {}));

				setStaff(
					staffs?.map(({ _id, fullName }) => ({
						id: _id,
						name: fullName,
					}))
				);

				// setIntakes(
				// 	intakes?.map(({ id, month, year }) => ({
				// 		id: id,
				// 		name: `${month} ${year}`,
				// 	}))
				// );
			}
		);
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [activeStep]);

	const nextStep = () => setActiveStep(activeStep + 1);

	/* if (!staff?.length) return null; */

	return (
		<>
			<Box bgcolor='#fff' p='1rem 1.25rem' borderRadius='0.625rem'>
				<Stepper
					alternativeLabel
					activeStep={activeStep}
					sx={{
						overflowX: "auto",
						overflowY: "hidden",
						"& .Mui-active": { color: "#f37b21 !important" },
						"& .Mui-completed": { color: "#f37b21 !important" },
						"&::-webkit-scrollbar": { display: "none" },
					}}>
					{tabs.map((label, index) => (
						<Step key={index}>
							<StepButton color='inherit' onClick={() => setActiveStep(index)}>
								{label}
							</StepButton>
						</Step>
					))}
				</Stepper>
			</Box>

			{activeStep === 0 && (
				<General
					studentId={studentId}
					setStudentId={setStudentId}
					staff={staff}
					intakes={intakes}
					preferredCountries={preferredCountries}
					nextStep={nextStep}
				/>
			)}

			{activeStep === 1 && (
				<Education studentId={studentId} nextStep={nextStep} preferredCountries={preferredCountries} />
			)}
			{activeStep === 2 && (
				<TestScore studentId={studentId} nextStep={nextStep} />
			)}
			{activeStep === 3 && (
				<WorkHistory studentId={studentId} nextStep={nextStep} />
			)}
			{activeStep === 4 && (
				<Documents studentId={studentId} nextStep={nextStep} />
			)}

		</>
	);
};

export default AddNewStudent;
