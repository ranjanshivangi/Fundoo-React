import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Tooltip from "@mui/material/Tooltip";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import GridViewIcon from '@mui/icons-material/GridView';
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import { deepOrange } from "@mui/material/colors";
import { alpha } from "@mui/material";
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import {
  AccountCircleOutlined,
  AppsOutlined,
  RefreshOutlined,
  SettingsOutlined,
  } from "@mui/icons-material";
import "./Header.css";
import { useDispatch } from "react-redux";

const drawerWidth = 200;

const menuList = [
  {
    text: "Notes",
    icon: <LightbulbOutlinedIcon />,
  },
  {
    text: "Reminders",
    icon: <NotificationsNoneOutlinedIcon />,
  },
  {
    text: "Edit labels",
    icon: <EditOutlinedIcon />,
  },
  {
    text: "Archive",
    icon: <ArchiveOutlinedIcon />,
  },
  {
    text: "Bin",
    icon: <DeleteOutlineOutlinedIcon />,
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(5)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(6)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  height: "65px",
  boxShadow: "inset 0 -1px 0 0 #dadce0",
  ...(open && {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",  
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "8px",
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.05),
  },
  width: "100%",
  height: "50px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(0),
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    paddingTop: "13px",
    fontFamily: "DM Sans",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function MiniDrawer(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [text, setText] = React.useState("Keep");
  const [noteView, setNoteView] = React.useState("Grid");
  const [open, setOpen] = React.useState(true);
  const [profileanchorEl, setProfileAnchorEl] = React.useState(null);
  const openProfile = Boolean(profileanchorEl);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  
  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };
  const handleSignout = () => {    
    localStorage.removeItem('token');
    navigate('/login');
  };
  const handleListView = ()=>{
    setNoteView("List");
    dispatch({type : "List"})
  }
  const handleGridView = ()=>{
    setNoteView("Grid");
    dispatch({type : "Grid"})
  }

  return (
    <Box>
      <AppBar position="fixed" open={open} color="inherit">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <img
            className="img"
            src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
          />
          <Typography
            component="div"
            className="typography"
            fontFamily={"DM Sans"}
            fontSize={"22px"}
          >
            {text}
          </Typography>
          <div className="search">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </div>
          <div className="icons">
            <IconButton>
              <RefreshOutlined />
            </IconButton>
            <IconButton>
              {noteView === "Grid" ? <SplitscreenIcon onClick={handleListView} /> : <GridViewIcon  onClick={handleGridView}/> }              
            </IconButton>
            <IconButton>
              <SettingsOutlined />
            </IconButton>
          </div>
          <div className="profile">
            <IconButton>
              <AppsOutlined />
            </IconButton>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleProfileClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={openProfile ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openProfile ? "true" : undefined}
              >
                <Avatar
                  sx={{ bgcolor: deepOrange[500], width: 32, height: 32 }}
                  alt="Shivangi Ranjan"
                  src="/broken-image.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={profileanchorEl}
            open={openProfile}
            onClose={handleProfileClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleSignout} >Sign Out</MenuItem>
          </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{"& .MuiDrawer-paper": { borderWidth: 0 }}}>
        <DrawerHeader></DrawerHeader>
        <List>
          {menuList.map((item) => (
            <ListItem key={item.text} disableGutters disablePadding >
              <ListItemButton sx={{ borderRadius: "5px 50px 50px 5px", ":hover":{backgroundColor: "#F5CBA7 "}}}
                onClick={() => {
                  props.handleDrawerState(item.text);
                  setText(item.text);
                }}
                
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} disableTypography />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
