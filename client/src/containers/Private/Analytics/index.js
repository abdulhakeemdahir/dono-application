/* eslint-disable react-hooks/exhaustive-deps */
// Import all relevant packages and components
import React, { useEffect } from "react";

import { Typography, Grid, CssBaseline, Breadcrumbs } from "@material-ui/core";
import "../../pageStandards.scss";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Nav from "../../../components/Navigation";
import Gradient from "../../../components/Gradient";
import Footer from "../../../components/Footer";
import { TabPanel, a11yProps, useWindowDimensions } from "../../utils";
import ChartFollowers from "../../../components/Graphs/ChartFollowers";
import ChartSupporters from "../../../components/Graphs/ChartSupporters";
import ChartFollowAndSupport from "../../../components/Graphs/ChartFollowAndSupport";
import ChartCausesCreated from "../../../components/Graphs/ChartCausesCreated";
import ChartCausesSupported from "../../../components/Graphs/ChartCausesSupported";
import About from "../../../components/About";
import { useUserContext } from "../../../utils/GlobalStates/UserContext";
import {
  UPDATE_USER,
  USER_LOADING
  //What about USER_LOADED?
} from "../../../utils/actions/actions";
import api from "../../../utils/api";

// import { Image } from "cloudinary-react";
import { NavLink } from "react-router-dom";

// Create TabPanel
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};
// Create the component function and export for use
const Analytics = () => {
  // Destructure State and Dispatch from Context
  const [userState, userDispatch] = useUserContext();
  // Get user Data
  useEffect(() => {
    async function fetchUserInfo() {
      console.log(userState.posts.length === 0);
      try {
        const userInfo = await api.getUser(userState._id);

        // console.log(userInfo.data);

        await userDispatch({ type: USER_LOADING });

        await userDispatch({
          type: UPDATE_USER,
          payload: {
            ...userInfo.data,
            loading: false
          }
        });
      } catch (err) {
        console.log(err);
      }
    }

    fetchUserInfo();
  }, []);
  // Create the set and setState from useState
  const [value, setValue] = React.useState(0);
  // Create the handleChange function
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // Call the Window Width function
  const { width } = useWindowDimensions();
  // Create the JSX for the component
  return (
    <div className='Main'>
      <CssBaseline>
        <Nav />
        <Grid
          container
          direction='row'
          justifyContent='center'
          className={"containerAnalytics"}
          xs={12}
          lg={10}
          xl={8}>
          {width > 1024 ? (
            <>
              <Breadcrumbs style={{ position: "absolute" }}>
                <NavLink to='newsfeed'>Home</NavLink>
                <Typography color='textSecondary'>Analytics</Typography>
              </Breadcrumbs>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3} className='card-container'>
                  <Typography variant='subtitle2'>ABOUT</Typography>

                  <About
                    key={userState._id}
                    id={userState._id}
                    bio={userState.bio}
                    firstName={userState.firstName}
                    lastname={userState.lastname}
                    username={userState.username}
                    email={userState.email}
                    role={userState.role}
                    verified={userState.verified}
                    following={userState.following.length}
                    followers={userState.followers.length}
                    posts={userState.posts}
                    causes={userState.causes}
                    profileImg={userState.profileImg}
                    bannerImg={userState.bannerImg}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className='card-container'>
                  <Typography variant='subtitle2'>ENGAGEMENT</Typography>
                  <ChartFollowers height={400} width={500} />
                  <ChartSupporters height={400} width={500} />
                  <ChartFollowAndSupport height={400} width={500} />
                </Grid>
                <Grid item xs={12} sm={3} className='card-container'>
                  <Typography variant='subtitle2'>CAUSES</Typography>
                  <ChartCausesCreated height={400} width={250} />
                  <ChartCausesSupported height={400} width={250} />
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label='simple tabs example'>
                <Tab label='Engagement' {...a11yProps(0)} />
                <Tab label='About' {...a11yProps(1)} />
                <Tab label='Causes' {...a11yProps(2)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <Grid container xs={12}>
                  <ChartFollowers height={300} width={300} />
                  <ChartSupporters height={300} width={300} />
                  <ChartFollowAndSupport height={300} width={300} />
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid container xs={12}>
                  <About
                    key={userState._id}
                    id={userState._id}
                    bio={userState.bio}
                    firstName={userState.firstName}
                    lastname={userState.lastname}
                    username={userState.username}
                    email={userState.email}
                    role={userState.role}
                    verified={userState.verified}
                    following={userState.following.length}
                    followers={userState.followers.length}
                    posts={userState.posts}
                    causes={userState.causes}
                    profileImg={userState.profileImg}
                    bannerImg={userState.bannerImg}
                  />
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Grid container xs={12}>
                  <ChartCausesCreated />
                  <ChartCausesSupported />
                </Grid>
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
};

export default Analytics;
