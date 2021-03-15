import React, { useState, useEffect } from "react";
import { Typography, Grid, Paper, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import "./style.css";

const useStyles = makeStyles(theme => ({
	root: {
		"& > *": {
			marginBottom: theme.spacing(1),
			width: "100%",
		},
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
}));

export default function Post() {
	const classes = useStyles();

	return (
		<Grid>
			<form className={classes.root} noValidate autoComplete='off'>
				<Grid container>
					<TextField
						id='title'
						label='Title'
						multiline
						rowsMax={4}
						className={classes.inputMargin}
					/>
					<TextField
						id='hashTag'
						label='Hash Tag'
						multiline
						rowsMax={4}
						className={classes.inputMargin}
					/>
					<TextField
						id='imageUrl'
						label='Image Url'
						multiline
						rowsMax={4}
						className={classes.inputMargin}
					/>
				</Grid>
				<TextField
					id='post'
					label='Post a Comment'
					variant='outlined'
					multiline
					rowsMax={4}
				/>
				<Button size='large' className={classes.styleMain}>
					Post
				</Button>
			</form>
		</Grid>
	);
}
