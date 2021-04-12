// Import all relevant packages and components
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  CssBaseline,
  Input,
  Button
} from "@material-ui/core";
import useNavStyles from "./useNavStyles";
import SearchIcon from "@material-ui/icons/Search";
import NavDrawer from "./NavDrawer";
import Logo from "../../images/logo@2x.png";
import {
  useAuthTokenStore,
  useIsAuthenticated,
  useLogout
} from "../../utils/auth";
import { useHistory } from "react-router-dom";

// Create the component function and export for use
const Nav = () => {
  const navLinks = [
    { title: `landing`, path: `/` },
    { title: `explore`, path: `/explore` },
    { title: `newsfeed`, path: `/newsfeed` },
    { title: `dashboard`, path: `/dashboard` }
  ];
  // Create the set and setState from useState
  const [search, setSearch] = useState("");
  // Call the styles function
  const classes = useNavStyles();
  // Call the logout function
  const logout = useLogout();
  // Call the useHistory function
  const history = useHistory();
  // Call the login function
  const login = () => {
    history.push("/");
  };

  const handleSubmit = e => {
    e.preventDefault();

    const location = {
      pathname: "/search",
      search
    };

    history.push(location);
  };

  // Call the useAuth function
  useAuthTokenStore();
  const isAuth = useIsAuthenticated();
  // Create the JSX for the component
  return (
    <CssBaseline>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Container maxWidth="lg" className={classes.navbarDisplayFlex}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="AccountCircle"
              to="/"
            >
              <img
                src={Logo}
                alt="logo"
                style={{ height: "40px", width: "auto" }}
              />{" "}
            </IconButton>
            <div className={classes.search}>
              <form onSubmit={handleSubmit}>
                <Button type="submit" className={classes.searchIcon}>
                  <SearchIcon />
                </Button>
                <Input
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ "aria-label": "search" }}
                  onChange={e => setSearch(e.target.value)}
                  value={search}
                  fullWidth
                />
              </form>
            </div>
            <div className={classes.grow} />
            <NavDrawer navLinks={navLinks} />
          </Container>
        </Toolbar>
      </AppBar>
    </CssBaseline>
  );
};

export default Nav;
