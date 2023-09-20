import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Button, Grid, MenuItem, Typography, Select, InputLabel, FormControl } from "@mui/material";
import { Box } from "@mui/system";
import { config, signup, verifyEmail } from "apis/auth";
import DropdownWithSearch from "components/DropdownWithSearch";
import FieldInput from "components/FieldInput";
import { Field, Form, Formik } from "formik";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { phoneRegExp } from "utils/validations";
import TimezoneSelect from 'react-timezone-select'
import * as Yup from "yup";
import { PersistFormikValues } from 'formik-persist-values';


const Step1 = ({ data, setData, nextStep }) => {
	const { app: { countries = [], timezone = [] } = {} } = useSelector(
		state => state
	);

	const enityTypeOption = ["Private", "Partnership", "Trust", "Proprietor", "Individual"];
	const countryList = [
		"Afghanistan",
		"Albania",
		"Algeria",
		"Andorra",
		"Angola",
		"Antigua and Barbuda",
		"Argentina",
		"Armenia",
		"Australia",
		"Austria",
		"Azerbaijan",
		"Bahamas",
		"Bahrain",
		"Bangladesh",
		"Barbados",
		"Belarus",
		"Belgium",
		"Belize",
		"Benin",
		"Bhutan",
		"Bolivia",
		"Bosnia and Herzegovina",
		"Botswana",
		"Brazil",
		"Brunei",
		"Bulgaria",
		"Burkina Faso",
		"Burundi",
		"Côte d'Ivoire",
		"Cabo Verde",
		"Cambodia",
		"Cameroon",
		"Canada",
		"Central African Republic",
		"Chad",
		"Chile",
		"China",
		"Colombia",
		"Comoros",
		"Congo (Congo-Brazzaville)",
		"Costa Rica",
		"Croatia",
		"Cuba",
		"Cyprus",
		"Czechia (Czech Republic)",
		"Democratic Republic of the Congo",
		"Denmark",
		"Djibouti",
		"Dominica",
		"Dominican Republic",
		"Ecuador",
		"Egypt",
		"El Salvador",
		"Equatorial Guinea",
		"Eritrea",
		"Estonia",
		"Eswatini (fmr. 'Swaziland')",
		"Ethiopia",
		"Fiji",
		"Finland",
		"France",
		"Gabon",
		"Gambia",
		"Georgia",
		"Germany",
		"Ghana",
		"Greece",
		"Grenada",
		"Guatemala",
		"Guinea",
		"Guinea-Bissau",
		"Guyana",
		"Haiti",
		"Holy See",
		"Honduras",
		"Hungary",
		"Iceland",
		"India",
		"Indonesia",
		"Iran",
		"Iraq",
		"Ireland",
		"Israel",
		"Italy",
		"Jamaica",
		"Japan",
		"Jordan",
		"Kazakhstan",
		"Kenya",
		"Kiribati",
		"Kuwait",
		"Kyrgyzstan",
		"Laos",
		"Latvia",
		"Lebanon",
		"Lesotho",
		"Liberia",
		"Libya",
		"Liechtenstein",
		"Lithuania",
		"Luxembourg",
		"Madagascar",
		"Malawi",
		"Malaysia",
		"Maldives",
		"Mali",
		"Malta",
		"Marshall Islands",
		"Mauritania",
		"Mauritius",
		"Mexico",
		"Micronesia",
		"Moldova",
		"Monaco",
		"Mongolia",
		"Montenegro",
		"Morocco",
		"Mozambique",
		"Myanmar (formerly Burma)",
		"Namibia",
		"Nauru",
		"Nepal",
		"Netherlands",
		"New Zealand",
		"Nicaragua",
		"Niger",
		"Nigeria",
		"North Korea",
		"North Macedonia",
		"Norway",
		"Oman",
		"Pakistan",
		"Palau",
		"Palestine State",
		"Panama",
		"Papua New Guinea",
		"Paraguay",
		"Peru",
		"Philippines",
		"Poland",
		"Portugal",
		"Qatar",
		"Romania",
		"Russia",
		"Rwanda",
		"Saint Kitts and Nevis",
		"Saint Lucia",
		"Saint Vincent and the Grenadines",
		"Samoa",
		"San Marino",
		"Sao Tome and Principe",
		"Saudi Arabia",
		"Senegal",
		"Serbia",
		"Seychelles",
		"Sierra Leone",
		"Singapore",
		"Slovakia",
		"Slovenia",
		"Solomon Islands",
		"Somalia",
		"South Africa",
		"South Korea",
		"South Sudan",
		"Spain",
		"Sri Lanka",
		"Sudan",
		"Suriname",
		"Sweden",
		"Switzerland",
		"Syria",
		"Tajikistan",
		"Tanzania",
		"Thailand",
		"Timor-Leste",
		"Togo",
		"Tonga",
		"Trinidad and Tobago",
		"Tunisia",
		"Turkey",
		"Turkmenistan",
		"Tuvalu",
		"Uganda",
		"Ukraine",
		"United Arab Emirates",
		"United Kingdom",
		"United States of America",
		"Uruguay",
		"Uzbekistan",
		"Vanuatu",
		"Venezuela",
		"Vietnam",
		"Yemen",
		"Zambia",
		"Zimbabwe"
	];
	const countryDialingCodes = [
		"+93", "+355", "+213", "+376", "+244", "+1", "+54", "+374", "+61", "+43",
		"+994", "+1", "+973", "+880", "+1", "+375", "+32", "+501", "+229", "+975",
		"+591", "+387", "+267", "+55", "+673", "+359", "+226", "+257", "+225",
		"+238", "+855", "+237", "+1", "+236", "+235", "+56", "+86", "+57", "+269",
		"+242", "+506", "+385", "+53", "+357", "+420", "+243", "+45", "+253", "+1",
		"+1", "+593", "+20", "+503", "+240", "+291", "+372", "+268", "+251", "+679",
		"+358", "+33", "+241", "+220", "+995", "+49", "+233", "+30", "+1", "+502",
		"+224", "+245", "+592", "+509", "+379", "+504", "+36", "+354", "+91", "+62",
		"+98", "+964", "+353", "+972", "+39", "+1", "+81", "+962", "+7", "+254",
		"+686", "+965", "+996", "+856", "+371", "+961", "+266", "+231", "+218",
		"+423", "+370", "+352", "+261", "+265", "+60", "+960", "+223", "+356",
		"+692", "+222", "+230", "+52", "+691", "+373", "+377", "+976", "+382",
		"+212", "+258", "+95", "+264", "+674", "+977", "+31", "+64", "+505", "+227",
		"+234", "+850", "+389", "+47", "+968", "+92", "+680", "+970", "+507", "+675",
		"+595", "+51", "+63", "+48", "+351", "+974", "+40", "+7", "+250", "+1", "+1",
		"+1", "+685", "+378", "+239", "+966", "+221", "+381", "+248", "+232", "+65",
		"+421", "+386", "+677", "+252", "+27", "+82", "+211", "+34", "+94", "+249",
		"+597", "+268", "+46", "+41", "+963", "+992", "+255", "+66", "+670", "+228",
		"+676", "+1", "+216", "+90", "+993", "+688", "+256", "+380", "+971", "+44",
		"+1", "+598", "+998", "+678", "+58", "+84", "+967", "+260", "+263"
	];



	const [bankField, setBankField] = useState({});
	const [selectedCountry, setSelectedCountry] = useState("");
	const [entityTypeValue, setEntityTypeValue] = useState("");
	const [country, setCountry] = useState("");
	const [countryDialingCode, setCountryDialingCode] = useState("");
	const [selectedTimezone, setSelectedTimezone] = useState(
		Intl.DateTimeFormat().resolvedOptions().timeZone
	)

	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [jobTitle, setJobTitle] = useState('');
	const [lastName, setLastName] = useState('');
	const [phone, setPhone] = useState('');

	// Separate state variables for the second set of fields
	const [companyName, setCompanyName] = useState('');
	const [employeeCount, setEmployeeCount] = useState('');
	const [entityRegistrationNumber, setEntityRegistrationNumber] = useState('');
	const [entityType, setEntityType] = useState('');
	const [studentPerYear, setStudentPerYear] = useState('');
	const [taxNumber, setTaxNumber] = useState('');
	const [yearFounded, setYearFounded] = useState('');
	const [accountNumber, setAccountNumber] = useState('');
	const [bankName, setBankName] = useState('');
	const [confirmNumber, setConfirmNumber] = useState('');
	const [ifsc, setIfsc] = useState('');
	const [name, setName] = useState('');
	const [swiftCode, setSwiftCode] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zipCode, setZipCode] = useState('');
	const [adddressCountry, setAddressCountry] = useState('');

	const [errors, setErrors] = useState();

	const form = useRef(null);

	useEffect(() => {
		if (!selectedCountry) return;
		config(selectedCountry).then(({ bankFields }) => setBankField(bankFields));
	}, [selectedCountry]);

	let debounceTimer;

	const validationSchema = Yup.object({
		personalDetails: Yup.object({
			firstName: Yup.string()
				.required("Required")
				.matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
			lastName: Yup.string()
				.required("Required")
				.matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
			email: Yup.string()
				.email("Please enter a valid email")
				.required("Required"),
			countryCode: Yup.string().nullable().required("Required"),
			phone: Yup.string()
				.matches(phoneRegExp, "Phone number is not valid")
				.required("Required"),
			jobTitle: Yup.string()
				.required("Required")
				.matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
			timezone: Yup.string().nullable().required("Required"),
		}),

		company: Yup.object({
			companyName: Yup.string().required("Required"),
			yearFounded: Yup.string().required("Required"),
			employeeCount: Yup.string().required("Required"),
			studentPerYear: Yup.string().required("Required"),
			entityType: Yup.string().nullable().required("Required"),
			taxNumber: Yup.string()
				.required("Required")
				.matches(/^[a-zA-Z0-9]+$/, "Special characters are not allowed"),
			country: Yup.string().nullable().required("Required"),
		}),

		address: Yup.object({
			address: Yup.string().required("Required"),
			city: Yup.string().required("Required"),
			state: Yup.string().required("Required"),
			zipCode: Yup.string().required("Required"),
			country: Yup.string().nullable().required("Required"),
		}),

		bank: Yup.object({
			name: Yup.string().required("Required"),
			bankName: Yup.string()
				.required("Required")
				.matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
			accountNumber: Yup.string()
				.required("Required")
				.matches(/^[a-zA-Z0-9]+$/, "Special characters are not allowed"),
			confirmNumber: Yup.string()
				.oneOf([Yup.ref("accountNumber"), null], "Account Numbers must match")
				.required("Required"),
			swiftCode: Yup.string()
				.required("Required")
				.matches(
					/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/,
					"Enter valid swift code"
				),
			extraField: Yup.string().required("Required"),
		}),
	});


	const initialValues = {
		personalDetails: {
			firstName: "",
			lastName: "",
			email: "",
			countryCode: countryDialingCode,
			phone: "",
			jobTitle: "",
			timezone: ""
		},

		company: {
			yearFounded: "",
			companyName: "",
			employeeCount: "",
			studentPerYear: "",
			entityType: entityTypeValue,
			taxNumber: "",
			country: country,
			entityRegistrationNumber: ""
		},

		address: {
			address: "",
			city: "",
			state: "",
			zipCode: "",
			country: adddressCountry,
		},

		bank: {
			name: "",
			bankName: "",
			accountNumber: "",
			confirmNumber: "",
			swiftCode: "",
			ifsc: ""
		},
	};
	const validateForm = (values) => {
		const errors = {};
		// Check if all fields are required

		const pd = { ...values.personalDetails }
		Object.keys(pd).forEach((key) => {
			if (!pd[key]) {
				errors[key] = `${_.startCase(key)} is required`;
			}
		});

		Object.keys(values.company).forEach((key) => {
			if (!values.company[key]) {
				errors[key] = `${_.startCase(key)} is required`;
			}
		});

		Object.keys(values.address).forEach((key) => {
			if (!values.address[key]) {
				errors[key] = `${_.startCase(key)} is required`;
			}
		});

		Object.keys(values.bank).forEach((key) => {
			if (!values.bank[key]) {
				errors[key] = `${_.startCase(key)} is required`;
			}
		});

		// Check if email is valid
		if (values.personalDetails.email) {
			if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.personalDetails.email)) {
				errors.email = "Please enter a valid email address";
			}
		}



		// Check if ifsc code is valid
		const ifscReg = /^[A-Z]{4}[0][A-Z0-9]{6}$/;
		if (values.bank?.ifsc) {
			if (!ifscReg.test(values.bank.ifsc)) {
				errors.ifsc = "Please enter a valid ifsc code";
			}
		}

		// Check if swift code is valid
		const swiftReg = /^[A-Z]{4}[-]?[A-Z]{2}[-]?[A-Z0-9]{2}[-]?[0-9]{3}$/;
		if (values.bank?.swiftCode) {
			if (!swiftReg.test(values.bank.swiftCode)) {
				errors.swiftCode = "Please enter a valid swift code";
			}
		}

		// Check if phone number valid
		if (values.personalDetails.phone) {
			const regex = /^\d{10}$/;
			if (!regex.test(values.personalDetails.phone)) {
				errors.phone = "Please enter a valid phone number";
			}
		}

		// check if bank account number matches
		if (values.bank.accountNumber !== values.bank.confirmNumber) {
			errors.confirmNumber = "Account number and confirm number must be similar";
		}

		// Check if password is valid
		// if (values.personalDetails.password) {
		//   if (values.personalDetails.password.length < 8) {
		// 	errors.personalDetails.password = `Password must be at least 8 characters long`;
		//   }
		// }

		setErrors(errors);
		return errors;
	};

	const onSubmit = values => {

		const countryCode = values?.personalDetails?.countryCode
			?.split("(")[1]
			?.split(")")[0];

		verifyEmail(values?.personalDetails?.email).then(res => {
			if (!res) {
				let requestData = {
					...data,
					...values,
					personalDetails: {
						...values.personalDetails,
						timezone: timezone?.filter(
							({ name }) => name === values.personalDetails.timezone
						)[0],
						countryCode,
					},
					bank: {
						name: values?.bank?.name,
						bankName: values?.bank?.bankName,
						accountNumber: values?.bank?.accountNumber,
						confirmNumber: values?.bank?.confirmNumber,
						swiftCode: values?.bank?.swiftCode,
					},
				};

				if (bankField?.key) {
					requestData = {
						...requestData,
						bank: {
							...requestData?.bank,
							extraField: {
								key: bankField?.key,
								value: bankField?.value,
								data: values?.bank?.extraField,
							},
						},
					};
				}


			} else {
				toast.error("Email Already Exists");
			}
		});

		const dataValues = {
			personalDetails: {
				firstName,
				lastName,
				email,
				countryCode: countryDialingCode,
				phone,
				jobTitle,
				timezone
			},

			company: {
				yearFounded,
				companyName,
				employeeCount,
				studentPerYear,
				entityType: entityTypeValue,
				taxNumber,
				country: country,
				entityRegistrationNumber
			},

			address: {
				address,
				city,
				state,
				zipCode,
				country: adddressCountry,
			},

			bank: {
				name,
				bankName,
				accountNumber,
				confirmNumber,
				swiftCode,
				ifsc
			},
		};

		if (_.isEmpty(validateForm(dataValues))) {
			let requestData = {
				...data,
				...dataValues,
				personalDetails: {
					...dataValues.personalDetails,
					timezone: {
						time_zone: "sunt",
						utc_offset: "est ea Lorem",
						name: "ut"
					},
				},
				bank: {
					name: dataValues?.bank?.name,
					bankName: dataValues?.bank?.bankName,
					accountNumber: dataValues?.bank?.accountNumber,
					confirmNumber: dataValues?.bank?.confirmNumber,
					swiftCode: dataValues?.bank?.swiftCode,
					extraField: {
						"key": "ifsc",
						"value": "IFSC Code",
						"data": dataValues?.bank?.ifsc
					}
				},
			};

			setData(requestData);
			nextStep();

		}
	};

	return (
		<Box width={{ xs: "unset", sm: "60vw" }} maxHeight='80vh' overflow='auto'>
			<Formik
				enableReinitialize
				initialValues={initialValues}
				// validationSchema={validationSchema}
				onSubmit={onSubmit}
				innerRef={form}>
				<Form>
					<Box display='flex' flexDirection='column' gap='1rem'>
						<Box bgcolor='#f5f5f5' p='1rem 1.25rem' borderRadius='0.625rem'>
							<Typography fontSize='1rem' fontWeight={500} color='#f37b21'>
								PERSONAL DETAILS
							</Typography>

							<Grid container spacing={1} mt={0}>
								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										name='personalDetails.firstName'
										label='First Name'
										error={Boolean(errors?.firstName)}
										helperText={errors?.firstName}
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										name='personalDetails.lastName'
										label='Last Name'
										error={Boolean(errors?.lastName)}
										helperText={errors?.lastName}
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										name='personalDetails.email'
										label='Work Email'
										type='email'
										error={Boolean(errors?.email)}
										helperText={errors?.email}
										value={email}
										onChange={({ target: { value } }) => {
											const { current: { setFieldValue } = {} } = form || {};

											setFieldValue("personalDetails.email", value);
											setEmail(value);

											if (!value) return;

											// if (debounceTimer) clearTimeout(debounceTimer);
											// debounceTimer = setTimeout(() => {
											// 	debounceTimer = null;

											// 	verifyEmail(value).then(res => {
											// 		if (res) toast.error("Email Already Exists");
											// 	});
											// }, 2000);
										}}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>

									<Field name='personalDetails.countryCode'>
										{props => {
											const { field, meta } = props || {};
											return (
												<div style={{ display: "flex", justifyContent:"center", alignItems:"center" }}>
													<FormControl sx={{ width: "90px" }}>
														<InputLabel sx={{mt: -1, fontSize: "14px"}} id="entity-label">Code</InputLabel>
														<Select
															sx={{ width: "90px", height:"37px" }}
															name='company.countryCode'
															labelId="entity-label"
															label="Code"
															error={Boolean(errors?.countryCode)}
															helperText={errors?.countryCode}
															size="small"
															value={countryDialingCode ?? null}
															onChange={(e) => setCountryDialingCode(e.target.value)}
														>
															{countryDialingCodes.map(code =>
																<MenuItem value={code} >{code}</MenuItem>
															)}
														</Select>
													</FormControl>
													{/* <DropdownWithSearch
														style={{ width: "70px" }}
														name={field.name}
														placeholder='Country Code'
														options={countryDialingCodes?.map(
															(code) => `${code}`
														)}
														value={field.value}
														handleOnChange={({ key, value }) => {
															field.onChange({
																target: { name: key, value },
															});
														}}
														inputProps={{
															error: meta.touched && meta.error ? true : false,
															helperText:
																meta.touched && meta.error ? meta.error : null,
														}}></DropdownWithSearch> */}

													<FieldInput
														name='personalDetails.phone'
														label='Contact Number'
														style={{ marginLeft: "23px" }}
														type='tel'
														error={Boolean(errors?.phone)}
														helperText={errors?.phone}
														value={phone}
														onChange={(e) => setPhone(e.target.value)}
													/>
												</div>
											);
										}}
									</Field>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										name='personalDetails.jobTitle'
										label='Job Title'
										// style={{ marginLeft: "23px" }}
										error={Boolean(errors?.jobTitle)}
										helperText={errors?.jobTitle}
										value={jobTitle}
										onChange={(e) => setJobTitle(e.target.value)}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<TimezoneSelect
										name='personalDetails.timezone'
										label='Time Zone'
										value={selectedTimezone}
										onChange={setSelectedTimezone}
										error={Boolean(errors?.timezone)}
										helperText={errors?.timezone}
									/>
									{/* <FieldInput
										name='personalDetails.timezone'
										label='Time Zone'
										error={Boolean(errors?.timezone)}
										helperText={errors?.timezone}
									/> */}
								</Grid>
							</Grid>
						</Box>

						<Box bgcolor='#f5f5f5' p='1rem 1.25rem' borderRadius='0.625rem'>
							<Typography fontSize='1rem' fontWeight={500} color='#f37b21'>
								COMPANY DETAILS
							</Typography>

							<Grid container spacing={1} mt={0}>
								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										name='company.companyName'
										label='Company Name'
										error={Boolean(errors?.companyName)}
										helperText={errors?.companyName}
										value={companyName}
										onChange={(e) => setCompanyName(e.target.value)}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										type='number'
										name='company.yearFounded'
										label='Year Founded'
										error={Boolean(errors?.yearFounded)}
										helperText={errors?.yearFounded}
										value={yearFounded}
										onChange={(e) => setYearFounded(e.target.value)}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										type='number'
										name='company.employeeCount'
										label='Employee Count'
										error={Boolean(errors?.employeeCount)}
										helperText={errors?.employeeCount}
										value={employeeCount}
										onChange={(e) => setEmployeeCount(e.target.value)}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										type='number'
										name='company.studentPerYear'
										label='Students per Year'
										error={Boolean(errors?.studentPerYear)}
										helperText={errors?.studentPerYear}
										value={studentPerYear}
										onChange={(e) => setStudentPerYear(e.target.value)}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FormControl fullWidth>
										<InputLabel sx={{mt: -1, fontSize: "14px"}} id="entity-label">Entity Type</InputLabel>
										<Select
											sx={{height:"37px" }}
											name='company.entityType'
											labelId="entity-label"
											label="Entity Type"
											error={Boolean(errors?.entityType)}
											helperText={errors?.entityType}
											fullWidth
											size="small"
											value={entityTypeValue ?? null}
											onChange={(e) => setEntityTypeValue(e.target.value)}
										>
											{enityTypeOption.map(entityType =>
												<MenuItem value={entityType} >{entityType}</MenuItem>
											)}
										</Select>
									</FormControl>
									{/* <FieldInput
										type='text'
										name='company.entityType'
										label='Entity Type'
										error={Boolean(errors?.entityType)}
										helperText={errors?.entityType}
									/> */}
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										name='company.taxNumber'
										label='GST/ VAT/ Tax Number'
										error={Boolean(errors?.taxNumber)}
										helperText={errors?.taxNumber}
										value={taxNumber}
										onChange={({ target: { value } }) => {
											const { current: { setFieldValue } = {} } = form || {};
											setTaxNumber(value)
											setFieldValue("company.taxNumber", value?.toUpperCase());
										}}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										name='company.entityRegistrationNumber'
										label='Entity Registration Number'
										error={Boolean(errors?.entityRegistrationNumber)}
										helperText={errors?.entityRegistrationNumber}
										value={entityRegistrationNumber}
										onChange={({ target: { value } }) => {
											const { current: { setFieldValue } = {} } = form || {};
											setEntityRegistrationNumber(value);
											setFieldValue("company.entityRegistrationNumber", value?.toUpperCase());
										}}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FormControl fullWidth>
										<InputLabel sx={{mt: -1, fontSize: "14px"}} id="entity-label">Registered Country</InputLabel>
										<Select
											sx={{height:"37px" }}
											labelId="entity-label"
											name='company.country'
											label='Registered Country'
											error={Boolean(errors?.country)}
											helperText={errors?.country}
											fullWidth
											size="small"
											value={country ?? null}
											onChange={(e) => setCountry(e.target.value)}
										>
											{countryList.map(country =>
												<MenuItem value={country} >{country}</MenuItem>
											)}
										</Select>
									</FormControl>
									{/* <FieldInput
										type='text'
										name='company.country'
										label='Registered Country'
										error={Boolean(errors?.country)}
										helperText={errors?.country}
									/> */}
								</Grid>
							</Grid>
						</Box>

						<Box bgcolor='#f5f5f5' p='1rem 1.25rem' borderRadius='0.625rem'>
							<Typography fontSize='1rem' fontWeight={500} color='#f37b21'>
								ADDRESS
							</Typography>

							<Grid container spacing={1} mt={0}>
								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										name='address.address'
										label='Address'
										error={Boolean(errors?.address)}
										helperText={errors?.address}
										value={address}
										onChange={(e) => setAddress(e.target.value)}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										type='number'
										name='address.zipCode'
										error={Boolean(errors?.zipCode)}
										helperText={errors?.zipCode}
										placeholder='Postal Code'
										value={zipCode}
										onChange={({ target: { value } }) => {
											const { current: { setFieldValue } = {} } = form || {};
											setZipCode(value)
											setFieldValue("address.zipCode", value);

											if (!value) return;

											// if (debounceTimer) clearTimeout(debounceTimer);
											// debounceTimer = setTimeout(() => {
											// 	debounceTimer = null;
											// 	getPincodeData(value).then(
											// 		({ city, state, country }) => {
											// 			setFieldValue("address.city", city);
											// 			setFieldValue("address.state", state);
											// 			setFieldValue("address.country", country);
											// 		}
											// 	);
											// }, 2000);
										}}
									/>
								</Grid>

								<Grid item md={4} sm={4} xs={12}>
									<FieldInput
										name='address.city'
										label='City'
										error={Boolean(errors?.city)}
										helperText={errors?.city}
										value={city}
										onChange={(e) => setCity(e.target.value)}
									/>
								</Grid>

								<Grid item md={4} sm={4} xs={12}>
									<FieldInput
										name='address.state'
										label='State'
										error={Boolean(errors?.state)}
										helperText={errors?.state}
										value={state}
										onChange={(e) => setState(e.target.value)}
									/>
								</Grid>

								<Grid item md={4} sm={4} xs={12}>
									<FormControl fullWidth>
										<InputLabel sx={{mt: -1, fontSize: "14px"}} id="entity-label"> Country</InputLabel>
										<Select
											sx={{height:"37px" }}
											labelId="entity-label"
											name='address.addressCountry'
											label='Country'
											error={Boolean(errors?.country)}
											helperText={errors?.country}
											fullWidth
											size="small"
											value={adddressCountry ?? null}
											onChange={(e) => setAddressCountry(e.target.value)}
										>
											{countryList.map(country =>
												<MenuItem value={country} >{country}</MenuItem>
											)}
										</Select>
									</FormControl>

									{/* <FieldInput
										name='address.country'
										label='Country'
										error={Boolean(errors?.country)}
										helperText={errors?.country}
										value={adddressCountry}
										onChange={(e)=> setAddressCountry(e.target.value)}
									/> */}
								</Grid>
							</Grid>
						</Box>

						<Box bgcolor='#f5f5f5' p='1rem 1.25rem' borderRadius='0.625rem'>
							<Typography fontSize='1rem' fontWeight={500} color='#f37b21'>
								BANK DETAILS
							</Typography>

							<Grid container spacing={1} mt={0}>
								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										name='bank.name'
										label='Account Holder Name'
										error={Boolean(errors?.name)}
										helperText={errors?.name}
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										name='bank.bankName'
										label='Bank Name'
										error={Boolean(errors?.bankName)}
										helperText={errors?.bankName}
										value={bankName}
										onChange={(e) => setBankName(e.target.value)}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										name='bank.accountNumber'
										label='Account Number'
										error={Boolean(errors?.accountNumber)}
										helperText={errors?.accountNumber}
										value={accountNumber}
										onChange={(e) => setAccountNumber(e.target.value)}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										name='bank.confirmNumber'
										label='Confirm Account Number'
										error={Boolean(errors?.confirmNumber)}
										helperText={errors?.confirmNumber}
										value={confirmNumber}
										onChange={(e) => setConfirmNumber(e.target.value)}
									/>
								</Grid>
								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										name='bank.ifsc'
										label='IFSC Code'
										error={Boolean(errors?.ifsc)}
										helperText={errors?.ifsc}
										value={ifsc}
										onChange={(e) => setIfsc(e.target.value)}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12}>
									<FieldInput
										name='bank.swiftCode'
										label='Swift Code'
										error={Boolean(errors?.swiftCode)}
										helperText={errors?.swiftCode}
										value={swiftCode}
										onChange={({ target: { value } }) => {
											const { current: { setFieldValue } = {} } = form || {};
											setSwiftCode(value);
											setFieldValue("bank.swiftCode", value?.toUpperCase());
										}}
									/>
								</Grid>

								{bankField?.key && (
									<Grid item md={6} sm={6} xs={12}>
										<FieldInput
											name='bank.ifsc'
											error={Boolean(errors?.ifsc)}
											helperText={errors?.ifsc}
											label={`${bankField.value}`}
											onChange={({ target: { value } }) => {
												const { current: { setFieldValue } = {} } = form || {};

												setFieldValue("bank.ifsc", value?.toUpperCase());
											}}
										/>
									</Grid>
								)}
							</Grid>
						</Box>

						<Box display='flex' justifyContent='right' m='1rem 0'>
							<Button
								variant='contained'
								size='small'
								type='submit'
								sx={{
									textTransform: "none",
									bgcolor: "#f37b21 !important",
									borderRadius: "32px",
									width: "140px",
									height: "40px",
								}}>
								Save and Next
							</Button>
						</Box>
					</Box>
				</Form>
			</Formik>
		</Box>
	);
};

export default Step1;
