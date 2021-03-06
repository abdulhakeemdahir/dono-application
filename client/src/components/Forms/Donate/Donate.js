// Import all relevant packages and components
import { Grid, Button, TextField, Typography } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { makeStyles } from "@material-ui/core";
import "./style.css";
import { useState } from "react";
import api from "../../../utils/api";
// Create a useStyles Material UI component for styling
const useStyles = makeStyles(theme => ({
	root: {
		"& > *": {
			marginTop: theme.spacing(1),
			marginBottom: theme.spacing(0),
			width: "100%",
		},
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	styleMain: {
		background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
		color: "#ffffff",
		padding: "15px",
		marginTop: "10px",
		borderRadius: "0px",
	},
	inputMargin: {
		margin: "5px",
	},
	textStyle: {
		textAlign: "center",
	},
}));
// Create the component function and export for use
export default function Donate(props) {
	// Call the styles function
	const classes = useStyles();
	// Create the set and setState from useState
	const [donateState, setDonateState] = useState({
		amount: "",
		title: props.title,
	});
	// Create the handleChange function
	const handleChange = function(event) {
		const { name, value } = event.target;
		setDonateState({
			...donateState,
			[name]: value,
		});
	};
	// Create the handleSubmit function
	const handleSubmit = async event => {
		event.preventDefault();
		//Todo please add a nice styling for validation numbers
		if (!donateState.amount.match(/^\d+/)) {
			alert("numbers only");
			return;
		}
		const pay = await api.donate(donateState);
	};
	// Create the JSX for the component
	return (
		<Grid className='cardPost'>
			<form
				className={classes.root}
				noValidate
				autoComplete='off'
				onSubmit={handleSubmit}
			>
				<div>
					<Grid container>
						<Typography variant='h6' className={classes.textStyle}>
							Please Support this Cause!
						</Typography>
						<TextField
							name='amount'
							value={donateState.amount}
							onChange={handleChange}
							id='donate'
							label='Donation Amount'
							variant='filled'
							fullWidth
							size='small'
						/>
					</Grid>
				</div>
				<Button size='small' type='submit' className={classes.styleMain}>
					<ChatBubbleOutlineIcon /> Donate
				</Button>
			</form>
		</Grid>
	);
}
