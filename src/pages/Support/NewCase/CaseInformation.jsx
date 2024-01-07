import AttachFileIcon from "@mui/icons-material/AttachFile";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { s3Upload } from "apis/app";
import { createCase, getCaseSubTypes } from "apis/support";
import CustomTextField from "components/CustomTextField";
import DropdownWithSearch from "components/DropdownWithSearch";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { RouteNames } from "routes/_base";
import { setLoader } from "store";

const priorityList = ["Low", "Medium", "High"];

const CaseInformation = ({ typeList }) => {
	const { user: { details: { name, companyName } = {} } = {} } = useSelector(
		state => state
	);

	const history = useHistory();
	const dispatch = useDispatch();

	const [data, setData] = useState({
		contactName: name,
		accountName: companyName,
		priority: "Medium",
		attachment: {},
	});
	const [subTypeList, setSubTypeList] = useState([]);

	useEffect(() => {
		setData({
			...data,
			subType: null,
		});

		if (!data?.type) {
			setSubTypeList([]);
			return;
		}

		dispatch(setLoader(true));

		getCaseSubTypes(data?.type)
			.then((subTypes = []) => setSubTypeList(subTypes))
			.finally(dispatch(setLoader(false)));
	}, [data?.type]);

	const hiddenFileInput = useRef(null);

	const handleAttachClick = () => hiddenFileInput.current.click();

	const handleFileAttachment = async event => {
		const file = event.target.files[0];

		if (!file) return;

		dispatch(setLoader(true));
		try {
			const fileURL = await s3Upload(file);

			setData({
				...data,
				attachment: {
					url: fileURL,
					name: file?.name,
					size: file?.size,
					type: file?.type,
				},
			});

			dispatch(setLoader(false));
		} catch (error) {
			dispatch(setLoader(false));
		}
	};

	const clearAttachment = () => {
		setData({
			...data,
			attachment: {},
		});

		hiddenFileInput.current.value = "";
	};

	const handleOnChange = ({ key, value }) => {
		setData({
			...data,
			[key]: value,
		});
	};

	const isBtnDisabled = () => {
		const { contactName, accountName, type, priority, subject, description } =
			data || {};

		if (
			!contactName ||
			!accountName ||
			!type ||
			!priority ||
			!subject ||
			!description
		) {
			return true;
		}

		return false;
	};

	const _createCase = () => {
		const payload = {
			contactName: data?.contactName,
			accountName: data?.accountName,
			type: data?.type,
			priority: data?.priority,
			subject: data?.subject,
			description: data?.description,
		};

		if (data?.subType) {
			payload.subType = data?.subType;
		}

		if (data?.attachment?.url) {
			payload.attachment = data?.attachment?.url;
		}

		dispatch(setLoader(true));

		createCase(payload)
			.then(() => {
				history.replace(RouteNames.support);
				toast.success("Case Added Successfully");
			})
			.finally(dispatch(setLoader(false)));
	};

	return (
		<Box
			sx={{
				bgcolor: "#fff",
				p: "1rem 1.25rem",
				borderRadius: "0.625rem",
			}}>
			<Typography fontSize='1rem' fontWeight={500} color='#F37B21'>
				CASE INFORMATION
			</Typography>

			<Grid container rowSpacing={2} mt={0} mb='2rem'>
				<Grid item xs={12}>
					<CustomTextField
						disabled
						name='contactName'
						value={data?.contactName}
						placeholder='Contact Name'
						handleOnChange={handleOnChange}
					/>
				</Grid>

				<Grid item xs={12}>
					<CustomTextField
						disabled
						name='accountName'
						value={data?.accountName}
						placeholder='Account Name'
						handleOnChange={handleOnChange}
					/>
				</Grid>

				<Grid item xs={12}>
					<DropdownWithSearch
						name='type'
						value={data?.type}
						placeholder='Type'
						options={typeList}
						handleOnChange={handleOnChange}
					/>
				</Grid>

				<Grid item xs={12}>
					<DropdownWithSearch
						name='subType'
						value={data?.subType}
						placeholder='Sub-Type'
						options={subTypeList}
						handleOnChange={handleOnChange}
					/>
				</Grid>

				<Grid item xs={12}>
					<DropdownWithSearch
						name='priority'
						value={data?.priority}
						placeholder='Priority'
						options={priorityList}
						handleOnChange={handleOnChange}
					/>
				</Grid>
			</Grid>

			<Typography fontSize='1rem' fontWeight={500} color='#F37B21'>
				DESCRIPTION
			</Typography>

			<Grid container rowSpacing={2} mt={0} mb='0.5rem'>
				<Grid item xs={12}>
					<CustomTextField
						name='subject'
						value={data?.subject}
						placeholder='Subject'
						handleOnChange={handleOnChange}
					/>
				</Grid>

				<Grid item xs={12}>
					<CustomTextField
						name='description'
						value={data?.description}
						placeholder='Description'
						handleOnChange={handleOnChange}
						multiline
						rows={6}
					/>
				</Grid>

				<Grid item xs={12}>
					<Button
						variant='text'
						size='small'
						onClick={handleAttachClick}
						sx={{
							color: "#F37B21",
							textTransform: "none",
							"& .MuiButton-startIcon": { mr: 0 },
						}}
						startIcon={<AttachFileIcon />}>
						Add attachment
					</Button>

					<input
						type='file'
						accept='image/*, video/*'
						ref={hiddenFileInput}
						onChange={handleFileAttachment}
						style={{ display: "none" }}
					/>

					{Object.values(data?.attachment)?.length ? (
						<Box
							display='flex'
							gap='0.5rem'
							justifyContent='space-between'
							width='fit-content'
							maxWidth='100%'
							mt='0.5rem'
							bgcolor='rgb(0 0 0 / 8%)'
							p='0.25rem 0.5rem'
							borderRadius='0.25rem'>
							<Typography fontSize='0.825rem' lineHeight='1.8' noWrap>
								{data?.attachment?.name}
							</Typography>

							<IconButton
								onClick={clearAttachment}
								sx={{ p: 0, color: "red", scale: "0.8" }}>
								<CancelIcon color='inherit' />
							</IconButton>
						</Box>
					) : null}
				</Grid>
			</Grid>

			<Box display='flex' justifyContent='flex-end'>
				<Button
					variant='contained'
					size='small'
					disabled={isBtnDisabled()}
					onClick={_createCase}
					sx={{
						bgcolor: "#F37B21 !important",
						textTransform: "none",
						"&:disabled": {
							bgcolor: "rgb(0 0 0 / 12%)!important",
						},
					}}>
					Create
				</Button>
			</Box>
		</Box>
	);
};

export default CaseInformation;
