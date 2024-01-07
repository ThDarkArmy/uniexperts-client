import {
	Box,
	Button,
	FormControlLabel,
	Switch,
	Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { tnc } from "apis/auth";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import agreementFile from "../../assets/agreement.pdf";
import gif from "../../assets/loader.gif";
import styles from "./style.module.scss";

const Step4 = ({ data = {}, setData, nextStep, prevStep }) => {
	const history = useHistory();
	const [isChecked, setIsChecked] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [tncData, setTncData] = useState("");
	const [ip, setIp] = useState("");
	// const dispatch = useDispatch();
	useEffect(() => {
		tnc().then(response => {
			setTncData(`${response?.records[0]?.Term_Condition__c}`);
		});
		getIpAddress();
	}, []);

	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					setLatitude(position.coords.latitude);
					setLongitude(position.coords.longitude);
				},
				error => {
					console.error(error);
				}
			);
		} else {
			console.error("Geolocation is not supported by your browser");
		}
	}, []);

	async function getIpAddress() {
		await fetch("https://api.ipify.org/?format=json")
			.then(response => response.json())
			.then(data => {
				setIp(data.ip);
			})
			.catch(error => {
				console.error("Error fetching data:", error);
			});
	}

	const handleSignUp = () => {
		setIsLoading(true);

		setTimeout(() => {
			history.push("/dashboard");
			setIsLoading(false);
		}, 5000);
	};

	function getCurrentTime() {
		const now = new Date();
		const hours = now.getHours();
		const minutes = now.getMinutes();
		const seconds = now.getSeconds();

		const formattedTime = `${hours}:${minutes}:${seconds}`;

		return formattedTime;
	}

	const printDocument = async () => {
		const fileURL = agreementFile;
		const a = document.createElement("a");
		a.href = fileURL;
		a.download = agreementFile; // The name for the downloaded file
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};


	const hanleBackNavigation = () => {
		prevStep()
	}
	// const location = window.navigator && window.navigator.geolocation

	if (isLoading)
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					marginTop: "16%",
				}}>
				<img
					src={gif}
					alt=''
					style={{
						height: "23%",
						width: "23%",
						objectFit: "contain",
						objectPosition: "center",
					}}
				/>
			</div>
		);

	return (
		<Box display={"flex"} flexDirection={"column"} width={"100%"}>
			<Box alignItems='center' justifyContent='space-between'>
				<Typography fontSize='1.9rem' fontWeight={700}>
					Sign up as an Agent
				</Typography>
				<Typography
					fontWeight={500}
					marginBottom={4}
					color='rgba(0, 0, 0, 0.6)'>
					Agreement
				</Typography>
			</Box>
			<Box paddingBottom={"60px"}>
				{tncData ? (
					<>
						<div
							id='tnc'
							style={{
								borderRadius: "10px",
								alignItems: "center",
								display: "flex",
								marginTop: "12px",
								padding: "40px",
								background: "#FFFFFF",
							}}>
							{tncData && (
								<div
									className={styles.scrollView}
									dangerouslySetInnerHTML={{
										__html: tncData,
									}}
								/>
							)}
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								marginTop: "20px",
							}}>
							<div style={{ display: "flex" }}>
								<FormControlLabel
									control={
										<Switch
											onChange={(event, checked) => setIsChecked(checked)}
										/>
									}
									label='I agree to T&C, Privacy and Cookies Policy'
								/>
							</div>

							<div style={{ display: "flex", columnGap: "10px" }}>
								<Button
									variant='contained'
									size='small'
									type='submit'
									sx={{
										textTransform: "none",
										bgcolor: "#fff !important",
										padding: "14px 24px",
										color: "#000",
									}}
									onClick={hanleBackNavigation}>
									Go Back
								</Button>
								<Button
									variant='contained'
									size='small'
									type='submit'
									sx={{
										textTransform: "none",
										bgcolor: "#f37b21 !important",
										padding: "14px 24px",
										color: "white",
									}}
									onClick={() => {
										//console.log("clicked");
										isChecked && handleSignUp();
										isChecked && printDocument();
										isChecked && localStorage.setItem("docUploaded", true);
										// dispatch(setLoader(true));
										// setTimeout(() =>{
										//     dispatch(setLoader(false));
										//     history.push("/auth/login")
										// },1000)
									}}>
									Save & Continue
								</Button>
							</div>
						</div>

						{isChecked && (
							<p
								style={{
									fontSize: "12px",
									color: "#727272",
									marginTop: "6px",
									fontWeight: "400",
								}}>
								This agreement has been signed on {getCurrentTime()} at IP: {ip}
								{longitude
									? `
								, Logtitude: ${longitude}`
									: ""}
								{latitude ? ` ,Logtitude: ${latitude}` : ""}.
							</p>
						)}
					</>
				) : (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}>
						{" "}
						<CircularProgress />
					</div>
				)}
			</Box>
		</Box>
	);
};

