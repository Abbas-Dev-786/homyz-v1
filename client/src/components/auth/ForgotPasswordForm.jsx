import { useState } from "react";
import { Typography } from "@mui/material";
import { AuthBtn } from "./AuthComponents";
import AuthInput from "./AuthInput";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  return (
    <form>
      <Typography variant="h4" textAlign="center" fontWeight={700}>
        Forgot Password
      </Typography>
      <Typography variant="body2" textAlign="center">
        We will send a password reset mail to your email account. After
        submitting your email address please check your inbox. Then click on the
        link to complete the process
      </Typography>

      <AuthInput
        label="Email"
        id="email"
        variant="outlined"
        type="email"
        placeholder="Enter Email address"
        value={email}
        set={setEmail}
        fullWidth
        required
      />
      <AuthBtn
        type="submit"
        variant="contained"
        size="large"
        sx={{ mt: 2 }}
        fullWidth
      >
        Send Mail
      </AuthBtn>
    </form>
  );
};

export default ForgotPasswordForm;
