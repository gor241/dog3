import { useState, useCallback, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import api from "../../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpUser,
  signInUser,
} from "../../reduxToolkit/Slices/registrationkitSlice";
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import Snack from "../../components/Snack/Snack";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export function RegisterPage() {
  const { setToken } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [group, setGroups] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snack, setSnack] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.registration.user);
  const token = useSelector((state) => state.registration.token);
  const error = useSelector((state) => state.registration.error);

  const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-zA-Z]).{5,}$/;

  function isValidPassword(password) {
    return PASSWORD_REGEX.test(password);
  }

  useEffect(() => {
    if (user) {
      if (!token) {
        handleLogin();
      }
      setTimeout(() => {
        if (token) {
          api.setToken(token);
          setEmail("");
          setPassword("");
          setToken(token);
          localStorage.clear();
          localStorage.setItem("token", token);
          navigate("/dog3");
        }
      }, 300);
    }
  }, [user, token]);

  useEffect(() => {
    if (error && email) {
      setSnack(true);
    }
  }, [error]);

  const handleLogin = useCallback(() => {
    dispatch(signInUser({ email, password })).unwrap();
  }, [dispatch, email, password]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(signUpUser({ email, group, password })).unwrap();
    },
    [dispatch, email, group, password]
  );

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((show) => !show);
  }, []);

  const handleMouseDownPassword = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // отменяем стандартное поведение браузера
      dispatch(signUpUser({ email, group, password })).unwrap();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          padding: "20px",
          borderRadius: "40px",
          gap: "5px",
          maxWidth: "350px",
          top: "50%",
          left: "calc(50%-350px)",
          transform:'scale(0.95)',
          background:'url(./dog.jpg) center/cover no-repeat',
          boxShadow: '4px 4px 10px -10px rgba(34, 60, 80, 0.8)'
        }}
      >
        <form
          id="registre-form"
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
        >
          <Typography variant="h5" noWrap component="p" sx={{textAlign:'center'}}>
            Регистрация
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            fullWidth
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
          <TextField
            label="Твоя группа"
            variant="outlined"
            value={group}
            onChange={(e) => setGroups(e.target.value)}
            margin="normal"
            required
            fullWidth
          />
          <TextField
            label="Пароль"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            fullWidth
            error={!isValidPassword(password)}
            helperText={
              !isValidPassword(password) &&
              "Пароль должен содержать минимум 5 символов, хотя бы 1 цифру и 1 букву"
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Зарегистрироваться
            </Button>
            <Button fullWidth onClick={() => navigate("/dog3/login")}>
              Уже зарегистрированы? Войти
            </Button>
          </Box>
        </form>
      </Box>
      <Snack
        isOpen={snack}
        severity="error"
        text={"Ошибка в регистрации"}
        handleClose={() => setSnack(false)}
      />
    </Box>
  );
}
