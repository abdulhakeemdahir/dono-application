import React, { useState, useEffect } from "react";
import { Typography, Grid, CssBaseline } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core";
import "./style.css";

import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import Nav from "../../components/Navigation/Nav";
import Elephant from "../../images/elephant.jpeg";
import Dolphin from "../../images/dolphin.jpeg";
import Whale from "../../images/whale.jpeg";

import Gradient from "../../components/Gradient";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Messaging/Sidebar";
import ChatContainer from "../../components/Messaging/ChatContainer";
// import Splash from "../../components/Splash";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

function getWindowDimensions() {
	const { innerWidth: width } = window;
	return {
		width,
	};
}

function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
}

// const useStyles = makeStyles(theme => ({}));

export default function Chatroom() {
	const [trendingState] = useState([
		{
			hashTag: "Save the Dolphins",
			url: "#",
		},
		{
			hashTag: "Save the Elephants",
			url: "#",
		},
		{
			hashTag: "Save the Whales",
			url: "#",
		},
	]);

	const [newsState] = useState([
		{
			title: "Dolphins Preservation",
			author: "Abdul",
			url: "#",
			thumbnail: Dolphin,
			post:
				"We need to save the dolphins! They are the humans of the Oceans! Plus, they were on Baywatch!",
			hashTag: "Save the Dolphins",
			comments: [
				{
					author: "Jake",
					post: "This is a test comment",
				},
				{
					author: "Bobby",
					post: "This is a test comment",
				},
				{
					author: "Drake",
					post: "This is a test comment",
				},
			],
		},
		{
			title: "Elephant Preservation",
			author: "Abdul",
			url: "#",
			thumbnail: Elephant,
			post:
				"We need to save the Elephant! They are the humans of the Sahara! Plus, they were in the Lion King!",
			hashTag: "Save the Elephant",
			comments: [
				{
					author: "Chris",
					post: "This is a test comment",
				},
				{
					author: "Sherman",
					post: "This is a test comment",
				},
				{
					author: "Drake",
					post: "This is a test comment",
				},
			],
		},
		{
			title: "Whale Preservation",
			author: "Abdul",
			url: "#",
			thumbnail: Whale,
			post:
				"We need to save the Whale! They are the humans of space! Plus, they were on Space Whales!",
			hashTag: "Save the Whale",
			comments: [
				{
					author: "Ani",
					post:
						"We need to save the Whale! They are the humans of space! Plus, they were on Space Whales!",
				},
				{
					author: "Stewart",
					post:
						"We need to save the Whale! They are the humans of space! Plus, they were on Space Whales!",
				},
				{
					author: "Cassandra",
					post:
						"We need to save the Whale! They are the humans of space! Plus, they were on Space Whales!",
				},
				{
					author: "Cassandra",
					post:
						"We need to save the Whale! They are the humans of space! Plus, they were on Space Whales!",
				},
			],
		},
	]);

	// const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const { width } = useWindowDimensions();
	return (
		<div className='Main'>
			<CssBaseline>
				<Nav />

				<Grid
					container
					direction='row'
					justify='center'
					className={"container"}
					xs={12}
					lg={10}
					xl={8}
				>
					{width > 600 ? (
						<>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={3} className='card-container'>
									<Typography variant='subtitle2'>USERS</Typography>
									<Sidebar />
								</Grid>
								<Grid item xs={12} sm={6} className='card-container'>
									<Typography variant='subtitle2'>CHATROOM</Typography>
									<ChatContainer />
								</Grid>
								<Grid item xs={12} sm={3} className='card-container'>
									<Typography variant='subtitle2'>Rooms</Typography>
								</Grid>
							</Grid>
						</>
					) : (
						<>
							<Tabs
								value={value}
								onChange={handleChange}
								aria-label='simple tabs example'
							>
								<Tab label='Users' {...a11yProps(0)} />
								<Tab label='Chatroom' {...a11yProps(1)} />
								<Tab label='Rooms' {...a11yProps(2)} />
							</Tabs>
							<TabPanel value={value} index={0}>
								<Grid item xs={12}>
									<Sidebar />
								</Grid>
							</TabPanel>
							<TabPanel value={value} index={1}>
								<Grid item xs={12}></Grid>
							</TabPanel>
							<TabPanel value={value} index={2}>
								<Grid item xs={12}></Grid>
							</TabPanel>
						</>
					)}
				</Grid>
				<Gradient />
				{/* <Splash /> */}
				<Footer />
			</CssBaseline>
		</div>
	);
}