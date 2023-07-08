import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/app";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./reduxToolkit/storeToolkit";
import { ThemeProvider, createTheme } from "@mui/material";


const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = createTheme()
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
