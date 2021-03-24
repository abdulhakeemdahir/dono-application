import * as React from "react";
import {
	AppBar,
	Toolbar,
	Container,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Hidden,
	InputBase,
	CssBaseline,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import NavDrawer from "./NavDrawer";
import Logo from "../../images/logo@2x.png";
import {
	useAuthTokenStore,
	useIsAuthenticated,
	useLogout,
} from "../../utils/auth";
import { Link, useHistory, NavLink } from "react-router-dom";
import { useUserContext } from "../../utils/GlobalStates/UserContext";

const useStyles = makeStyles(theme => ({
	appBar: {
		// boxShadow: "0 3.42857px 23px rgba(0, 0, 0, 0.1)",
		boxShadow: "0 8px 32px 0 rgb(31 38 135 / 7%)",
		background: "#3f4d67",
	},
	navbarDisplayFlex: {
		display: `flex`,
		justifyContent: `space-between`,
	},
	navDisplayFlex: {
		display: `flex`,
		justifyContent: `space-between`,
	},
	linkText: {
		textDecoration: `none`,
		textTransform: `uppercase`,
		color: `white`,
	},
	logoText: {
		fontWeight: `900`,
		textTransform: `uppercase`,
		color: `white`,
	},
	search: {
		position: "relative",
		// borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		// marginRight: theme.spacing(0),
		marginLeft: 0,
		height: "50px",
		top: ".3rem",
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			// marginLeft: theme.spacing(3),
			width: "50%",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color: `white`,
	},
	inputRoot: {
		color: "#ffffff",
	},
	inputInput: {
		padding: theme.spacing(2, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "100%",
		},
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "flex",
		},
	},
	logoutStyle: {
		background: "linear-gradient(-135deg, #e57373, #f06292)",
		color: "white",
		textDecoration: "none",
	},
	loginStyle: {
		background: "linear-gradient(-135deg,#1de9b6,#1dc4e9)",
		color: "white",
		textDecoration: "none",
	},
	activeLink: {
		borderBottom: "2px solid #e57373",
	},
}));



export default function Nav() {
	const [userState, ] = useUserContext();

	const navLinks = [
		{ title: `landing`, path: `/` },
		{ title: `explore`, path: `/explore` },
		{ title: `newsfeed`, path: `/newsfeed` },
		{ title: `dashboard`, path: `/dashboard/${userState._id}` },
	];

	const classes = useStyles();

	const logout = useLogout();

	const history = useHistory();

	const login = () => {
		history.push("/");
	};

	useAuthTokenStore();

	const isAuth = useIsAuthenticated();
	return (
		<CssBaseline>
			<AppBar position='static' className={classes.appBar}>
				<Toolbar>
					<Container maxWidth='lg' className={classes.navbarDisplayFlex}>
						<IconButton
							edge='start'
							color='inherit'
							aria-label='AccountCircle'
							to='/'
						>
							<img
								src={Logo}
								alt='logo'
								style={{ height: "40px", width: "auto" }}
							/>{" "}
							{/* <AccountCircle fontSize='large' /> */}
							{/* <Typography variant='h6' className={classes.logoText}>
								Dono
							</Typography> */}
						</IconButton>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder='Search…'
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								inputProps={{ "aria-label": "search" }}
								fullWidth
							/>
						</div>
						<div className={classes.grow} />
						<Hidden smDown>
							<List
								component='nav'
								aria-labelledby='main navigation'
								className={classes.navDisplayFlex}
							>
								{isAuth ? (
									<>
										<NavLink
											to='/newsfeed'
											key='newsfeed'
											className={classes.linkText}
											activeClassName={classes.activeLink}
										>
											<ListItem button>
												<ListItemText primary='newsfeed' />
											</ListItem>
										</NavLink>
										<NavLink
											to={`/dashboard/${userState._id}`}
											key='dashboard'
											className={classes.linkText}
											activeClassName={classes.activeLink}
										>
											<ListItem button>
												<ListItemText primary='dashboard' />
											</ListItem>
										</NavLink>
										<NavLink
											to='/chatroom'
											key='chatroom'
											className={classes.linkText}
											activeClassName={classes.activeLink}
										>
											<ListItem button>
												<ListItemText primary='chatroom' />
											</ListItem>
										</NavLink>
										<NavLink
											onClick={logout}
											className={classes.logoutStyle}
											to='/'
											key='/'
											activeClassName={classes.activeLink}
										>
											<ListItem button>
												<ListItemText className={classes.linkText}>
													Log Out
												</ListItemText>
											</ListItem>
										</NavLink>
									</>
								) : (
									<>
										<NavLink
											key='explore'
											to='/explore'
											className={classes.linkText}
											activeClassName={classes.activeLink}
										>
											<ListItem button>
												<ListItemText primary='explore' />
											</ListItem>
										</NavLink>
										<ListItem
											onClick={login}
											button
											className={classes.loginStyle}
										>
											<ListItemText className={classes.linkText}>
												Log In
											</ListItemText>
										</ListItem>
									</>
								)}
							</List>
						</Hidden>
						<Hidden mdUp>
							<NavDrawer navLinks={navLinks} />
						</Hidden>
					</Container>
				</Toolbar>
			</AppBar>
		</CssBaseline>
	);
}
