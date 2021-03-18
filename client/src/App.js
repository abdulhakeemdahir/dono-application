import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Landing from "./containers/Landing";
import Main from "./containers/Main";
import { UserProvider } from "./utils/GlobalStates/UserContext";
import { CauseProvider } from "./utils/GlobalStates/CauseContext";
import { NewsProvider } from "./utils/GlobalStates/NewsContext";
import { PostProvider } from "./utils/GlobalStates/PostContext";
import { TrendProvider } from "./utils/GlobalStates/TrendContext";
import { useAuthTokenStore } from "./utils/auth.js";
// import Main from "./containers/Main";
// import Dashboard from "./containers/Dashboard";
import { SocketProvider } from "./utils/GlobalStates/SocketProvider";
import useLocalStorage from "./hooks/useLocalStorage";
import { ConvoProvider } from "./utils/GlobalStates/ConvoContext";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1dc4e9"
    },
    secondary: { main: "#d500f9" },
    default: {
      main: "#454545"
      // second: "#899fd4"
    }
  }
});
function App() {
  const [id, setId] = useLocalStorage();

  useAuthTokenStore();

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <div className='App'>
          <SocketProvider id={id}>
            <ConvoProvider>
              <UserProvider>
                <CauseProvider>
                  <NewsProvider>
                    <PostProvider>
                      <TrendProvider>
                        <Switch>
                          <Route path='/main'>
                            <Main id={id} />
                          </Route>
                          <Route path='/'>
                            <Landing onLoginSetId={setId} />
                          </Route>
                        </Switch>
                      </TrendProvider>
                    </PostProvider>
                  </NewsProvider>
                </CauseProvider>
              </UserProvider>
            </ConvoProvider>
          </SocketProvider>
        </div>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
