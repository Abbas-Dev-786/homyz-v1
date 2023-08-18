import { useState } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthBtn } from "./AuthComponents";
import AuthInput from "./AuthInput";
import GoogleBtn from "./GoogleBtn";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.table({ firstName, lastName, email, password });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Typography variant="h4" textAlign="center" fontWeight={700}>
        Register Here
      </Typography>

      <AuthInput
        label="First Name"
        id="firstName"
        variant="outlined"
        type="text"
        placeholder="Enter First Name"
        value={firstName}
        set={setFirstName}
        fullWidth
        required
      />

      <AuthInput
        label="Last Name"
        id="lastName"
        variant="outlined"
        type="text"
        placeholder="Enter Last Name"
        value={lastName}
        set={setLastName}
        fullWidth
        required
      />

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
      <AuthInput
        label="Password"
        id="password"
        variant="outlined"
        type="password"
        placeholder="Enter Password"
        value={password}
        set={setPassword}
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
        Register
      </AuthBtn>

      <GoogleBtn text="Register" />

      <Typography variant="body2" textAlign="center">
        Already have account?{" "}
        <Link to="/login">
          <u>Login Here</u>
        </Link>
      </Typography>
    </form>
  );
};

export default RegisterForm;
