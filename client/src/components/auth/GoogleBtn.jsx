import PropTypes from "prop-types";
import GoogleIcon from "@mui/icons-material/Google";
import { AuthBtn } from "./AuthComponents";

const GoogleBtn = ({ text }) => {
  const handleGoogleLogin = (e) => {
    e.preventDefault();

    window.open("http://127.0.0.1:8000/api/v1/auth/google", "_self");
  };

  return (
    <AuthBtn
      variant="contained"
      startIcon={<GoogleIcon />}
      sx={{ background: "#626167" }}
      fullWidth
      onClick={handleGoogleLogin}
    >
      {text} With Google
    </AuthBtn>
  );
};

GoogleBtn.propTypes = {
  text: PropTypes.string,
};

export default GoogleBtn;
