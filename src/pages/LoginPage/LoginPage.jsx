import React, { useState, useCallback, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import api from "../../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../reduxToolkit/Slices/registrationkitSlice";
import Snack from "../../components/Snack/Snack";

export function LoginPage() {
  const { setToken, setResetModalActive } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snack, setSnack] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.registration.user);
  const token = useSelector((state) => state.registration.token);
  const error = useSelector((state) => state.registration.error);

  useEffect(() => {
    if (user) {
      if (token) {
        api.setToken(token);
        setEmail("");
        setPassword("");
        setToken(token);
        localStorage.clear();
        localStorage.setItem("token", token);
        navigate("/dog3");
      }
    }
  }, [user]);

  useEffect(() => {
    if (error && email) {
      setSnack(true);
    }
  }, [error]);

  const handleLogin = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(signInUser({ email, password })).unwrap();
    },
    [dispatch, email, password]
  );

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // отменяем стандартное поведение браузера
      dispatch(signInUser({ email, password })).unwrap();
    }
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}
    >
      <Box
        sx={{
          padding: "20px",
          borderRadius: "40px",
          gap: "5px",
          background:'url(./dog.jpg) center/cover no-repeat',
          boxShadow: '4px 4px 10px -10px rgba(34, 60, 80, 0.8)'
        }}
      >
        <form id="login-form" onSubmit={handleLogin} onKeyDown={handleKeyDown}>
          <Typography
            variant="h5"
            noWrap
            component="p"
            sx={{ textAlign: "center" }}
          >
            Логин
          </Typography>
          <TextField
            sx={{ minWidth: "300px" }}
            variant="outlined"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            margin="normal"
            fullWidth
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
          <br />
          <TextField
            type={!showPassword ? "password" : "text"}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Пароль"
            margin="normal"
            fullWidth
            required
            onKeyDown={handleKeyDown}
            InputProps={{
              endAdornment: (
                <Button onClick={handleClickShowPassword}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              ),
            }}
          />
          <br />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Войти
            </Button>
            <Button fullWidth onClick={() => navigate("/dog3/register")}>
              Регистрация
            </Button>
          </Box>
        </form>
        <Snack
          isOpen={snack}
          severity="error"
          text={"Ошибка в авторизации"}
          handleClose={() => setSnack(false)}
        />
      </Box>
    </Box>
  );
}
