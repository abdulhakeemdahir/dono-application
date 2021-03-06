// Import all relevant packages and components
import { Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Logo from "../images/logo@2x.png";
// Create a useStyles Material UI component for styling
const useStyles = makeStyles({
	paper: {
		background:
			"linear-gradient( 90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 0% )",
		borderRadius: "10px",
		boxShadow: "0 3.42857px 23px rgb(0 0 0 / 10%)",
		padding: "20px",
	},
	centerPosition: {
		padding: "20px",
		textAlign: "center",
	},
	centerContainer: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
	bgstyle: {
		color: "#3f4d67",
	},
	mgstyle: {
		marginTop: "5px",
		marginBottom: "5px",
	},
	styleMain: {
		background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
		color: "#ffffff",
		padding: "15px",
	},
	styleSecondary: {
		background: "linear-gradient(-135deg,#899fd4,#a389d4)",
		color: "#ffffff",
	},
	linkStyle: {
		textDecoration: "none !important",
	},
});
// Create the component function and export for use
export default function Welcome() {
	// Call the styles function
	const classes = useStyles();
	// Create the JSX for the component
	return (
		<Grid item align='center'>
			<img
				src={Logo}
				alt='logo'
				style={{
					height: "50px",
					width: "auto",
				}}
			/>
			<Typography variant='h3' color='primary' style={{ fontWeight: "100" }}>
				Welcome to Dono
			</Typography>
			<Typography variant='h6' className={classes.bgstyle}>
				Where Giving is a Social Experience
			</Typography>
			<Typography variant='body2' color='default'>
				Please Log In, otherwise, please sign up! Otherwise you can go and
				explore.
			</Typography>
			<NavLink key='explore' to='/explore'>
				<Button variant='outlined' color='secondary'>
					<span className='linkStyle'>Explore</span>
				</Button>
			</NavLink>
		</Grid>
	);
}
