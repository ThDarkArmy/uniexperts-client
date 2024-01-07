import { Box, Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { uploadAgentDocuments } from "apis/agent";
import { useState } from "react";
import { useDispatch } from "react-redux";
import S3 from "./aws";

const Step3 = ({ data = {}, setData, nextStep, prevStep }) => {
	const [selectedFile, setSelectedFile] = useState({});
	const [files, setFiles] = useState({});
	const [filesUploading, setFilesUploading] = useState({});
	const [isEnteredFileName, setisEnteredFileName] = useState(false);
	const [FileName, setFileName] = useState();
	const [FileSize, setFileSize] = useState()
	const [isEnteredHoverFileName, setisEnteredHoverFileName] = useState()
	const [FileType, setFileType] = useState();

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
			'personal_identification',
			'tax_registration_certificate',
			'bank_statement',
			'address_proof',
			'company_registration_certificate'
		];




		// console.log(values)

		if (Object.keys(values).every(key => requiredKeys.includes(key))) {
			const data = {
				"documents": [
					{
						"url": files['personal_identification'],
						"documentTypeId": "648eb9827c35141cb52dc532"
					},
					{
						"url": files['tax_registration_certificate'],
						"documentTypeId": "648eb9827c35141cb52dc532"
					},
					{
						"url": files['bank_statement'],
						"documentTypeId": "648eb9827c35141cb52dc532"
					},
					{
						"url": files['address_proof'],
						"documentTypeId": "648eb9827c35141cb52dc532"
					},
					{
						"url": files['company_registration_certificate'],
						"documentTypeId": "648eb9827c35141cb52dc532"
					},
				]
			}

			uploadAgentDocuments(data)
				.then(res => {
					nextStep();
				})

		} else {
			alert("Please upload all the files");
		}
	};


	const handleFileUpload = async event => {
		const file = event.target.files[0];
		const fileName = file.name;
		const Name = event.target.files[0].name
		const size = event.target.files[0].size
		const Type = event.target.files[0].type



		setFileSize({ ...FileSize, [event.target.name]: (size / 1024).toFixed(2) }); // toFixed(2) ensures two dec

		setFileName({ ...FileName, [event.target.name]: Name })

		setFileType({ ...FileType, [event.target.name]: Type })


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
		// You can perform the file upload here using APIs, like Axios or Fetch.
		// For simplicity, let's just log the selected file's information.
		if (selectedFile) {
			console.log("File selected:", selectedFile);
		} else {
			console.log("No file selected.");
		}
	};


	const handlefileEndtered = (data) => {
		setisEnteredFileName(true)
		setisEnteredHoverFileName(data)
	}
	const handlefileLeave = () => {
		setisEnteredFileName(false)
	}


	const handleNavigate = () => {
		prevStep()
	}

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

				<Box border={"dashed"} marginTop={2} padding={2} paddingLeft={4} paddingRight={4} borderColor={"#CED2D6"} borderRadius={2} position={"relative"} height={"105px"}>
					<Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
						<Box>
							<Typography fontSize='14px' style={{
								cursor: "pointer"
							}} fontWeight={400} color='rgba(0, 0, 0, 0.6)'>
								Drop files here to upload, or click <span style={{
									textDecoration: isEnteredFileName == true && isEnteredHoverFileName == "personal_identification" ? "underline" : "",
									textUnderlineOffset: "3px"
								}}>Upload</span>
							</Typography>

							<Typography fontSize='10px' style={{
								cursor: "pointer",
								opacity: "1",
							}} fontWeight={500} marginTop={1} color='#949494' >PNG, JPEG (max 1 Mb)</Typography>
							<input
								name='personal_identification'
								type='file'
								onChange={handleFileUpload}
								style={{
									opacity: "0",
									width: "285px",
									position: "absolute",
									top: 0,
									background: "red"
								}}
								onMouseEnter={() => handlefileEndtered("personal_identification")}
								onMouseLeave={handlefileLeave}
							/>
						</Box>
						<Box>
							<img src="/file.svg"></img>
						</Box>
					</Box>
				</Box>

				{filesUploading.personal_identification ? (
					<CircularProgress sx={{ marginLeft: "32px" }} size={30} />
				) : (
					<>

						{FileName && FileName.personal_identification &&
							<>
								<Box display={"flex"} alignContent={"center"} alignItems={"center"} gap={1}>
									<Box style={{
										background: "#EDF5FF"
									}} borderRadius={"40px"} padding={"6px"} marginTop={2} width={"90%"} gap={"2"}>
										<Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
											<Box display={"flex"} alignItems={"center"} gap={1}>
												<img src="/updatedfile.svg" width={"35px"}></img>
												<Typography fontSize={15}>{FileName.personal_identification}</Typography>
											</Box>
											<Typography fontSize={11} fontWeight={600} marginRight={1}
												color={"#d3d3d3"}
											>{FileSize.personal_identification}kb</Typography>
										</Box>
									</Box>
									<Box width={"10%"}>
										<img src="/delete.svg" width={"45dpx"} style={{
											marginTop: "20px"
										}}></img>
									</Box>
								</Box>
								{
									FileType.personal_identification.split("/")[1] != "pdf" &&
									FileType.personal_identification.split("/")[1] != "plain" &&
									FileType.personal_identification.split("/")[1] != "doc" &&
									<Typography fontSize={"12px"} padding={"3px"} color={"red"}>Attachment failed to upload. Please upload your file in .pdf, .txt, .doc format only</Typography>
								}
							</>
						}
					</>
				)}
			</Box>


			<Box bgcolor='#FBFBFB' p='2.5rem' borderRadius='0.625rem' width={"100%"}>
				<Typography fontSize='1.2rem' fontWeight={600} color='#2A2A2A'>
					Bank Statement
				</Typography>
				<Typography fontSize='14px' fontWeight={400} color='rgba(0, 0, 0, 0.6)'>
					Upload your bank statement
				</Typography>
				<Box border={"dashed"} marginTop={2} padding={2} paddingLeft={4} paddingRight={4} borderColor={"#CED2D6"} borderRadius={2} position={"relative"} height={"105px"}>
					<Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
						<Box>
							<Typography fontSize='14px' style={{
								cursor: "pointer"
							}} fontWeight={400} color='rgba(0, 0, 0, 0.6)'>
								Drop files here to upload, or click <span style={{
									textDecoration: isEnteredFileName == true && isEnteredHoverFileName == "bank_statement" ? "underline" : "",
									textUnderlineOffset: "3px"
								}}>Upload</span>
							</Typography>

							<Typography fontSize='10px' style={{
								cursor: "pointer",
								opacity: "1",
							}} fontWeight={500} marginTop={1} color='#949494' >PNG, JPEG (max 1 Mb)</Typography>
							<input
								name='bank_statement'
								type='file'
								onChange={handleFileUpload}
								style={{
									opacity: "0",
									width: "285px",
									position: "absolute",
									top: 0,
									background: "red"
								}}
								onMouseEnter={() => handlefileEndtered("bank_statement")}
								onMouseLeave={handlefileLeave}
							/>
						</Box>
						<Box>
							<img src="/file.svg"></img>
						</Box>
					</Box>
				</Box>
				{filesUploading.bank_statement ? (
					<CircularProgress sx={{ marginLeft: "32px" }} size={30} />
				) : (
					<>
						{FileName && FileName.bank_statement &&
							<>
								<Box display={"flex"} alignContent={"center"} alignItems={"center"} gap={1}>
									<Box style={{
										background: "#EDF5FF"
									}} borderRadius={"40px"} padding={"6px"} marginTop={2} width={"90%"} gap={"2"}>
										<Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
											<Box display={"flex"} alignItems={"center"} gap={1}>
												<img src="/updatedfile.svg" width={"35px"}></img>
												<Typography fontSize={15}>{FileName.bank_statement}</Typography>
											</Box>
											<Typography fontSize={11} fontWeight={600} marginRight={1}
												color={"#d3d3d3"}
											>{FileSize.bank_statement}kb</Typography>
										</Box>
									</Box>
									<Box width={"10%"}>
										<img src="/delete.svg" width={"45dpx"} style={{
											marginTop: "20px"
										}}></img>
									</Box>

								</Box>
								{
									FileType.bank_statement.split("/")[1] != "pdf" &&
									FileType.bank_statement.split("/")[1] != "plain" &&
									FileType.bank_statement.split("/")[1] != "doc" &&
									<Typography fontSize={"12px"} padding={"3px"} color={"red"}>Attachment failed to upload. Please upload your file in .pdf, .txt, .doc format only</Typography>
								}
							</>
						}
					</>

				)}
			</Box>


			<Box bgcolor='#FBFBFB' p='2.5rem' borderRadius='0.625rem' width={"100%"}>
				<Typography fontSize='1.2rem' fontWeight={600} color='#2A2A2A'>
					Company Identifiers
				</Typography>
				<Typography fontSize='14px' display={"flex"} gap={"10px"} fontWeight={400} color='rgba(0, 0, 0, 0.6)' marginTop={3}>
					<span style={
						{
							borderStyle: "solid",
							borderColor: "#D3D3D3",
							borderRadius: "50%",
							width: "27px",
							height: "26px",
							textAlign: "center",
							borderWidth: "1px",
							paddingTop: "1.5px"
						}
					}>A</span>	<span> Tax Registration Certificate </span>
				</Typography>

				<Box border={"dashed"} marginTop={2} padding={2} paddingLeft={4} paddingRight={4} borderColor={"#CED2D6"} borderRadius={2} position={"relative"} height={"105px"}>
					<Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
						<Box>
							<Typography fontSize='14px' style={{
								cursor: "pointer"
							}} fontWeight={400} color='rgba(0, 0, 0, 0.6)'>
								Drop files here to upload, or click <span style={{
									textDecoration: isEnteredFileName == true && isEnteredHoverFileName == "tax_registration_certificate" ? "underline" : "",
									textUnderlineOffset: "3px"
								}}>Upload</span>
							</Typography>

							<Typography fontSize='10px' style={{
								cursor: "pointer",
								opacity: "1",
							}} fontWeight={500} marginTop={1} color='#949494' >PNG, JPEG (max 1 Mb)</Typography>
							<input
								name='tax_registration_certificate'
								type='file'
								onChange={handleFileUpload}
								style={{
									opacity: "0",
									width: "285px",
									position: "absolute",
									top: 0,
									background: "red"
								}}
								onMouseEnter={() => handlefileEndtered("tax_registration_certificate")}
								onMouseLeave={handlefileLeave}
							/>
						</Box>
						<Box>
							<img src="/file.svg"></img>
						</Box>
					</Box>
				</Box>

				{filesUploading.tax_registration_certificate ? (
					<CircularProgress sx={{ marginLeft: "32px" }} size={30} />
				) : (
					<>
						{FileName && FileName.tax_registration_certificate &&
							<>
								<Box display={"flex"} alignContent={"center"} alignItems={"center"} gap={1}>
									<Box style={{
										background: "#EDF5FF"
									}} borderRadius={"40px"} padding={"6px"} marginTop={2} width={"90%"} gap={"2"}>
										<Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
											<Box display={"flex"} alignItems={"center"} gap={1}>
												<img src="/updatedfile.svg" width={"35px"}></img>
												<Typography fontSize={15}>{FileName.tax_registration_certificate}</Typography>
											</Box>
											<Typography fontSize={11} fontWeight={600} marginRight={1}
												color={"#d3d3d3"}
											>{FileSize.tax_registration_certificate}kb</Typography>
										</Box>
									</Box>
									<Box width={"10%"}>
										<img src="/delete.svg" width={"45dpx"} style={{
											marginTop: "20px"
										}}></img>
									</Box>

								</Box>
								{
									FileType.tax_registration_certificate.split("/")[1] != "pdf" &&
									FileType.tax_registration_certificate.split("/")[1] != "plain" &&
									FileType.tax_registration_certificate.split("/")[1] != "doc" &&
									<Typography fontSize={"12px"} padding={"3px"} color={"red"}>Attachment failed to upload. Please upload your file in .pdf, .txt, .doc format only</Typography>
								}
							</>
						}
					</>

				)}


				<Box bgcolor='#FBFBFB' marginTop={5} borderRadius='0.625rem' width={"100%"}>
					<Typography fontSize='14px' display={"flex"} gap={"10px"} fontWeight={400} color='rgba(0, 0, 0, 0.6)' marginTop={3}>
						<span style={
							{
								borderStyle: "solid",
								borderColor: "#D3D3D3",
								borderRadius: "50%",
								width: "27px",
								height: "26px",
								textAlign: "center",
								borderWidth: "1px",
								paddingTop: "1.5px"
							}
						}>B</span>	<span> Address Proof</span>
					</Typography>


					<Box border={"dashed"} marginTop={2} padding={2} paddingLeft={4} paddingRight={4} borderColor={"#CED2D6"} borderRadius={2} position={"relative"} height={"105px"}>
						<Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
							<Box>
								<Typography fontSize='14px' style={{
									cursor: "pointer"
								}} fontWeight={400} color='rgba(0, 0, 0, 0.6)'>
									Drop files here to upload, or click <span style={{
										textDecoration: isEnteredFileName == true && isEnteredHoverFileName == "address_proof" ? "underline" : "",
										textUnderlineOffset: "3px"
									}}>Upload</span>
								</Typography>

								<Typography fontSize='10px' style={{
									cursor: "pointer",
									opacity: "1",
								}} fontWeight={500} marginTop={1} color='#949494' >PNG, JPEG (max 1 Mb)</Typography>
								<input
									name='address_proof'
									type='file'
									onChange={handleFileUpload}
									style={{
										opacity: "0",
										width: "285px",
										position: "absolute",
										top: 0,
										background: "red"
									}}
									onMouseEnter={() => handlefileEndtered("address_proof")}
									onMouseLeave={handlefileLeave}
								/>
							</Box>
							<Box>
								<img src="/file.svg"></img>
							</Box>
						</Box>
					</Box>
					{filesUploading.address_proof ? (
						<CircularProgress sx={{ marginLeft: "32px" }} size={30} />
					) : (

						<>
							{FileName && FileName.address_proof &&
								<>
									<Box display={"flex"} alignContent={"center"} alignItems={"center"} gap={1}>
										<Box style={{
											background: "#EDF5FF"
										}} borderRadius={"40px"} padding={"6px"} marginTop={2} width={"90%"} gap={"2"}>
											<Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
												<Box display={"flex"} alignItems={"center"} gap={1}>
													<img src="/updatedfile.svg" width={"35px"}></img>
													<Typography fontSize={15}>{FileName.address_proof}</Typography>
												</Box>
												<Typography fontSize={11} fontWeight={600} marginRight={1}
													color={"#d3d3d3"}
												>{FileSize.address_proof}kb</Typography>
											</Box>
										</Box>
										<Box width={"10%"}>
											<img src="/delete.svg" width={"45dpx"} style={{
												marginTop: "20px"
											}}></img>
										</Box>

									</Box>
									{
										FileType.address_proof.split("/")[1] != "pdf" &&
										FileType.address_proof.split("/")[1] != "plain" &&
										FileType.address_proof.split("/")[1] != "doc" &&
										<Typography fontSize={"12px"} padding={"3px"} color={"red"}>Attachment failed to upload. Please upload your file in .pdf, .txt, .doc format only</Typography>
									}
								</>
							}
						</>


					)}
				</Box>


				<Box bgcolor='#FBFBFB' marginTop={5} borderRadius='0.625rem' width={"100%"}>
					<Typography fontSize='14px' display={"flex"} gap={"10px"} fontWeight={400} color='rgba(0, 0, 0, 0.6)' marginTop={3}>
						<span style={
							{
								borderStyle: "solid",
								borderColor: "#D3D3D3",
								borderRadius: "50%",
								width: "27px",
								height: "26px",
								textAlign: "center",
								borderWidth: "1px",
								paddingTop: "1.5px"
							}
						}>C</span>	<span>Company registration Certificate</span>
					</Typography>

					<Box border={"dashed"} marginTop={2} padding={2} paddingLeft={4} paddingRight={4} borderColor={"#CED2D6"} borderRadius={2} position={"relative"} height={"105px"}>
						<Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
							<Box>
								<Typography fontSize='14px' style={{
									cursor: "pointer"
								}} fontWeight={400} color='rgba(0, 0, 0, 0.6)'>
									Drop files here to upload, or click <span style={{
										textDecoration: isEnteredFileName == true && isEnteredHoverFileName == "company_registration_certificate" ? "underline" : "",
										textUnderlineOffset: "3px"
									}}>Upload</span>
								</Typography>

								<Typography fontSize='10px' style={{
									cursor: "pointer",
									opacity: "1",
								}} fontWeight={500} marginTop={1} color='#949494' >PNG, JPEG (max 1 Mb)</Typography>
								<input
									name='company_registration_certificate'
									type='file'
									onChange={handleFileUpload}
									style={{
										opacity: "0",
										width: "285px",
										position: "absolute",
										top: 0,
										background: "red"
									}}
									onMouseEnter={() => handlefileEndtered("company_registration_certificate")}
									onMouseLeave={handlefileLeave}
								/>
							</Box>
							<Box>
								<img src="/file.svg"></img>
							</Box>
						</Box>
					</Box>
					{filesUploading.company_registration_certificate ? (
						<CircularProgress sx={{ marginLeft: "32px" }} size={30} />
					) : (

						<>
							{FileName && FileName.company_registration_certificate &&
								<>
									<Box display={"flex"} alignContent={"center"} alignItems={"center"} gap={1}>
										<Box style={{
											background: "#EDF5FF"
										}} borderRadius={"40px"} padding={"6px"} marginTop={2} width={"90%"} gap={"2"}>
											<Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
												<Box display={"flex"} alignItems={"center"} gap={1}>
													<img src="/updatedfile.svg" width={"35px"}></img>
													<Typography fontSize={15}>{FileName.company_registration_certificate}</Typography>
												</Box>
												<Typography fontSize={11} fontWeight={600} marginRight={1}
													color={"#d3d3d3"}
												>{FileSize.company_registration_certificate}kb</Typography>
											</Box>
										</Box>
										<Box width={"10%"}>
											<img src="/delete.svg" width={"45dpx"} style={{
												marginTop: "20px"
											}}></img>
										</Box>

									</Box>
									{
										FileType.address_proof.split("/")[1] != "pdf" &&
										FileType.address_proof.split("/")[1] != "plain" &&
										FileType.address_proof.split("/")[1] != "doc" &&
										<Typography fontSize={"12px"} padding={"3px"} color={"red"}>Attachment failed to upload. Please upload your file in .pdf, .txt, .doc format only</Typography>
									}
								</>
							}
						</>


					)}
				</Box>





			</Box>

			<Box display='flex' justifyContent='end' gap={3}>
				<Button
					variant='contained'
					size='small'
					onClick={() => handleNavigate()}
					type='submit'
					sx={{
						textTransform: "none",
						bgcolor: "white !important",
						padding: "14px 24px",
						color: "black",
					}}>
					Go Back
				</Button>
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
		</Box >
	);
};

export default Step3;
