"use client";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import { deleteTokenLocalStorge } from "@/data/local/webData";
import { checkUser } from "@/helper/helper";

export default function navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button href="/" sx={{ color: "white" }}>
              EX.Next MUI
            </Button>
          </Typography>

          {checkUser() && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => setIsOpen(true)}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={isOpen}
                onClose={handleClose}
              >
                <MenuItem href="/profile">Profile</MenuItem>
                <MenuItem href="/account">My account</MenuItem>
                <MenuItem href="/signout">sign out</MenuItem>
              </Menu>
            </div>
          )}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setIsOpenMenu((show) => !show)}
          >
            <MenuIcon />
            <Box
              sx={{ width: "auto" }}
              role="presentation"
              onKeyDown={() => () => setIsOpenMenu(false)}
            >
              <Drawer
                anchor={"left"}
                open={isOpenMenu}
                onClose={() => () => setIsOpenMenu((show) => !show)}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton href="/">
                      <ListItemText primary={"home"} />
                    </ListItemButton>
                  </ListItem>
                  {checkUser() ? (
                    <ListItem disablePadding>
                      <ListItemButton href="/signout">
                        <ListItemText primary={"Sign out"} />
                      </ListItemButton>
                    </ListItem>
                  ) : (
                    <>
                      <ListItem disablePadding>
                        <ListItemButton href="/login">
                          <ListItemText primary={"Log in"} />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton href="/signup">
                          <ListItemText primary={"Sign up"} />
                        </ListItemButton>
                      </ListItem>
                    </>
                  )}
                </List>
              </Drawer>
            </Box>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
