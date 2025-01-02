import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { theme } from "./styles/theme";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
import StateContext from "./context/StateContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StateContext>
        <RouterProvider router={router}></RouterProvider>
      </StateContext>
    </ThemeProvider>
  </StrictMode>
);
