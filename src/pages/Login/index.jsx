import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { login } from "apis/auth";
import question from "assets/question.svg";
import FieldInput from "components/FieldInput";
import { Form, Formik } from "formik";
import { AuthLayout } from "pages/Layouts/AuthLayout";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { RouteNames } from "routes/_base";
import { setLoader, setUser } from "store";
import { loginValidation } from "utils/validations";
import style from "./style.module.scss";

const initialValues = { email: "", password: "" };

const Login = () => {
	const sliderImages = [
		{
			url: "https://beautiful-sunshine-54b1e6.netlify.app/static/media/carousel1.de0b6ecfc910929bf5a34fe02b1d749f.svg",
		},
		{
			url: "https://beautiful-sunshine-54b1e6.netlify.app/static/media/carousel2.18b87b0501d089b69db16de9df701745.svg",
		},
		{
			url: "https://beautiful-sunshine-54b1e6.netlify.app/static/media/carousel2.18b87b0501d089b69db16de9df701745.svg",
		},
	];
	const history = useHistory();
	const dispatch = useDispatch();

	const [bgImage, setBgImage] = useState({});

	// @gets background image
	// useEffect(() => {
	// 	dispatch(setLoader(true));
	// 	getBackgroundImage()
	// 		.then(setBgImage)
	// 		.finally(() => dispatch(setLoader(false)));
	// }, []);

	const onSubmit = values => {
		dispatch(setLoader(true));
		login(values)
			.then(userDetails => {
				localStorage.setItem("docUploaded", userDetails.docUploaded);
				console.log("user details: " + userDetails.docUploaded);
				if (userDetails.docUploaded) {
					dispatch(setUser(userDetails));
					history.push(RouteNames.dashboard);
				} else {
					console.log("docupload false");
					history.push(RouteNames.register);
				}
			})
			.finally(() => dispatch(setLoader(false)));
	};

	return (
		<AuthLayout>
			<Box
				minHeight='calc(100vh - 72px)'
				display='flex'
				maxWidth={"100vw"}
				marginInline='auto'
				bgcolor={"#F0F1F5"}>
				<Box className={style.container}>
					<Grid container height={"100%"}>
						<Grid item md={3}>
							<Box className={style.informationContainer}>
								<Box className={style.gradient}>
									<Box className={style.container}>
										<Box className={style.info1}>
											<Typography className={style.title}>
												Welcome to Uniexperts!
											</Typography>
											<Typography className={style.caption}>
												The revolutionary platform designed to empower students
												in their journey towards higher education.
											</Typography>
										</Box>

									</Box>
								</Box>
							</Box>
						</Grid>
						<Grid item md={9}>
							<Formik
								initialValues={initialValues}
								validationSchema={loginValidation}
								onSubmit={onSubmit}>
								<Form className={style.form}>
									<Box className={style.signInContainer}>
										<Box className={style.signInCard}>
											<Typography className={style.signInTitle}>
												Sign in
											</Typography>
											<Box className={style.inputCard}>
												<Box
													display='flex'
													width={"100%"}
													flexDirection='column'
													gap='1rem'>
													<FieldInput
														name='email'
														type='email'
														label='Email'
														size='large'
													/>

													<FieldInput
														name='password'
														type='password'
														label='Password'
														size='large'
													/>

													<Box display='flex' justifyContent='flex-end'>
														<Link
															to={RouteNames.forgot}
															className={style.forgotPassword}>
															<Typography>Forgot Password?</Typography>
														</Link>
													</Box>
												</Box>
											</Box>
											<Box
												display={"flex"}
												alignItems={"center"}
												justifyContent={"space-between"}>
												<Box display={"flex"} alignItems={"center"} gap={1}>
													<Typography>Don’t have an account?</Typography>
													<Typography
														onClick={() => history.push(RouteNames.register)}
														fontWeight={500}
														sx={{ cursor: "pointer" }}>
														Sign up
													</Typography>
												</Box>
												<Button className={style.signInButton} type='submit'>
													Sign in
												</Button>
											</Box>
										</Box>
									</Box>
								</Form>
							</Formik>
						</Grid>
					</Grid>
				</Box>
				{/*<div className={style.container} >
					 <div className={style.banner} >
						<Box flex={1} >
							<SimpleImageSlider
								width={"32vw"}
								height={"90vh"}
								images={sliderImages}
								autoPlay={true}
								showBullets={true}
								style={{
									borderRadius: "15px",
									// marginTop: "60px",
									marginLeft: "10rem",
									marginBottom: "25px"
								}}
							/>
						</Box>
					</div>
					<Box
						flex={1}
						display='flex'
						flexDirection='column'
					>
						<div
							className={style.formContainer}
						>
							<img
								src={logo}
								alt=''
								height='100%'
								className={style.logo}
							/>
							<Formik
								initialValues={initialValues}
								validationSchema={loginValidation}
								onSubmit={onSubmit}>
								<Form style={{ width: "86%" }} className={style.form} >
									<Box
										display='flex'
										width={{ xs: "100%", md: "80%" }}
										p='1rem 1rem'
										borderRadius={"10px"}
										bgcolor={"#fbfbfb"}
										m='0 auto'
										flexDirection='column'
										gap='1rem'>
										<p style={{ fontSize: "36px", fontWeight: "700" }}>Sign In</p>
										<p style={{ marginBottom: "20px", marginTop: "-18px", fontWeight: "400", fontSize: "16px", width: "100%" }}>
											Don’t have an account?{" "}
											<Button
												size='small'
												type='button'
												onClick={() => history.push(RouteNames.register)}
												sx={{
													textTransform: "none",
													color: "#f37b21 !important",
													fontSize: "16px",
													marginLeft: "-4px",
													marginTop: "-4px"
												}}>
												Register Now
											</Button>
										</p>
										<FieldInput name='email' type='email' label='Email' />

										<FieldInput name='password' type='password' label='Password' />

										<Box display='flex' justifyContent='flex-end'>
											<Link to={RouteNames.forgot}>
												<Typography
													fontSize='0.825rem'
													color='#f37b21'
													fontWeight={500}>
													Forgot Password?
												</Typography>
											</Link>
										</Box>

										<Box display='flex' flexDirection='column' gap='1rem'>
											<Button
												variant='contained'
												size='small'
												type='submit'
												sx={{
													textTransform: "none",
													bgcolor: "#f37b21 !important",
													width: "140px",
													height: "40px",
													borderRadius: "32px",
												}}>
												Login
											</Button>

											{/* <Button
										variant='outlined'
										size='small'
										type='button'
										onClick={() => history.push(RouteNames.register)}
										sx={{
											textTransform: "none",
											color: "#f37b21 !important",
											borderColor: "#f37b21 !important",
										}}>
										Register
									</Button> */}
				{/* </Box>
									</Box>
								</Form>
							</Formik>
						</div>

						<Box
							flexGrow={1}
							sx={{
								backgroundImage: `url(${bgImage?.bottomImage})`,
								backgroundPosition: "center",
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover",
							}}
						/>
					</Box>
				</div > */}
			</Box>
		</AuthLayout>
	);
};

export default Login;
