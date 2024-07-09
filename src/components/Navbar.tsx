import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import {
  loginUser,
  logoutUser,
  selectLoggedInUser,
  setUser,
} from "../features/user/userSlice";
import { initializeDataStore } from "../utils/dbOperations/dbOperations";
import { localStorageKeys } from "../utils/dbOperations/config";
import { fetchComments } from "../features/comments/commentSlice";
import { fetchLikes } from "../features/likes/likeSlice";
import { fetchRatings } from "../features/ratings/ratingSlice";
import { useAppDispatch } from "../app/hooks";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = useSelector(selectLoggedInUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    initializeDataStore();

    const userId = localStorage.getItem(localStorageKeys.user);
    console.log("userid", userId);
    if (!userId) {
      return;
    }
    dispatch(setUser(userId));
    dispatch(fetchComments(userId));
    dispatch(fetchLikes(userId));
    dispatch(fetchRatings(userId));
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    handleClose();
    navigate("/");
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    handleClose();
    navigate("/login");
  };

  const handleSignup = () => {
    handleClose();
    navigate("/signup");
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "black", height: "10vh" }}>
      <Toolbar sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          FakeMovies
        </Typography>
        <IconButton
          color="inherit"
          onClick={() => navigate("/")}
          sx={{ mr: 2 }}
        >
          <HomeIcon />
        </IconButton>
        {user && (
          <IconButton
            color="inherit"
            onClick={() => navigate("/favorites")}
            sx={{ mr: 2 }}
          >
            <FavoriteIcon />
          </IconButton>
        )}
        <div>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {user ? (
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            ) : (
              <>
                {location.pathname !== "/login" && (
                  <MenuItem onClick={handleLogin}>Login</MenuItem>
                )}
                {location.pathname !== "/signup" && (
                  <MenuItem onClick={handleSignup}>Signup</MenuItem>
                )}
              </>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
