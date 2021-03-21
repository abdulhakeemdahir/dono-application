import React from "react";
import {
	Typography,
	Grid,
	Divider,
	CardContent,
	Button,
	Dialog,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Edit } from "@material-ui/icons";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import "./style.css";
import UpdateCause from "../Forms/UpdateCause/UpdateCause";

export default function Causes(props) {
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<Grid item className='card'>
			<Grid container className='headerContainer'>
				<Grid item xs={9}>
					<Typography variant='subtitle1' style={{ fontWeight: "bold" }}>
						{props.title}
					</Typography>
				</Grid>
				<Grid item xs={3}>
					<Button className='editButton' onClick={handleOpen}>
						<Edit /> Edit
					</Button>
					<Dialog
						aria-labelledby='transition-modal-title'
						aria-describedby='transition-modal-description'
						open={open}
						onClose={handleClose}
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500,
						}}
					>
						<Fade in={open}>
							<UpdateCause className={"cardPost"} />
						</Fade>
					</Dialog>
				</Grid>
			</Grid>
			<Divider />
			<Grid container direction='row' spacing={1}>
				{/* <Grid item xs={12} sm={4}>
					<CardMedia className={"media"} image={props.image} />
				</Grid> */}
				<Grid item xs={12} sm={12}>
					<CardContent>
						<Typography variant='body2' color='textSecondary'>
							{props.post}
						</Typography>
					</CardContent>
				</Grid>
				<Button size='large' className='styleButton' fullWidth>
					<CreditCardIcon /> Support Cause
				</Button>
			</Grid>
		</Grid>
	);
}