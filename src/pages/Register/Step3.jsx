import { Box, Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { uploadAgentDocuments } from "apis/agent";
import { useState } from "react";
import { useDispatch } from "react-redux";
import S3 from "./aws";

const Step3 = ({ data = {}, setData, nextStep }) => {
	const [selectedFile, setSelectedFile] = useState({});
	const [files, setFiles] = useState({});
	const [filesUploading, setFilesUploading] = useState({});

	const dispatch = useDispatch();

	const handleFileChange = event => {
		const file = event.target.files[0];
		let fileArr = [];
		fileArr.push(file);
		//setSelectedFile([...file]);

		//setSelectedFile(fileArr);
	};
	const handleSubmit = values => {
		//dispatch(setLoader(true));
		const requiredKeys = [
			"personal_identification",
			"tax_registration_certificate",
			"bank_statement",
			"address_proof",
			"company_registration_certificate",
		];

		if (requiredKeys.every(key => !!files[`${key}`])) {
			const data = {
				documents: [
					{
						url: files["personal_identification"],
						documentTypeId: "648eb9827c35141cb52dc532",
					},
					{
						url: files["tax_registration_certificate"],
						documentTypeId: "648eb9827c35141cb52dc532",
					},
					{
						url: files["bank_statement"],
						documentTypeId: "648eb9827c35141cb52dc532",
					},
					{
						url: files["address_proof"],
						documentTypeId: "648eb9827c35141cb52dc532",
					},
					{
						url: files["company_registration_certificate"],
						documentTypeId: "648eb9827c35141cb52dc532",
					},
				],
			};

			uploadAgentDocuments(data).then(res => {
				nextStep();
			});
		} else {
			alert("Please upload all the files");
		}
	};

	const handleFileUpload = async event => {
		const file = event.target.files[0];
		const fileName = file.name;
		setFilesUploading({ ...filesUploading, [event.target.name]: true });

		const params = {
			Bucket: "uniexpert",
			Key: fileName, // Name of the file in your S3 bucket
			Body: file,
		};

		try {
			const uploadedFile = await S3.upload(params).promise();
			setFiles({ ...files, [event.target.name]: uploadedFile.Location });
			setFilesUploading({ ...filesUploading, [event.target.name]: false });
		} catch (error) {
			console.error("Error uploading file:", error);
			setFilesUploading({ ...filesUploading, [event.target.name]: false });
		}
	};

	const handleUpload = () => {
		if (selectedFile) {
		} else {
			console.log("No file selected.");
		}
	};

	return (
		<Box
			borderRadius='0.625rem'
			marginTop={"60px"}
			paddingBottom={"60px"}
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: "30px",
				width: "100%",
			}}>
			<Box bgcolor='#FBFBFB' p='2.5rem' borderRadius='0.625rem' width={"100%"}>
				<Typography fontSize='1.2rem' fontWeight={600} color='#2A2A2A'>
					Personal
				</Typography>
				<Typography fontSize='14px' fontWeight={400} color='rgba(0, 0, 0, 0.6)'>
					Upload or personal identification document
				</Typography>
				<input
					name='personal_identification'
					type='file'
					onChange={handleFileUpload}
					style={{
						border: "2px solid gray",
						borderRadius: "5px",
						marginTop: "14px",
						fontFamily: "Inter, sans-serif !important",
					}}
				/>
				{filesUploading.personal_identification ? (
					<CircularProgress sx={{ marginLeft: "32px" }} size={30} />
				) : (
					<Button
						onClick={handleUpload}
						sx={{
							textTransform: "none",
							marginLeft: "32px",
							borderRadius: "32px",
							color: "#f37b21",
							border: "0.5px solid gray",
							backgroundColor: "#fff",
							padding: "8px 24px",
						}}>
						{files.personal_identification ? "Uploaded" : "Upload"}
					</Button>
				)}
			</Box>

			<Box bgcolor='#FBFBFB' p='2.5rem' borderRadius='0.625rem' width={"100%"}>
				<Typography fontSize='1.2rem' fontWeight={600} color='#2A2A2A'>
					Tax Registration Certificate
				</Typography>
				<Typography fontSize='14px' fontWeight={400} color='rgba(0, 0, 0, 0.6)'>
					Upload your Tax Registration Certificate
				</Typography>
				<input
					name='tax_registration_certificate'
					type='file'
					onChange={handleFileUpload}
					style={{
						border: "2px solid gray",
						borderRadius: "5px",
						marginTop: "14px",
					}}
				/>
				{filesUploading.tax_registration_certificate ? (
					<CircularProgress sx={{ marginLeft: "32px" }} size={30} />
				) : (
					<Button
						onClick={handleUpload}
						sx={{
							textTransform: "none",
							marginLeft: "32px",
							borderRadius: "32px",
							color: "#f37b21",
							border: "0.5px solid gray",
							backgroundColor: "#fff",
							padding: "8px 24px",
						}}>
						{files.tax_registration_certificate ? "Uploaded" : "Upload"}
					</Button>
				)}
			</Box>
			<Box bgcolor='#FBFBFB' p='2.5rem' borderRadius='0.625rem' width={"100%"}>
				<Typography fontSize='1.2rem' fontWeight={600} color='#2A2A2A'>
					Bank Statement
				</Typography>
				<Typography fontSize='14px' fontWeight={400} color='rgba(0, 0, 0, 0.6)'>
					Upload your bank statememt
				</Typography>
				<input
					type='file'
					name='bank_statement'
					onChange={handleFileUpload}
					style={{
						border: "2px solid gray",
						borderRadius: "5px",
						marginTop: "14px",
					}}
				/>
				{filesUploading.bank_statement ? (
					<CircularProgress sx={{ marginLeft: "32px" }} size={30} />
				) : (
					<Button
						onClick={handleUpload}
						sx={{
							textTransform: "none",
							marginLeft: "32px",
							borderRadius: "32px",
							color: "#f37b21",
							border: "0.5px solid gray",
							backgroundColor: "#fff",
							padding: "8px 24px",
						}}>
						{files.bank_statement ? "Uploaded" : "Upload"}
					</Button>
				)}
			</Box>

			<Box bgcolor='#FBFBFB' p='2.5rem' borderRadius='0.625rem' width={"100%"}>
				<Typography fontSize='1.2rem' fontWeight={600} color='#2A2A2A'>
					Address Proof
				</Typography>
				<Typography fontSize='14px' fontWeight={400} color='rgba(0, 0, 0, 0.6)'>
					Upload your address proof
				</Typography>
				<input
					type='file'
					onChange={handleFileUpload}
					name='address_proof'
					style={{
						border: "2px solid gray",
						borderRadius: "5px",
						marginTop: "14px",
					}}
				/>
				{filesUploading.address_proof ? (
					<CircularProgress sx={{ marginLeft: "32px" }} size={30} />
				) : (
					<Button
						onClick={handleUpload}
						sx={{
							textTransform: "none",
							marginLeft: "32px",
							borderRadius: "32px",
							color: "#f37b21",
							border: "0.5px solid gray",
							backgroundColor: "#fff",
							padding: "8px 24px",
						}}>
						{files.address_proof ? "Uploaded" : "Upload"}
					</Button>
				)}
			</Box>
			<Box bgcolor='#FBFBFB' p='2.5rem' borderRadius='0.625rem' width={"100%"}>
				<Typography fontSize='1.2rem' fontWeight={600} color='#2A2A2A'>
					Company registration Certificate
				</Typography>
				<Typography fontSize='14px' fontWeight={400} color='rgba(0, 0, 0, 0.6)'>
					Upload Company registration Certificate
				</Typography>
				<input
					type='file'
					name='company_registration_certificate'
					onChange={handleFileUpload}
					style={{
						border: "2px solid gray",
						borderRadius: "5px",
						marginTop: "14px",
					}}
				/>
				{filesUploading.company_registration_certificate ? (
					<CircularProgress sx={{ marginLeft: "32px" }} size={30} />
				) : (
					<Button
						onClick={handleUpload}
						sx={{
							textTransform: "none",
							marginLeft: "32px",
							borderRadius: "32px",
							color: "#f37b21",
							border: "0.5px solid gray",
							backgroundColor: "#fff",
							padding: "8px 24px",
						}}>
						{files.company_registration_certificate ? "Uploaded" : "Upload"}
					</Button>
				)}
			</Box>

			<Box display='flex' justifyContent='end'>
				<Button
					variant='contained'
					size='small'
					onClick={() => handleSubmit()}
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
	);
};

export default Step3;
