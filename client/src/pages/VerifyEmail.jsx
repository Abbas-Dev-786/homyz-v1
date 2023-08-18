import { Typography } from "@mui/material";
import AuthBox from "../components/auth/AuthBox";

const VerifyEmail = () => {
  return (
    <AuthBox>
      <Typography variant="body1" textAlign="center" fontWeight={600}>
        Email verified Please Login.
      </Typography>
    </AuthBox>
  );
};

export default VerifyEmail;
