import { useMemo } from "react";
import { Redirect, matchPath, useLocation } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackRounded from "@material-ui/icons/ArrowBackRounded";
import { Link } from "react-router-dom";
import { TAsyncResult, useAsyncValue } from "./useAsyncValue";
import { routes } from "./routes";
import { ToastMessage } from "./ToastMessage";
import { NavigationMenu, useNavigationMenuState } from "./NavigationMenu";
import { TLocationState } from "./types";
import { APIProvider, createAPI } from "./api";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  offset: { height: theme.spacing(2) },
  centeredCircularProgress: {
    display: "block",
    margin: "auto",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  backButton: { marginRight: theme.spacing(2) },
}));

function App() {
  const api = useMemo(() => createAPI(null), []);

  const classes = useStyles();

  const location = useLocation<TLocationState>();

  const matchingRoute = useMemo(
    () =>
      routes
        .map((route) => {
          const match = matchPath<any>(location.pathname, {
            path: route.path,
            exact: true,
            strict: false,
          });
          return match ? { match, route } : null;
        })
        .filter(Boolean)[0] ?? null,
    [location.pathname]
  );

  const dataResultPromise = useMemo(
    () =>
      matchingRoute && "loadData" in matchingRoute.route
        ? matchingRoute.route.loadData?.(api, matchingRoute.match.params as any)
        : null,
    [api, matchingRoute]
  );

  const dataResult = useAsyncValue<any>(dataResultPromise);
  const navigationMenuState = useNavigationMenuState();

  return (
    <>
      {location.state && "message" in location.state && (
        <ToastMessage
          message={location.state.message.text}
          severity={location.state.message.severity}
        />
      )}

      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={navigationMenuState.open}
          >
            <MenuIcon />
          </IconButton>
          {matchingRoute?.route.backPath && (
            <Link
              to={matchingRoute.route.backPath}
              style={{ color: "inherit" }}
            >
              <IconButton
                edge="start"
                color="inherit"
                className={classes.backButton}
              >
                <ArrowBackRounded />
              </IconButton>
            </Link>
          )}
          <NavigationMenu navigationMenuState={navigationMenuState} />
          <Typography variant="h6" className={classes.title}>
            {matchingRoute && (
              <matchingRoute.route.Title
                dataResult={dataResult as TAsyncResult<any>}
                routeParams={matchingRoute.match.params}
              />
            )}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
      <Container>
        <Box my={2}>
          <APIProvider value={api}>
            {matchingRoute ? (
              <matchingRoute.route.Content
                dataResult={dataResult}
                routeParams={matchingRoute.match.params}
              />
            ) : (
              <Redirect to="/demo" />
            )}
          </APIProvider>
        </Box>
      </Container>
    </>
  );
}

export default App;
