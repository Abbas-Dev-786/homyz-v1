import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";

import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Property from "./pages/Property";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import theme from "./theme";

const queryClient = new QueryClient({});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="properties" element={<Properties />} />
            <Route path="properties/:id" element={<Property />} />
            <Route path="contact" element={<Home />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/verifyEmail/:token" element={<VerifyEmail />} />

          <Route path="*" element={<h1>404 page</h1>} />
        </Routes>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
