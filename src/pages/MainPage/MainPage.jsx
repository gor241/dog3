import { Button, Container, Typography } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";


export function MainPage() {
  const navigate = useNavigate();

  const onLoginClick = useCallback(() => {
    navigate("/dog3/login");
  }, []);

  const onRegisterClick = useCallback(() => {
    navigate("/dog3/register");
  }, []);

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "5rem" }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{color:'yellow',textShadow:'3px 3px 7px black'}}>
        Здравствуйте, пожалуйста зарегистрируйтесь (или войдите)
      </Typography>
      <Button
        variant="contained"
        color='success'
        onClick={onRegisterClick}
        style={{ margin: "1rem" }}
      >
        Зарегистрироваться
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={onLoginClick}
        style={{ margin: "1rem" }}
      >
        Логин
      </Button>
    </Container>
  );
}
