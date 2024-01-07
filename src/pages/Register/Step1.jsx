import { makeStyles } from "@material-ui/core/styles";
import {
	Button,
	Checkbox,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { config, signup } from "apis/auth";
import axios from "axios";
import FieldInput from "components/FieldInput";
import { Field, Form, Formik } from "formik";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allTimezones, useTimezoneSelect } from "react-timezone-select";
import { phoneRegExp } from "utils/validations";
import * as Yup from "yup";
import style from "./style.module.scss";

import Loader from "components/Loader";
import countryCodes from "country-codes-list";
const codesObject = countryCodes.customList(
	"countryCode",
	"+{countryCallingCode}"
);

const myCountryCodesObject = Object.keys(codesObject).map(
	code => codesObject[code]
);

const countryCodesArr = removeDuplicates(myCountryCodesObject);

function removeDuplicates(arr) {
	let unique = [];
	for (let i = 0; i < arr.length; i++) {
		if (unique.indexOf(arr[i]) === -1) {
			unique.push(arr[i]);
		}
	}
	return unique.sort();
}

const useStyles = makeStyles({
	gridItem: {
		height: "60px",
	},
});

const Step1 = ({ data, setData, nextStep }) => {
	// http://52.66.213.63:4433/api/auth/config?country=India
	const classes = useStyles();
	const { app: { countries = [], timezone = [] } = {} } = useSelector(
		state => state
	);
	const dispatch = useDispatch();
	const labelStyle = "original";
	const timezones = {
		...allTimezones,
		"America/Lima": "Pittsburgh",
		"Europe/Berlin": "Frankfurt",
	};
	const enityTypeOption = [
		"Private",
		"Partnership",
		"Trust",
		"Proprietor",
		"Individual",
	];
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
		"Zimbabwe",
	];
	const countryDialingCodes = [
		"+93",
		"+355",
		"+213",
		"+376",
		"+244",
		"+1",
		"+54",
		"+374",
		"+61",
		"+43",
		"+994",
		"+1",
		"+973",
		"+880",
		"+1",
		"+375",
		"+32",
		"+501",
		"+229",
		"+975",
		"+591",
		"+387",
		"+267",
		"+55",
		"+673",
		"+359",
		"+226",
		"+257",
		"+225",
		"+238",
		"+855",
		"+237",
		"+1",
		"+236",
		"+235",
		"+56",
		"+86",
		"+57",
		"+269",
		"+242",
		"+506",
		"+385",
		"+53",
		"+357",
		"+420",
		"+243",
		"+45",
		"+253",
		"+1",
		"+1",
		"+593",
		"+20",
		"+503",
		"+240",
		"+291",
		"+372",
		"+268",
		"+251",
		"+679",
		"+358",
		"+33",
		"+241",
		"+220",
		"+995",
		"+49",
		"+233",
		"+30",
		"+1",
		"+502",
		"+224",
		"+245",
		"+592",
		"+509",
		"+379",
		"+504",
		"+36",
		"+354",
		"+91",
		"+62",
		"+98",
		"+964",
		"+353",
		"+972",
		"+39",
		"+1",
		"+81",
		"+962",
		"+7",
		"+254",
		"+686",
		"+965",
		"+996",
		"+856",
		"+371",
		"+961",
		"+266",
		"+231",
		"+218",
		"+423",
		"+370",
		"+352",
		"+261",
		"+265",
		"+60",
		"+960",
		"+223",
		"+356",
		"+692",
		"+222",
		"+230",
		"+52",
		"+691",
		"+373",
		"+377",
		"+976",
		"+382",
		"+212",
		"+258",
		"+95",
		"+264",
		"+674",
		"+977",
		"+31",
		"+64",
		"+505",
		"+227",
		"+234",
		"+850",
		"+389",
		"+47",
		"+968",
		"+92",
		"+680",
		"+970",
		"+507",
		"+675",
		"+595",
		"+51",
		"+63",
		"+48",
		"+351",
		"+974",
		"+40",
		"+7",
		"+250",
		"+1",
		"+1",
		"+1",
		"+685",
		"+378",
		"+239",
		"+966",
		"+221",
		"+381",
		"+248",
		"+232",
		"+65",
		"+421",
		"+386",
		"+677",
		"+252",
		"+27",
		"+82",
		"+211",
		"+34",
		"+94",
		"+249",
		"+597",
		"+268",
		"+46",
		"+41",
		"+963",
		"+992",
		"+255",
		"+66",
		"+670",
		"+228",
		"+676",
		"+1",
		"+216",
		"+90",
		"+993",
		"+688",
		"+256",
		"+380",
		"+971",
		"+44",
		"+1",
		"+598",
		"+998",
		"+678",
		"+58",
		"+84",
		"+967",
		"+260",
		"+263",
	];

	const { options, parseTimezone } = useTimezoneSelect({
		labelStyle,
		timezones,
	});

	const [bankField, setBankField] = useState({});
	const [selectedCountry, setSelectedCountry] = useState("");
	const [entityTypeValue, setEntityTypeValue] = useState("");
	const [country, setCountry] = useState("");
	const [countryDialingCode, setCountryDialingCode] = useState("");
	const [selectedTimezone, setSelectedTimezone] = useState("");

	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [jobTitle, setJobTitle] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");

	// Separate state variables for the second set of fields
	const [companyName, setCompanyName] = useState("");
	const [employeeCount, setEmployeeCount] = useState("");
	const [entityRegistrationNumber, setEntityRegistrationNumber] = useState("");
	const [entityType, setEntityType] = useState("");
	const [studentPerYear, setStudentPerYear] = useState("");
	const [taxNumber, setTaxNumber] = useState("");
	const [yearFounded, setYearFounded] = useState("");
	const [accountNumber, setAccountNumber] = useState("");
	const [bankName, setBankName] = useState("");
	const [confirmNumber, setConfirmNumber] = useState("");
	const [extraFieldValue, setExtraFieldValue] = useState("");
	const [name, setName] = useState("");
	const [swiftCode, setSwiftCode] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [adddressCountry, setAddressCountry] = useState("");
	const [bankFields, setBankFields] = useState();

	const [showLoader, setShowLoader] = useState(false);

	const [conditions, setConditions] = useState({
		condition1: false,
		condition2: false,
		condition3: false,
		condition4: false,
		condition5: false,
	});

	const [confPasswordError, setConfirmpasswordError] = useState("");
	const [password, setPassword] = useState();
	const [confPassword, setConfPassword] = useState();

	const calculateConditions = password => {
		setConditions({
			condition1: password.length >= 12,
			condition2: /[!@#$%^&*]/.test(password),
			condition3: /^(?=.*[a-z])(?=.*[A-Z])/.test(password),
			condition4: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(password),
		});
	};

	const validatePassword = password => {
		return (
			password.length >= 12 &&
			/[!@#$%^&*]/.test(password) &&
			/^(?=.*[a-z])(?=.*[A-Z])/.test(password) &&
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(password)
		);
	};

	useEffect(() => {
		if (country) {
			loadField();
		}
	}, [country]);

	const loadField = async () => {
		try {
			const response = await axios.get(
				`http://52.66.213.63:4433/api/auth/config?country=${country}`
			);
			setBankField(response.data.data.bankFields);
		} catch (err) {
			console.error(err);
		}
	};

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
			timezone: "",
		},

		company: {
			yearFounded: "",
			companyName: "",
			employeeCount: "",
			studentPerYear: "",
			entityType: entityTypeValue,
			taxNumber: "",
			country: country,
			entityRegistrationNumber: "",
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
			extraFieldValue: "",
		},
	};
	const validateForm = values => {
		const errors = {};
		// Check if all fields are required
		//values.address.country == 'India' ? delete values.bank.swiftCode : delete values.bank.extraFieldValue
		const pd = { ...values.personalDetails };

		Object.keys(pd).forEach(key => {
			if (!pd[key]) {
				errors[key] = `${_.startCase(key)} is required`;
			}
		});

		Object.keys(values.company).forEach(key => {
			if (!values.company[key]) {
				errors[key] = `${_.startCase(key)} is required`;
			}
		});

		Object.keys(values.address).forEach(key => {
			if (!values.address[key]) {
				errors[key] = `${_.startCase(key)} is required`;
			}
		});

		Object.keys(values.bank).forEach(key => {
			if (!values.bank[key]) {
				errors[key] = `${_.startCase(key)} is required`;
			}
		});

		// Check if email is valid
		if (values.personalDetails.email) {
			if (
				!/^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
					values.personalDetails.email
				)
			) {
				errors.email = "Please enter a valid email address";
			}
		}

		// Check if extraFieldValue code is valid
		// const ifscReg = /^[A-Z]{4}[0][A-Z0-9]{6}$/;
		// if (values.bank?.extraFieldValue) {
		// 	if (!ifscReg.test(values.bank.extraFieldValue)) {
		// 		errors.extraFieldValue = "Please enter a valid extraFieldValue code";
		// 	}
		// }

		// Check if swift code is valid
		//const swiftReg = /^[A-Z]{4}[-]?[A-Z]{2}[-]?[A-Z0-9]{2}[-]?[0-9]{3}$/;
		const swiftReg = /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
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
			errors.confirmNumber =
				"Account number and confirm number must be similar";
		}
		// check if zip code matches
		if (values.address.zipCode) {
			const regex = /^[a-zA-Z0-9 ]*$/;
			if (!regex.test(values.address.zipCode)) {
				errors.zipCode = "Please enter a valid Zip Code";
			}
		}
		// Check if password is valid
		if (!password) {
			errors.password = `Password field must not be empty`;
		}
		if (password !== confPassword) {
			setConfirmpasswordError("Password and confirm password are not same");
			errors.confPassword = `Password and confirm password are not same`;
		}

		if (password && !validatePassword(password)) {
			errors.password = `Password must have a mix of capital small, numeric and special characters`;
		}

		setErrors(errors);
		return errors;
	};

	// useEffect(() => {
	// 	if (adddressCountry !== "India") {
	// 		setExtraFieldValue("HDFC0000128");
	// 	}
	// }, [adddressCountry])

	// useEffect(()=> {
	// 	if(email){
	// 		setTimeout(()=> {
	// 			verifyEmail(email).then(res => {
	// 				if (!res) {
	// 					let requestData = {
	// 						...data,
	// 						...values,
	// 						personalDetails: {
	// 							...values.personalDetails,
	// 							timezone: timezone?.filter(
	// 								({ name }) => name === values.personalDetails.timezone
	// 							)[0],
	// 							countryCode,
	// 						},
	// 						bank: {
	// 							name: values?.bank?.name,
	// 							bankName: values?.bank?.bankName,
	// 							accountNumber: values?.bank?.accountNumber,
	// 							confirmNumber: values?.bank?.confirmNumber,
	// 							swiftCode: values?.bank?.swiftCode,
	// 						},
	// 					};

	// 					if (bankField?.key) {
	// 						requestData = {
	// 							...requestData,
	// 							bank: {
	// 								...requestData?.bank,
	// 								extraField: {
	// 									key: bankField?.key,
	// 									value: bankField?.value,
	// 									data: values?.bank?.extraField,
	// 								},
	// 							},
	// 						};
	// 					}

	// 				} else {
	// 					toast.error("Email Already Exists");
	// 				}
	// 			});
	// 		}, 1000)
	// 	}
	// },[email])

	const onSubmit = values => {
		const countryCode = values?.personalDetails?.countryCode
			?.split("(")[1]
			?.split(")")[0];

		var dataValues = {
			personalDetails: {
				firstName,
				lastName,
				email,
				countryCode: countryDialingCode,
				phone,
				jobTitle,
				timezone,
			},

			company: {
				yearFounded,
				companyName,
				employeeCount,
				studentPerYear,
				entityType: entityTypeValue,
				taxNumber,
				country: country,
				entityRegistrationNumber,
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
				extraFieldValue,
			},
			password,
		};

		if (_.isEmpty(validateForm(dataValues))) {
			setShowLoader(true);
			// dispatch(setLoader(true));
			let requestData = {
				...data,
				...dataValues,
				personalDetails: {
					...dataValues.personalDetails,
					timezone: {
						time_zone: "sunt",
						utc_offset: "est ea Lorem",
						name: "ut",
					},
				},
				bank: {
					name: dataValues?.bank?.name,
					bankName: dataValues?.bank?.bankName,
					accountNumber: dataValues?.bank?.accountNumber,
					confirmNumber: dataValues?.bank?.confirmNumber,
				},
			};
			let extraField = {
				key: bankField.key,
				value: bankField.value,
				data: extraFieldValue,
			};
			let swiftCode = dataValues?.bank?.swiftCode;
			//dataValues?.address?.country == "India" ? requestData.bank.extraField = extraField :
			requestData.bank.swiftCode = swiftCode;
			setData(requestData);

			const reqData = { ...data, password: values.password };
			signup(requestData)
				.then(res => {
					nextStep();
					setShowLoader(false);
					localStorage.setItem("docUploaded", false);
				})
				.catch(() => setShowLoader(false));
		}
	};

	if (showLoader) {
		return <Loader />;
	}

	return (
		<Box marginBottom={"60px"}>
			<Formik
				enableReinitialize
				initialValues={initialValues}
				// validationSchema={validationSchema}
				onSubmit={onSubmit}
				innerRef={form}>
				<Form>
					<Box display='flex' flexDirection='column' gap='1rem'>
						<Box bgcolor='#FBFBFB' p='2.5rem' pb='4rem' borderRadius='0.625rem'>
							<Typography fontSize='1.2rem' fontWeight={600} color='#2A2A2A'>
								Personal Details
							</Typography>
							<Typography
								fontSize='14px'
								fontWeight={400}
								color='rgba(0, 0, 0, 0.6)'>
								Details of the individual
							</Typography>

							<Grid container spacing={2} rowGap={"24px"} mt={"6px"}>
								<Grid item md={6} sm={6} xs={12} className={classes.gridItem}>
									<FieldInput
										size='large'
										name='personalDetails.firstName'
										label='First Name'
										error={Boolean(errors?.firstName)}
										helperText={errors?.firstName}
										value={firstName}
										onChange={e => setFirstName(e.target.value)}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12} className={classes.gridItem}>
									<FieldInput
										size='large'
										name='personalDetails.lastName'
										label='Last Name'
										error={Boolean(errors?.lastName)}
										helperText={errors?.lastName}
										value={lastName}
										onChange={e => setLastName(e.target.value)}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12} className={classes.gridItem}>
									<FieldInput
										size='large'
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

								<Grid item md={6} sm={6} xs={12} className={classes.gridItem}>
									<Field name='personalDetails.countryCode'>
										{props => {
											const { field, meta } = props || {};
											return (
												<Box
													style={{
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
														gap: "8px",
													}}>
													<FormControl
														sx={{
															width: "150px",
															height: "52px",
															marginBottom: !errors?.phone ? "0" : "24px",
														}}>
														<InputLabel
															sx={{
																paddingInline: "2px",
																fontSize: "0.825rem",
															}}
															id='entity-label'>
															Country
														</InputLabel>
														<Select
															sx={{
																height: "52px",
																fontSize: "0.825rem",
															}}
															name='company.countryCode'
															labelId='entity-label'
															label='Code'
															error={Boolean(errors?.countryCode)}
															helperText={errors?.countryCode}
															size='large'
															value={countryDialingCode ?? null}
															onChange={e =>
																setCountryDialingCode(e.target.value)
															}>
															{countryCodesArr.map((code, index) => (
																<MenuItem value={code} key={index}>
																	{code}
																</MenuItem>
															))}
														</Select>
													</FormControl>

													<FieldInput
														size='large'
														name='personalDetails.phone'
														label='Contact Number'
														type='number'
														error={Boolean(errors?.phone)}
														helperText={errors?.phone}
														value={phone}
														onChange={e => setPhone(e.target.value)}
													/>
												</Box>
											);
										}}
									</Field>
								</Grid>

								<Grid item md={6} sm={6} xs={12} className={classes.gridItem}>
									<FieldInput
										size='large'
										name='personalDetails.jobTitle'
										label='Job Title'
										error={Boolean(errors?.jobTitle)}
										helperText={errors?.jobTitle}
										value={jobTitle}
										onChange={e => setJobTitle(e.target.value)}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12} className={classes.gridItem}>
									<FormControl fullWidth>
										<InputLabel
											sx={{
												fontSize: "14px",
												paddingInline: "6px",
											}}
											id='entity-label'>
											Time Zone
										</InputLabel>
										<Select
											size='small'
											sx={{ height: "52px", fontSize: "0.825rem" }}
											onChange={e => setSelectedTimezone(e.target.value)}
											value={selectedTimezone ?? null}
											error={Boolean(errors?.timezone)}
											helperText={errors?.timezone}>
											{options.map((option, index) => (
												<MenuItem value={option.value} key={index}>
													{option.label}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
							</Grid>
						</Box>

						<Box bgcolor='#FBFBFB' p='2.5rem' pb='4rem' borderRadius='0.625rem'>
							<Typography fontSize='1.2rem' fontWeight={600} color='#2A2A2A'>
								Company Details
							</Typography>
							<Typography
								fontSize='14px'
								fontWeight={400}
								color='rgba(0, 0, 0, 0.6)'>
								Details of the registered company
							</Typography>

							<Grid container spacing={2} rowGap={"24px"} mt={"6px"}>
								<Grid item md={6} sm={6} xs={12} className={classes.gridItem}>
									<FieldInput
										size='large'
										name='company.companyName'
										label='Company Name'
										error={Boolean(errors?.companyName)}
										helperText={errors?.companyName}
										value={companyName}
										onChange={e => setCompanyName(e.target.value)}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12} className={classes.gridItem}>
									<FieldInput
										size='large'
										type='number'
										name='company.yearFounded'
										label='Year Founded'
										error={Boolean(errors?.yearFounded)}
										helperText={errors?.yearFounded}
										value={yearFounded}
										onChange={e => setYearFounded(e.target.value)}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12} className={classes.gridItem}>
									<FieldInput
										size='large'
										type='number'
										name='company.employeeCount'
										label='Employee Count'
										error={Boolean(errors?.employeeCount)}
										helperText={errors?.employeeCount}
										value={employeeCount}
										onChange={e => setEmployeeCount(e.target.value)}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12} className={classes.gridItem}>
									<FieldInput
										size='large'
										type='number'
										name='company.studentPerYear'
										label='Students per Year'
										error={Boolean(errors?.studentPerYear)}
										helperText={errors?.studentPerYear}
										value={studentPerYear}
										onChange={e => setStudentPerYear(e.target.value)}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12} className={classes.gridItem}>
									<FormControl fullWidth>
										<InputLabel
											sx={{
												paddingInline: "2px",
												fontSize: "14px",
											}}
											id='entity-label'>
											Entity Type
										</InputLabel>
										<Select
											sx={{ height: "52px", fontSize: "0.825rem" }}
											name='company.entityType'
											labelId='entity-label'
											label='Entity Type'
											error={Boolean(errors?.entityType)}
											helperText={errors?.entityType}
											fullWidth
											size='small'
											value={entityTypeValue ?? null}
											onChange={e => setEntityTypeValue(e.target.value)}>
											{enityTypeOption.map((entityType, index) => (
												<MenuItem value={entityType} key={index}>
													{entityType}
												</MenuItem>
											))}
										</Select>
									</FormControl>
									{/* <FieldInput
									size='large'
										type='text'
										name='company.entityType'
										label='Entity Type'
										error={Boolean(errors?.entityType)}
										helperText={errors?.entityType}
									/> */}
								</Grid>

								<Grid item md={6} sm={6} xs={12} className={classes.gridItem}>
									<FieldInput
										size='large'
										name='company.taxNumber'
										label='GST/ VAT/ Tax Number'
										error={Boolean(errors?.taxNumber)}
										helperText={errors?.taxNumber}
										value={taxNumber}
										onChange={({ target: { value } }) => {
											const { current: { setFieldValue } = {} } = form || {};
											setTaxNumber(value);
											setFieldValue("company.taxNumber", value?.toUpperCase());
										}}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12} className={classes.gridItem}>
									<FieldInput
										size='large'
										name='company.entityRegistrationNumber'
										label='Entity Registration Number'
										error={Boolean(errors?.entityRegistrationNumber)}
										helperText={errors?.entityRegistrationNumber}
										value={entityRegistrationNumber}
										onChange={({ target: { value } }) => {
											const { current: { setFieldValue } = {} } = form || {};
											setEntityRegistrationNumber(value);
											setFieldValue(
												"company.entityRegistrationNumber",
												value?.toUpperCase()
											);
										}}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12} className={classes.gridItem}>
									<FormControl fullWidth>
										<InputLabel sx={{ fontSize: "14px" }} id='entity-label'>
											Registered Country
										</InputLabel>
										<Select
											sx={{ height: "52px", fontSize: "0.825rem" }}
											labelId='entity-label'
											name='company.country'
											label='Registered Country'
											error={Boolean(errors?.country)}
											helperText={errors?.country}
											fullWidth
											size='small'
											value={country ?? null}
											onChange={e => setCountry(e.target.value)}>
											{countryList.map((country, index) => (
												<MenuItem value={country} key={index}>
													{country}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
							</Grid>
						</Box>

						<Box bgcolor='#FBFBFB' p='2.5rem' pb='4rem' borderRadius='0.625rem'>
							<Typography fontSize='1.2rem' fontWeight={600} color='#2A2A2A'>
								Address
							</Typography>
							<Typography
								fontSize='14px'
								fontWeight={400}
								color='rgba(0, 0, 0, 0.6)'>
								Details where company registered in
							</Typography>

							<Grid container spacing={2} rowGap={"24px"} mt={"6px"}>
								<Grid item md={6} sm={6} xs={12} className={classes.gridItem}>
									<FieldInput
										size='large'
										name='address.address'
										label='Address'
										error={Boolean(errors?.address)}
										helperText={errors?.address}
										value={address}
										onChange={e => setAddress(e.target.value)}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12} className={classes.gridItem}>
									<FieldInput
										size='large'
										type='text'
										name='address.zipCode'
										error={Boolean(errors?.zipCode)}
										helperText={errors?.zipCode}
										placeholder='Postal Code'
										value={zipCode}
										onChange={({ target: { value } }) => {
											const { current: { setFieldValue } = {} } = form || {};
											setZipCode(value);
											setFieldValue("address.zipCode", value);

											if (!value) return;
										}}
									/>
								</Grid>

								<Grid item md={4} sm={4} xs={12} className={classes.gridItem}>
									<FieldInput
										size='large'
										name='address.city'
										label='City'
										error={Boolean(errors?.city)}
										helperText={errors?.city}
										value={city}
										onChange={e => setCity(e.target.value)}
									/>
								</Grid>

								<Grid item md={4} sm={4} xs={12} className={classes.gridItem}>
									<FieldInput
										size='large'
										name='address.state'
										label='State'
										error={Boolean(errors?.state)}
										helperText={errors?.state}
										value={state}
										onChange={e => setState(e.target.value)}
									/>
								</Grid>

								<Grid item md={4} sm={4} xs={12} className={classes.gridItem}>
									<FormControl fullWidth>
										<InputLabel
											sx={{
												bgcolor: "#FBFBFB",
												paddingInline: "2px",
												fontSize: "14px",
											}}
											id='entity-label'>
											{" "}
											Country
										</InputLabel>
										<Select
											sx={{ height: "52px", fontSize: "0.825rem" }}
											labelId='entity-label'
											name='address.addressCountry'
											label='Country'
											error={Boolean(errors?.country)}
											helperText={errors?.country}
											fullWidth
											size='small'
											value={adddressCountry ?? null}
											onChange={e => setAddressCountry(e.target.value)}>
											{countryList.map((country, index) => (
												<MenuItem value={country} key={index}>
													{country}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Grid>
							</Grid>
						</Box>

						<Box bgcolor='#FBFBFB' p='2.5rem' pb='4rem' borderRadius='0.625rem'>
							<Typography fontSize='1.2rem' fontWeight={600} color='#2A2A2A'>
								Bank Details
							</Typography>
							<Typography
								fontSize='14px'
								fontWeight={400}
								color='rgba(0, 0, 0, 0.6)'>
								To receive your money in
							</Typography>

							<Grid container spacing={2} rowGap={"24px"} mt={"6px"}>
								<Grid item md={6} sm={6} xs={12} className={classes.gridItem}>
									<FieldInput
										size='large'
										name='bank.name'
										label='Account Holder Name'
										error={Boolean(errors?.name)}
										helperText={errors?.name}
										value={name}
										onChange={e => setName(e.target.value)}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12} className={classes.gridItem}>
									<FieldInput
										size='large'
										name='bank.bankName'
										label='Bank Name'
										error={Boolean(errors?.bankName)}
										helperText={errors?.bankName}
										value={bankName}
										onChange={e => setBankName(e.target.value)}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12} className={classes.gridItem}>
									<FieldInput
										size='large'
										name='bank.accountNumber'
										label='Account Number'
										error={Boolean(errors?.accountNumber)}
										helperText={errors?.accountNumber}
										value={accountNumber}
										onChange={e => setAccountNumber(e.target.value)}
									/>
								</Grid>

								<Grid item md={6} sm={6} xs={12} className={classes.gridItem}>
									<FieldInput
										size='large'
										name='bank.confirmNumber'
										label='Confirm Account Number'
										error={Boolean(errors?.confirmNumber)}
										helperText={errors?.confirmNumber}
										value={confirmNumber}
										onChange={e => setConfirmNumber(e.target.value)}
									/>
								</Grid>
								<Grid item md={6} sm={6} xs={12} className={classes.gridItem}>
									<FieldInput
										size='large'
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
								{country && bankField && (
									<Grid item md={6} sm={6} xs={12} className={classes.gridItem}>
										<FieldInput
											size='large'
											name={bankField.key}
											label={bankField.value}
											error={Boolean(errors?.extraFieldValue)}
											helperText={errors?.extraFieldValue}
											value={extraFieldValue}
											onChange={e => {
												const { current: { setFieldValue } = {} } = form || {};
												setExtraFieldValue(e.target.value);
												setFieldValue(
													"bank." + bankField.key,
													e.target.value?.toUpperCase()
												);
											}}
										/>
									</Grid>
								)}
							</Grid>
						</Box>

						<Box bgcolor='#FBFBFB' p='2.5rem' pb='4rem' borderRadius='0.625rem'>
							<Typography fontSize='1.2rem' fontWeight={600} color='#2A2A2A'>
								Set Password
							</Typography>

							<Grid container spacing={2} rowGap={"24px"} mt={"6px"}>
								<Box>
									<Box display='flex' gap='0.5rem'>
										<Checkbox
											checked={conditions.condition1}
											disabled
											sx={{
												"&.Mui-checked": {
													color: "#f37b21",
												},
											}}
										/>
										<Typography variant='body2' sx={{ marginTop: "10px" }}>
											At least 12 characters (required for your Muhlenberg
											password) - the more characters, the better.
										</Typography>
									</Box>

									<Box display='flex' gap='0.5rem'>
										<Checkbox
											checked={conditions.condition2}
											disabled
											sx={{
												"&.Mui-checked": {
													color: "#f37b21",
												},
											}}
										/>
										<Typography variant='body2' sx={{ marginTop: "10px" }}>
											Include of at least one special character, e.g.,! @ # ?
										</Typography>
									</Box>

									<Box display='flex' gap='0.5rem'>
										<Checkbox
											checked={conditions.condition3}
											disabled
											sx={{
												"&.Mui-checked": {
													color: "#f37b21",
												},
											}}
										/>
										<Typography variant='body2' sx={{ marginTop: "10px" }}>
											A mixture of both uppercase and lowercase letters
										</Typography>
									</Box>

									<Box display='flex' gap='0.5rem'>
										<Checkbox
											checked={conditions.condition4}
											disabled
											sx={{
												"&.Mui-checked": {
													color: "#f37b21",
												},
											}}
										/>
										<Typography variant='body2' sx={{ marginTop: "10px" }}>
											A mixture of letters and numbers
										</Typography>
									</Box>
								</Box>
								<Grid item md={6} sm={6} xs={12} className={classes.gridItem}>
									<FieldInput
										size='large'
										value={password}
										type='password'
										name='password'
										placeholder='Enter your password here'
										onChange={e => {
											const { current: { setFieldValue } = {} } = form || {};
											setPassword(e.target.value);
											setFieldValue("password", e.target.value);
											calculateConditions(e.target.value);
										}}
										error={Boolean(errors?.password)}
										helperText={errors?.password}
									/>
								</Grid>
								<Grid item md={6} sm={6} xs={12} className={classes.gridItem}>
									<FieldInput
										size='large'
										type='password'
										name='confirmPassword'
										placeholder='Re-enter your password here'
										error={Boolean(confPasswordError)}
										helperText={confPasswordError}
										value={confPassword}
										onChange={e => {
											setConfPassword(e.target.value);
										}}
									/>
								</Grid>
							</Grid>
						</Box>

						<Box className={style.saveCtaContainer}>
							<Button
								variant='contained'
								size='small'
								type='submit'
								sx={{
									textTransform: "none",
									bgcolor: "#f37b21 !important",
									padding: "14px 24px",
									color: "white",
								}}>
								Save & Continue
							</Button>
						</Box>
					</Box>
				</Form>
			</Formik>
		</Box>
	);
};

export default Step1;
