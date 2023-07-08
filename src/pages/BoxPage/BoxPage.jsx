import { MainPage } from "../MainPage/MainPage";
import { Box } from "@mui/system";
import { Route, Routes, useLocation } from "react-router-dom";
import { LoginPage } from "../LoginPage/LoginPage";
import { RegisterPage } from "../RegisterPage/RegisterPage";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useRef } from "react";
import React from "react";
import './index.css';

export function BoxPage() {
  const location = useLocation();
  return (
    <Box
      sx={{
        position: "fixed",
        top: "0",
        left: "0",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        zIndex: 20,
      }}
    >
      <Box
        component="video"
        autoPlay
        muted
        loop
        src={`${process.env.PUBLIC_URL}/1.mp4`}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <Box
        sx={{
          textAlign: "center",
          marginTop: "30vh",
          position:'relative',
        }}
      >
      <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            classNames="slide"
            timeout={500}
            unmountOnExit={true}
            style={{ position: "fixed", width: "300px" }}
          >
            <Routes location={location}>
              <Route index element={<MainPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Routes>
          </CSSTransition>
          </TransitionGroup>
      </Box>
    </Box>
  );
}
