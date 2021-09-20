import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { Link } from "react-router-dom";

import logo from "../../assets/logo.svg";
import { useState } from "react";
import { useEffect } from "react";
import { IconButton } from "@material-ui/core";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  logo: {
    height: "8em",
    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em",
    },
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: 0,
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    color: "white",
    "&:hover": {
      opacity: 1,
    },
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIcon: {
    height: "50px",
    width: "50px",
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7,
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  drawItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1,
    },
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

const Header = ({ selectedIndex, setSelectedIndex, value, setValue }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const [openDrawer, setOpenDrawer] = useState(false);

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i);
  };

  const menuOptions = [
    { name: "Services", link: "/services" },
    {
      name: "Custom Software Development",
      link: "/customsoftware",
    },
    {
      name: "iOS/Android App Development",
      link: "/mobileapps",
    },
    {
      name: "Website Development",
      link: "/websites",
    },
  ];

  useEffect(() => {
    if (
      window.location.pathname === "/websites" ||
      window.location.pathname === "/customsoftware" ||
      window.location.pathname === "/mobileapps"
    ) {
      setValue("/services");
    } else {
      setValue(window.location.pathname);
    }
    setSelectedIndex(
      menuOptions.findIndex((m) => m.link === window.location.pathname)
    );
  }, [setValue, setSelectedIndex]);

  const tabs = (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor="primary"
      >
        <Tab
          className={classes.tab}
          component={Link}
          to="/"
          label="Home"
          value="/"
        />
        <Tab
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup={anchorEl ? true : undefined}
          className={classes.tab}
          component={Link}
          onMouseOver={handleClick}
          label="Services"
          to="/services"
          value="/services"
        />
        <Tab
          className={classes.tab}
          component={Link}
          label="The Revolution"
          to="/revolution"
          value="/revolution"
        />
        <Tab
          className={classes.tab}
          component={Link}
          label="About us"
          to="/about"
          value="/about"
        />
        <Tab
          className={classes.tab}
          component={Link}
          label="Contact us"
          to="/contact"
          value="/contact"
        />
      </Tabs>
      <Button
        component={Link}
        to="/estimate"
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={() => setValue(7)}
      >
        Free Estimate
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{ paper: classes.menu }}
        // className={classes.menu}
        elevation={0}
        style={{ zIndex: 2705 }}
        keepMounted
      >
        {menuOptions.map((option, i) => {
          return (
            <MenuItem
              key={`${option}-${i}`}
              component={Link}
              to={option.link}
              classes={{ root: classes.menuItem }}
              onClick={(e) => {
                handleMenuItemClick(e, i);
                setValue("/services");
                handleClose();
              }}
              selected={i === selectedIndex && value === "/services"}
            >
              {option.name}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
        onOpen={() => {
          setOpenDrawer(true);
        }}
        anchor="right"
        classes={{ paper: classes.drawer }}
        // className={classes.drawer}
      >
        <div className={classes.toolbarMargin}></div>
        <List disablePadding>
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setValue("/");
            }}
            divider
            button
            component={Link}
            to="/"
            classes={{ selected: classes.drawItemSelected }}
            selected={value === "/"}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Home
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setValue("/services");
            }}
            divider
            button
            component={Link}
            to="/services"
            classes={{ selected: classes.drawItemSelected }}
            selected={value === "/services"}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Services
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setValue("/revolution");
            }}
            divider
            button
            component={Link}
            classes={{ selected: classes.drawItemSelected }}
            to="/revolution"
            selected={value === "/revolution"}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              The Revolution
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setValue("/about");
            }}
            divider
            button
            component={Link}
            to="/about"
            classes={{ selected: classes.drawItemSelected }}
            selected={value === "/about"}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              About us
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setValue("/contact");
            }}
            divider
            button
            component={Link}
            to="/contact"
            classes={{ selected: classes.drawItemSelected }}
            selected={value === "/contact"}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Contact Us
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setValue("/estimate");
            }}
            divider
            button
            component={Link}
            to="/estimate"
            classes={{
              root: classes.drawerItemEstimate,
              selected: classes.drawItemSelected,
            }}
            selected={value === "/estimate"}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => {
          setOpenDrawer(!openDrawer);
        }}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon}></MenuIcon>
      </IconButton>
    </>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar disableGutters>
            <Button
              component={Link}
              to="/"
              disableRipple
              className={classes.logoContainer}
              onClick={() => setValue("/")}
            >
              <img src={logo} alt="logo" className={classes.logo} />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin}></div>
    </>
  );
};

export default Header;
