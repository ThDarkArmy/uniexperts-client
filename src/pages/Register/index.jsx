import {
	Box,
	Button,
	Grid,
	Step,
	StepConnector,
	StepLabel,
	Stepper,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { _getToken } from "utils/token";
import Step1 from "./Step1";
import Step3 from "./Step3";
import Step4 from "./Step4";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { EditIcon } from "components/Icons/EditIcon";
import { PictureIcon } from "components/Icons/PictureIcon";
import { QuestionIcon } from "components/Icons/QuestionIcon";
import { TrueIcon } from "components/Icons/TrueIcon";
import { UserEditIcon } from "components/Icons/UserEditIcon";
import { AuthLayout } from "pages/Layouts/AuthLayout";

const Register = () => {
	const [step, setStep] = useState(0);
	const [data, setData] = useState({});
	const dispatch = useDispatch();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [step]);

	const nextStep = () => setStep(prevStep => prevStep + 1);
	const prevStep = () => setStep(prevStep => prevStep - 1);

	// console.log("step :- ", step)

	useEffect(() => {
		if (_getToken()) {
			setStep(1);
		}
	}, []);

	const ActiveStepIcon = props => {
		const { active, completed, icon } = props;

		const iconSrc = [
			<UserEditIcon key={1} strokeColor={active ? "#9038FF" : "#2A2A2A"} />,
			<PictureIcon key={2} strokeColor={active ? "#9038FF" : "#2A2A2A"} />,
			<EditIcon key={3} strokeColor={active ? "#9038FF" : "#2A2A2A"} />,
		];

		return (
			<Box
				height={"44px"}
				width={"44px"}
				display={"flex"}
				alignItems={"center"}
				justifyContent={"center"}
				sx={{
					backgroundColor: completed
						? "#53B483"
						: active
							? "#f4ebff"
							: "#ffffff",
					border: completed
						? "2px solid #53B483"
						: active
							? "2px solid #9038FF"
							: "2px solid #E5E7EA",
					borderRadius: "100%",
					padding: "12px",
				}}>
				{completed ? <TrueIcon /> : iconSrc[icon - 1]}
			</Box>
		);
	};

	const renderStepContent = () => {
		switch (step) {
			case 0:
				return (
					<Box overflow={"auto"} height={"100%"}>
						{/* <Box alignItems='center' justifyContent='space-between'>
							<Typography fontSize='1.9rem' fontWeight={700}>
								Sign up as an Agent
							</Typography>
							<Typography
								fontWeight={500}
								marginBottom={4}
								color='rgba(0, 0, 0, 0.6)'>
								Registration Details
							</Typography>
						</Box> */}
						<Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
							<Box>
								<Typography fontSize='1.9rem' fontWeight={700}>
									Sign up as an Agent
								</Typography>
								<Typography fontSize='0.9rem' fontWeight={400} >
									Registration Details
								</Typography>

							</Box>
							<Box >
								<Typography bgcolor={"#E5E7EA"} padding={2} borderRadius={1} width={"45px"} height={"50px"} display="flex" textAlign={"center"} alignItems={"center"} justifyItems={"center"} fontWeight={500}>{step == 0 && 1 + "/"} <span style={{
									color: "#949494"
								}}>3</span></Typography>
							</Box>
						</Box>#
						<Step1 data={data} setData={setData} nextStep={nextStep} prevStep={prevStep} />
					</Box>
				);

			case 1:
				return (
					<Box width={"100%"}>
						<Box alignItems='center' justifyContent='space-between' >
							<Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
								<Box>
									<Typography fontSize='1.9rem' fontWeight={700}>
										Sign up as an Agent
									</Typography>
									<Typography fontSize='0.9rem' fontWeight={400} >
										Upload Documents
									</Typography>

								</Box>
								<Box >
									<Typography bgcolor={"#E5E7EA"} padding={2} borderRadius={1} display="flex" textAlign={"center"} alignItems={"center"} justifyItems={"center"} fontWeight={500}>{step == 1 && 2 + "/"} <span style={{
										color: "#949494"
									}}>3</span></Typography>
								</Box>
							</Box>
						</Box>
						<Step3 data={data} setData={setData} nextStep={nextStep} prevStep={prevStep} />
					</Box>
				);
			case 2:
				return <Step4 data={data} prevStep={prevStep} />;
			default:
				return null;
		}
	};

	return (
		<ThemeProvider
			theme={createTheme({
				palette: {
					primary: {
						main: "#f37b21", // Set the primary color to orange
					},
				},
				typography: {
					fontFamily: "Inter, sans-serif",
				},
				overrides: {
					MuiStepIcon: {
						root: {
							"&$active": {
								color: "#f37b21", // Set the color of active step icon to orange
							},
							"&$completed": {
								color: "#f37b21", // Set the color of completed step icon to orange
							},
						},
						active: {},
						completed: {},
					},
				},
			})}>
			<AuthLayout>
				<Box
					height='calc(100vh - 72px)'
					display='flex'
					maxWidth={"100vw"}
					marginInline='auto'
					bgcolor={"#F0F1F5"}
					sx={{
						fontFamily: "Inter, sans-serif !important",
					}}>
					<Grid container height={"100%"}>
						<Grid item md={3} bgcolor={"#fff"}>
							<Box
								padding={"3.75rem"}
								display={"flex"}
								flexDirection={"column"}
								justifyContent={"space-between"}
								height={"100%"}>
								<Stepper
									activeStep={step}
									orientation='vertical'
									connector={<StepConnector sx={{ marginLeft: "22px" }} />}>
									{steps.map((item, index) => (
										<Step key={index}>
											<StepLabel
												StepIconComponent={ActiveStepIcon}
												optional={
													<Typography variant='caption'>
														{item.description}
													</Typography>
												}>
												<Typography
													sx={{
														fontWeight: 600,
														lineHeight: "24px",
													}}>
													{item.label}
												</Typography>
											</StepLabel>
										</Step>
									))}
								</Stepper>


							</Box>
						</Grid>
						<Grid item md={9}>
							<Box
								sx={{
									height: "calc(100vh - 72px)",
									display: "flex",
									width: "75%",
									margin: "auto",
									paddingTop: "60px",
									paddingX: "30px",
									overflow: "auto",
								}}>
								{renderStepContent()}
							</Box>
						</Grid>
					</Grid>
				</Box>
			</AuthLayout>
		</ThemeProvider>
	);
};

export default Register;

// const steps = ["Registration", "", ""];

const steps = [
	{
		label: "Registration",
		description: "Fill up the form to register as an agent",
	},
	{
		label: "File Upload",
		description: "Provide us with your identification",
	},
	{
		label: "Terms & conditions",
		description: "Provide us with your identification",
	},
];
