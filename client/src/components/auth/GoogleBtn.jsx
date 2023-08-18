import PropTypes from "prop-types";
import GoogleIcon from "@mui/icons-material/Google";
import { AuthBtn } from "./AuthComponents";

const GoogleBtn = ({ text }) => {
  return (
    <AuthBtn
      variant="contained"
      startIcon={<GoogleIcon />}
      sx={{ background: "#626167" }}
      fullWidth
    >
      {text} With Google
    </AuthBtn>
  );
};

GoogleBtn.propTypes = {
  text: PropTypes.string,
};

export default GoogleBtn;
