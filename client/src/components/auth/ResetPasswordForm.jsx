import { useState } from "react";
import { Typography } from "@mui/material";
import { AuthBtn } from "./AuthComponents";
import AuthInput from "./AuthInput";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  return (
    <form>
      <Typography variant="h4" textAlign="center" fontWeight={700}>
        Reset Password
      </Typography>

      <AuthInput
        label="Password"
        id="password"
        variant="outlined"
        type="password"
        placeholder="Enter your new Password"
        value={password}
        set={setPassword}
        fullWidth
        required
      />

      <AuthInput
        label="Confirm Password"
        id="confirmPassword"
        variant="outlined"
        type="password"
        placeholder="Confirm your new Password"
        value={confirmPassword}
        set={setconfirmPassword}
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
        Reset Password
      </AuthBtn>
    </form>
  );
};

export default ResetPasswordForm;
