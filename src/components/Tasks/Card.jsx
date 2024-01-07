import CancelIcon from "@mui/icons-material/Cancel";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import InfoIcon from "@mui/icons-material/Info";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { s3Upload } from "apis/app";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "store";
import ChatData from "./ChatData";

const responseTypeList = {
	INFORMATION: "Information",
	DOCUMENT: "Document",
	STATEMENT: "Statement",
};

const statusList = {
	NEW: "New",
	SCHEDULED: "Scheduled",
	IN_PROGRESS: "In Progress",
	RESCHEDULED: "Rescheduled",
	PENDING: "Pending",
	CLOSED: "Closed",
	COMPLETED: "Completed",
};

const Card = ({
	status,
	name,
	responseType,
	description,
	isRequired,
	completedAt,
	updatedAt,
	comments,
	id: taskId,
	updateInformation = () => {},
}) => {
	const { user: { details: { email } } = {} } = useSelector(state => state);
	const dispatch = useDispatch();

	const [data, setData] = useState(null);
	const [isShowingMore, setIsShowingMore] = useState(false);
	const [conversationList, setConversationList] = useState([]);

	const hiddenFileInput = useRef(null);

	useEffect(() => {
		if (!comments?.length) return;

		const tempConversationList = [];

		comments?.forEach(({ comment, user }) => {
			tempConversationList.push({
				...comment,
				isCurrentUser: user?.email === email,
				userDp: user?.dp,
				userName: user?.fullName,
			});
		});

		setConversationList(tempConversationList);
	}, [comments]);

	let statusColor = "";

	switch (status) {
		case statusList.NEW: {
			statusColor = "50 70 167";
			break;
		}

		case statusList.PENDING: {
			statusColor = "209 87 23";
			break;
		}

		case statusList.COMPLETED: {
			statusColor = "23 199 30";
			break;
		}

		case statusList.CLOSED: {
			statusColor = "203 28 28";
			break;
		}

		case statusList.RESCHEDULED: {
			statusColor = "102 51 153";
			break;
		}

		case statusList.IN_PROGRESS: {
			statusColor = "160 160 21";
			break;
		}

		case statusList.SCHEDULED: {
			statusColor = "100 149 237";
			break;
		}

		default: {
			statusColor = "0 0 0";
			break;
		}
	}

	const StatusIcon = () => {
		const iconProps = { sx: { scale: "0.75", color: `rgb(${statusColor})` } };

		switch (responseType) {
			case responseTypeList.INFORMATION:
				return <InfoIcon {...iconProps} />;

			case responseTypeList.DOCUMENT:
				return <FolderCopyIcon {...iconProps} />;

			case responseTypeList.STATEMENT:
				return <DescriptionIcon {...iconProps} />;

			default:
				return null;
		}
	};

	const handleAttachClick = () => hiddenFileInput.current.click();

	const handleFileAttachment = async event => {
		const file = event.target.files[0];

		if (!file) return;

		dispatch(setLoader(true));
		try {
			const fileURL = await s3Upload(file);

			setData({
				url: fileURL,
				name: file?.name,
				size: file?.size,
				type: file?.type,
			});

			dispatch(setLoader(false));
		} catch (error) {
			dispatch(setLoader(false));
		}
	};

	const clearAttachment = () => {
		setData(null);
		hiddenFileInput.current.value = "";
	};

	const onSubmit = () => {
		updateInformation({ taskId, data });
	};

	return (
		<Box
			display='flex'
			bgcolor={`rgb(${statusColor} / 20%)`}
			borderRadius='0.25rem'
			border={`1px solid rgb(${statusColor})`}
			borderLeft={0}
			overflow='hidden'>
			<Box
				sx={{
					writingMode: "vertical-lr",
					rotate: "180deg",
					p: "2.5rem 0.75rem",
					bgcolor: `rgb(${statusColor})`,
				}}>
				<Typography
					fontWeight={500}
					color='#fff'
					textTransform='uppercase'
					align='center'>
					{status}
				</Typography>
			</Box>

			<Box
				p='1rem'
				display='flex'
				flexDirection='column'
				gap='0.5rem'
				width='100%'>
				<Box
					display='flex'
					alignItems='center'
					justifyContent='space-between'
					gap='1rem'>
					<Box display='flex' alignItems='center' gap='0.25rem'>
						<StatusIcon />

						<Typography
							fontSize='0.825rem'
							fontWeight={500}
							maxWidth='40vw'
							noWrap>
							{name}
						</Typography>
					</Box>

					<Box display='flex' alignItems='center' gap='1rem'>
						{isRequired ? (
							<Box
								bgcolor='#F37B21'
								p='0.125rem 0.5rem'
								mr='-1rem'
								borderRadius='0.625rem 0 0 0.625rem'>
								<Typography
									fontSize='0.75rem'
									color='#fff'
									sx={{ textTransform: "uppercase" }}>
									Required
								</Typography>
							</Box>
						) : null}
					</Box>
				</Box>

				<Typography fontSize='0.75rem'>{description}</Typography>

				{responseType === responseTypeList.INFORMATION ? (
					<Box
						display='flex'
						flexDirection='column'
						gap='0.25rem'
						p='0.5rem'
						borderRadius='0.25rem'
						border={`1px solid rgb(${statusColor})`}>
						<Typography
							fontSize='0.75rem'
							fontWeight={500}
							color={`rgb(${statusColor})`}>
							Required Information
						</Typography>

						<Box display='flex' alignItems='center' gap='0.5rem'>
							<TextField
								fullWidth
								value={data}
								onChange={({ target: { value } }) => setData(value)}
								sx={{ bgcolor: "#fff" }}
							/>

							<Button
								variant='contained'
								size='small'
								disabled={!data}
								onClick={onSubmit}
								sx={{
									bgcolor: `rgb(${statusColor}) !important`,
									textTransform: "none",
									"&:disabled": {
										bgcolor: "rgba(0, 0, 0, 0.12) !important",
										color: "rgba(0, 0, 0, 0.26) !important",
									},
								}}>
								Save
							</Button>
						</Box>
					</Box>
				) : null}

				{responseType === responseTypeList.DOCUMENT ? (
					<Box
						display='flex'
						flexDirection='column'
						gap='0.25rem'
						p='0.5rem'
						borderRadius='0.25rem'
						border={`1px solid rgb(${statusColor})`}>
						<Typography
							fontSize='0.75rem'
							fontWeight={500}
							color={`rgb(${statusColor})`}>
							Attached Document
						</Typography>

						<Box
							display='flex'
							alignItems='center'
							justifyContent='space-between'
							gap='0.5rem'>
							{data && data?.url ? (
								<Box
									display='flex'
									gap='0.5rem'
									justifyContent='space-between'
									width='fit-content'
									borderRadius='1rem'
									p='0.4rem 0.75rem'
									bgcolor={`rgb(${statusColor} / 30%)`}>
									<Typography fontSize='0.75rem' color={`rgb(${statusColor})`}>
										{data?.name}
									</Typography>

									<IconButton
										onClick={clearAttachment}
										sx={{ p: 0, color: `rgb(${statusColor})` }}>
										<CancelIcon
											color='inherit'
											sx={{ height: "1rem", width: "1rem" }}
										/>
									</IconButton>
								</Box>
							) : (
								<Button
									variant='contained'
									size='small'
									onClick={handleAttachClick}
									sx={{
										bgcolor: `rgb(${statusColor}) !important`,
										textTransform: "none",
									}}>
									Select a file
								</Button>
							)}

							<input
								type='file'
								accept='image/*, video/*'
								ref={hiddenFileInput}
								onChange={handleFileAttachment}
								style={{ display: "none" }}
							/>

							<Button
								variant='contained'
								size='small'
								disabled={!data}
								onClick={onSubmit}
								sx={{
									bgcolor: `rgb(${statusColor}) !important`,
									textTransform: "none",
									"&:disabled": {
										bgcolor: "rgba(0, 0, 0, 0.12) !important",
										color: "rgba(0, 0, 0, 0.26) !important",
									},
								}}>
								Upload
							</Button>
						</Box>
					</Box>
				) : null}

				<Box
					display='flex'
					alignItems='center'
					justifyContent='space-between'
					gap='1rem'>
					<Typography fontSize='0.75rem' color={`rgb(${statusColor})`}>
						{completedAt
							? `Completed On: ${format(new Date(completedAt), "PPp")}`
							: `Pending Since: ${format(new Date(updatedAt), "PPp")}`}
					</Typography>

					{conversationList?.length ? (
						<Button
							disableRipple
							variant='text'
							size='small'
							onClick={() => setIsShowingMore(!isShowingMore)}
							sx={{
								textTransform: "none",
								color: "#747474",
								p: 0,
							}}
							endIcon={
								isShowingMore ? (
									<KeyboardArrowUpIcon />
								) : (
									<KeyboardArrowDownIcon />
								)
							}>
							{isShowingMore ? "Show Less" : "Show More"}
						</Button>
					) : null}
				</Box>

				{isShowingMore ? (
					<Box bgcolor='#fff' borderRadius='0.25rem'>
						<Box bgcolor='rgba(196, 196, 196, 0.4)' p='0.5rem 1rem'>
							<Typography fontSize='0.825rem' fontWeight={700}>
								Comments
							</Typography>
						</Box>

						<Box p='1rem'>
							<Box
								mt='0.5rem'
								height='50vh'
								p='0.5rem 0'
								pr='0.5rem'
								display='flex'
								flexDirection='column'
								overflow='auto'
								gap='1rem'
								sx={{
									"::-webkit-scrollbar": {
										display: "block",
										bgcolor: "rgb(0 0 0 / 10%)",
										width: "0.5rem",
										borderRadius: "0.25rem",
									},
									"::-webkit-scrollbar-thumb": {
										bgcolor: "rgb(0 0 0 / 20%)",
										borderRadius: "0.25rem",
									},
								}}>
								{conversationList?.length ? (
									conversationList?.map(details => (
										<ChatData key={details?.id} {...details} />
									))
								) : (
									<Box
										display='grid'
										flexGrow={1}
										bgcolor='rgb(0 0 0 / 12%)'
										sx={{ placeItems: "center" }}>
										<Typography>No Conversation to Show !</Typography>
									</Box>
								)}
							</Box>
						</Box>
					</Box>
				) : null}
			</Box>
		</Box>
	);
};

export default Card;
