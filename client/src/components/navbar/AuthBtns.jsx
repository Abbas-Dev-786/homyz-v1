import { Box, Button } from "@mui/material";

const AuthBtns = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
    >
      <Button variant="contained" size="small">
        Login
      </Button>
      <Button
        variant="outlined"
        size="small"
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        Register
      </Button>
    </Box>
  );
};

export default AuthBtns;
