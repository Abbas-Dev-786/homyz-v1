import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import theme from "./theme";
import Property from "./pages/Property";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/:id" element={<Property />} />
          <Route path="contact" element={<Home />} />
        </Route>

        <Route path="/login" element={<h1>Login page</h1>} />
        <Route path="*" element={<h1>404 page</h1>} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
