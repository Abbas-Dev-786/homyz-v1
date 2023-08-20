import { useState } from "react";
import {
  Box,
  Tooltip,
  IconButton,
  Menu,
  Avatar,
  MenuItem,
  Typography,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const UserMenu = () => {
  const { removeUser } = useAuth();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutHandler = () => {
    const result = removeUser();

    result
      ? toast.success("Logout Successfull")
      : toast.error("user does not exists");
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar sx={{ width: 32, height: 32 }} alt="Remy Sharp" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        disableScrollLock={true}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {/* {settings.map((setting) => (
          <MenuItem key={setting}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))} */}
        <MenuItem>
          <Typography textAlign="center">Profile</Typography>
        </MenuItem>
        <MenuItem>
          <Typography textAlign="center">Dashboard</Typography>
        </MenuItem>
        <MenuItem onClick={logoutHandler}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
