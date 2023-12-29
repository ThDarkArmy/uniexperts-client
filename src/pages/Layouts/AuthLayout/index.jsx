import {
	Box,
	Button,
	ThemeProvider,
	Typography,
	createTheme,
} from "@mui/material";
import uniexpertsSmall from "assets/icons/uniexperts-small.svg";
import styles from "./style.module.scss";

export const AuthLayout = ({ children }) => {
	return (
		<ThemeProvider
			theme={createTheme({
				typography: {
					fontFamily: "Inter, sans-serif",
				},
			})}>
			<Box className={styles.header}>
				<Box className={styles.flexContainer}>
					<img src={uniexpertsSmall} alt='' className={styles.logo} />
					<Typography className={styles.title}>uniexperts</Typography>
				</Box>
				<Box className={styles.flexContainer}>
					<Typography className={styles.dontExists}>
						Don’t have an account?
					</Typography>
					<Button className={styles.button}>Sign up</Button>
				</Box>
			</Box>
			{children}
		</ThemeProvider>
	);
};
