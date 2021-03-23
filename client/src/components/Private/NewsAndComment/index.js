import React, { useState } from "react";
import {
	Typography,
	Grid,
	CardMedia,
	Divider,
	CardContent,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	TextField,
	Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./style.css";
import { Favorite } from "@material-ui/icons";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useUserContext } from "../../../utils/GlobalStates/UserContext";
import api from "../../../utils/api";
const useStyles = makeStyles(theme => ({
	root: {
		width: "100%",
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightBold,
		color: "#E57373",
	},
	shadow: {
		boxShadow: "none",
		// background: "#F7F7F7",
		borderRadius: "0px !important",
		width: "100%",
	},
	commentStyle: {
		backgroundColor: "#E57373",
		color: "white",
		borderRadius: "50px",
	},
	gridStyle: {
		borderBottom: "1px dashed #E7E7E7",
		paddingBottom: "2px",
	},
	selectEmpty: {
		// marginTop: theme.spacing(2),
	},
	styleMain: {
		background: "linear-gradient(-135deg,#1DE9B6,#1DC4E9)",
		color: "#FFFFFF",
		padding: "15px",
		// marginTop: "10px",
		borderRadius: "0px",
	},
	inputMargin: {
		// margin: "5px",
	},
}));
export default function NewsAndComment(props) {
	const classes = useStyles();

	const [userState] = useUserContext();

	const [open, setOpen] = useState(false);

	const [commentState, setCommentState] = useState({
		content: "",
	});

	const handleChange = function(event) {
		const { name, value } = event.target;
		setCommentState({
			...commentState,
			[name]: value,
		});
	};

	const handleSubmit = async id => {
		try {
			const comment = {
				...commentState,
				user: userState._id,
				post: id,
			};

			const { data } = await api.createComments(comment);

			await api.updatePost(id, { comments: data._id });
		} catch (err) {}
	};

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const [like, setLike] = React.useState(false);
	const handleLike = () => {
		setLike(!like);
		console.log(like);
	};
	return (
		<>
			<Grid item className='card' xs={12}>
				<Grid container className='headerContainer'>
					<Grid item xs={9} sm={11}>
						<Typography variant='subtitle1' style={{ fontWeight: "bold" }}>
							{props.title}
						</Typography>
					</Grid>
					<Grid item xs={3} sm={1}>
						<Button className='editButton' onClick={handleLike}>
							<>{like === true ? <Favorite /> : <FavoriteBorderIcon />}</>
						</Button>
					</Grid>
				</Grid>
				<Typography variant='body2' color='textSecondary' component='p'>
					<span className='authorStyle'> Author:</span> {props.author}
				</Typography>
				<Divider />
				<Grid container direction='row' spacing={1}>
					<Grid item xs={12} sm={4}>
						<CardMedia className={"media"} image={props.image} />
					</Grid>
					<Grid item xs={12} sm={8}>
						<CardContent>
							<Typography variant='body' color='textSecondary' component='p'>
								{props.post}
							</Typography>
							<a href={props.link} className='hashTagStyle'>
								#{props.hashTag}
							</a>
						</CardContent>
						<Divider />
					</Grid>
				</Grid>
				<Grid container xs={12} spacing={1}>
					<Grid item xs={12} sm={8}>
						<TextField
							name='content'
							value={commentState.content}
							onChange={handleChange}
							id={props.id}
							label='Post a Comment'
							variant='filled'
							size='small'
							multiline
							rowsMax={4}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={4} id={props.id}>
						<Button
							size='small'
							id={props.id}
							className={classes.styleMain}
							fullWidth
							onClick={() => handleSubmit(props.id)}
						>
							<ChatBubbleOutlineIcon id={props.id} /> Comment
						</Button>
					</Grid>
					{props.comments.length <= 0 ? (
						<Accordion className={classes.shadow}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon className={classes.commentStyle} />}
								aria-controls='panel1a-content'
								id='panel1a-header'
							>
								<Typography className={classes.heading}>
									Read {props.comments.length} Comments
								</Typography>
							</AccordionSummary>
							<Grid className='cardComment'>
								{props.comments.map(card => (
									<AccordionDetails>
										<Grid container xs={12} className={classes.gridStyle}>
											<Grid item xs={4}>
												<Typography
													variant='body'
													color='textSecondary'
													component='p'
												>
													{card.user.firstName}
												</Typography>
											</Grid>
											<Grid item xs={8}>
												<Typography
													variant='body'
													color='textSecondary'
													component='p'
												>
													{card.content}
												</Typography>
											</Grid>
										</Grid>
									</AccordionDetails>
								))}
							</Grid>
						</Accordion>
					) : null}
				</Grid>
			</Grid>
		</>
	);
}
