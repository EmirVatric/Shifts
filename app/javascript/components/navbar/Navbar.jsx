import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Collapse from "@material-ui/core/Collapse";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import BookIcon from "@material-ui/icons/Book";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import GroupIcon from "@material-ui/icons/Group";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import AddIcon from "@material-ui/icons/Add";
import TocIcon from "@material-ui/icons/Toc";
import { loggedInStatus } from "../../actions/index";
import { store } from "../../packs/Index";
import Logo from "../../../assets/images/logo.png";

const drawerWidth = 240;

const logout = () => {
  const url = "/api/logout";
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok!");
    })
    .then(response => store.dispatch(loggedInStatus()))
    .catch(e => console.log(e));
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    height: 70
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  title: {
    flexGrow: 1,
    display: "block",
    fontWeight: "bold",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  homepage: {
    color: "#FE882E",
    "&:hover": {
      color: "#FE882E",
      textDecoration: "none"
    }
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  customizeToolbar: {
    height: 70
  },
  link: {
    textDecoration: "none",
    color: "black",
    "&:active": {
      color: "black",
      textDecoration: "none"
    }
  },
  logo: {
    height: 40,
    marginLeft: "22%",
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto"
    }
  }
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const loggedIn = useSelector(state => state.loggedIn);
  const [open, setOpen] = React.useState(false);
  const [openBooks, setOpenBooks] = React.useState(false);
  const [openTeams, setOpenTeams] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleBooksOpen = () => {
    setOpenBooks(!openBooks);
  };

  const handleTeamsOpen = () => {
    setOpenTeams(!openTeams);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar className={classes.customizeToolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <img src={Logo} className={classes.logo} alt="" />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/" onClick={handleDrawerClose} className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <ListItem button onClick={handleTeamsOpen}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Teams" />
            {openTeams ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openTeams} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link
                to="/teams"
                onClick={handleDrawerClose}
                className={classes.link}
              >
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <TocIcon />
                  </ListItemIcon>
                  <ListItemText primary="All Teams" />
                </ListItem>
              </Link>
              <Link
                to="/teams/create"
                onClick={handleDrawerClose}
                className={classes.link}
              >
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create Team" />
                </ListItem>
              </Link>
            </List>
          </Collapse>

          <ListItem button onClick={handleBooksOpen}>
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary="Tasks" />
            {openBooks ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openBooks} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link
                to="/timeline"
                onClick={handleDrawerClose}
                className={classes.link}
              >
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="My Day" />
                </ListItem>
              </Link>
              <Link
                to="/tasks"
                onClick={handleDrawerClose}
                className={classes.link}
              >
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <TocIcon />
                  </ListItemIcon>
                  <ListItemText primary="All Tasks" />
                </ListItem>
              </Link>
              <Link
                to="/task/create"
                onClick={handleDrawerClose}
                className={classes.link}
              >
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Create Task" />
                </ListItem>
              </Link>
            </List>
          </Collapse>
          <ListItem button>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
        <Divider />
        {loggedIn ? (
          <List>
            <Link
              to="/login"
              onClick={handleDrawerClose}
              className={classes.link}
            >
              <ListItem button>
                <ListItemIcon>
                  <LockOpenIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  onClick={() => {
                    logout();
                  }}
                />
              </ListItem>
            </Link>{" "}
          </List>
        ) : (
          <List>
            <Link
              to="/login"
              onClick={handleDrawerClose}
              className={classes.link}
            >
              <ListItem button>
                <ListItemIcon>
                  <LockOpenIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
            </Link>
            <Link
              to="/signup"
              onClick={handleDrawerClose}
              className={classes.link}
            >
              <ListItem button>
                <ListItemIcon>
                  <VpnKeyIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItem>
            </Link>
          </List>
        )}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  );
}
