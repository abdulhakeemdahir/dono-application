import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Typography, Grid, ListItem, Container } from "@material-ui/core";
import { LinkedIn } from "@material-ui/icons";

const useStyles = makeStyles({
	footerStyle: {
		// bottom: "20px",
		position: "relative",
		// height: "45vh",
		width: "100%",
		zIndex: "1",
		color: "#008394 !important",
		// padding: "10px",
		textAlign: "center",
		justifyContent: "center",
	},
	heart: {
		color: "#ed4b82",
	},
	bottomPadding: {
		marginBottom: "20px",
	},
	linkedIn: {
		position: "relative",
		width: "100%",
		zIndex: "1",
		color: "#ed4b82 !important",
		textAlign: "center",
		justifyContent: "center",
	},
});
export default function Footer() {
	const classes = useStyles();
	return (
		<CssBaseline>
			<Grid justify='center' className={classes.bottomPadding}>
				<Typography variant='body1' className={classes.footerStyle}>
					Built with <span className={classes.heart}>♥︎</span> by:
					<ListItem className={classes.linkedIn}>
						<a href='https://www.linkedin.com/in/abdulhakeem-dahir-5330b5177/'>
							<ListItem className={classes.heart}>
								<LinkedIn />
								<Typography>Abdulhakeem Dahir</Typography>
							</ListItem>
						</a>
						<a href='https://www.linkedin.com/in/taani-maama-b86583157/'>
							<ListItem className={classes.heart}>
								<LinkedIn />
								<Typography>Taani Maama</Typography>
							</ListItem>
						</a>
						<a href='https://www.linkedin.com/in/daniel-soledad-1834a61b3/'>
							<ListItem className={classes.heart}>
								<LinkedIn />
								<Typography>Daniel Soledad</Typography>
							</ListItem>
						</a>
						<a href='https://www.linkedin.com/in/keenancodes/'>
							<ListItem className={classes.heart}>
								<LinkedIn />
								<Typography>Keenan Reed</Typography>
							</ListItem>
						</a>
					</ListItem>
				</Typography>
				<Typography variant='body2' className={classes.footerStyle}>
					Please click a name to view their Linked In. Thank you!
				</Typography>
			</Grid>
		</CssBaseline>
	);
}