export default Step4;

const tncff = ` This Contractual Agreement is enacted with the primary objective of formalizing a collaborative partnership between Uniexperts and the Service Provider. The Service Provider shall function as an intermediary service facilitator, establishing a bridge between Uniexperts and Prospective Students across the global spectrum. The overarching purpose of this partnership is to enable Uniexperts to extend its outreach and establish connections with an extensive array of universities and educational institutions. It is to be noted that the Service Provider does not possess direct contractual affiliations with educational institutions on a global scale. By harnessing the intermediary capabilities of the Service Provider, Uniexperts aspires to amplify the scope and quality of its offerings. The ultimate goal is to enhance educational accessibility and opportunities on an international scale, thereby fostering mutually beneficial outcomes for the students, partner universities, the Service Provider, and Uniexperts.
ARTICLE 1. SCOPE OF SERVICES
1.1. Uniexperts
1.1.1. Application Processing
Uniexperts shall be responsible for the handling and processing of student applications for various universities and colleges, in accordance with all applicable laws, regulations, and agreed-upon procedures.
1.1.2. University and College Information
Uniexperts shall provide detailed and comprehensive information concerning partner universities and colleges, including but not limited to admission requirements, course offerings, and other relevant details as may be necessary or appropriate.
1.1.3. Online Portal
Uniexperts has developed and shall continue to maintain an online portal to facilitate the registration of students and streamline the application and enrolment process, in compliance with all applicable legal requirements.
1.1.4. Liaison with Partner Universities and Colleges:
Uniexperts shall serve as the primary point of contact and liaison between students and partner universities and colleges, ensuring effective communication, and addressing any queries or concerns in a timely and professional manner.
1.2. Service Provider
1.2.1. Student Information and Advice
Service Provider shall furnish students with accurate, current, and relevant information and advice concerning educational programs, course types, and related matters, in accordance with all applicable laws and regulations.
1.2.2. Application Assistance
Service Provider shall assist students in the application process, guiding them through the necessary steps, and providing support to ensure accurate and timely submissions, consistent with all relevant legal requirements and standards.
1.2.3. Pre-Departure Student Assistance
Service Provider shall offer guidance to students in their pre-departure preparations like visa requirements, health insurance, and other necessary arrangements, all in accordance with applicable laws, regulations, and policies.
1.2.4. Program Information
Service Provider shall provide detailed information about the various educational programs available, assisting students in making informed and lawful decisions regarding their academic pursuits.
1.2.5. Course Types
Service Provider shall provide students with information concerning different types of courses available, including but not limited to academic programs, vocational courses, professional certifications, and other relevant options, in compliance with all applicable legal standards and regulations.
ARTICLE 2. CONFIDENTIALITY
2.1. Definition of Confidential Information
The Parties recognize that during the term of this Agreement, either Party may come into possession of confidential information belonging to the other Party. Confidential information shall encompass, but not be limited to, student records, financial data, marketing strategies, technical know-how, trade secrets, and any other proprietary or sensitive information expressly related to this Agreement.
2.2. Confidentiality Obligations
The Parties covenant and agree to maintain the strictest confidentiality concerning any confidential information obtained from the other Party. Such information shall not be disclosed, used, or exploited for any purpose apart from the performance of obligations under this Agreement, without the express written consent of the disclosing Party.
2.3. Protection of Confidential Information
The Parties undertake to employ all reasonable measures to preserve the confidentiality and prevent any unauthorized disclosure or utilization of the confidential information. This shall include, but not be limited to, instituting appropriate security protocols, restricting access to confidential information solely to authorized personnel on a need-to-know basis, and exercising due care in managing and storing said information.`;
