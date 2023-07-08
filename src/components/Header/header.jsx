import s from "./index.module.css";
import cn from "classnames";
import { ReactComponent as FavoriteIcon } from "./img/favorites.svg";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";
import { useDispatch, useSelector } from "react-redux";
import { delUserContent } from "../../reduxToolkit/Slices/registrationkitSlice";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { ShoppingBasket } from "@mui/icons-material";

function Header({
  setModalActive,
  token,
  exit,
  children,
  refresh,
  flag,
  handleCart,
  orderLen
}) {
  const { favorites } = useContext(CardContext);
  const { setUserInfo, setSearchQuery, currentUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector((state) => state.registration.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenu = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const profileExit = useCallback(() => {
    setAnchorEl(null);
    setSearchQuery("");
    exit();
    dispatch(delUserContent());
  }, [setAnchorEl, setSearchQuery, exit, delUserContent]);

  const handleProfile = useCallback(() => {
    setAnchorEl(null);
    setModalActive(true);
  }, [setAnchorEl, setModalActive]);

  return (
    <header className={cn(s.header, "cover")}>
      <div className="container">
        <div className={s.header__wrapper}>
          {children}
          <div className={s.iconsMenu}>
            {token && user && (
              <Box>
                <Tooltip title="Открыть настройки">
                  <IconButton onClick={handleMenu}>
                    <Avatar
                      alt="avatar"
                      src={user.avatar}
                      sx={{
                        transition: "all 0.5s ease 0s",
                        "&:hover": {
                          boxShadow:
                            "0px 0px 13px 6px rgba(255, 146, 155, 0.3)",
                        },
                        "&:active": {
                          boxShadow:
                            "0px 0px 13px 6px rgba(185, 255, 146, 0.3)",
                        },
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleProfile}>Открыть профиль</MenuItem>
                  <MenuItem onClick={profileExit}>Выйти</MenuItem>
                </Menu>
              </Box>
            )}
            <Link
              className={s.favoritesLink}
              to={{ pathname: "/dog3/favorites", state: "sfsdfsdf" }}
              title="Открыть избранное"
            >
              <FavoriteIcon />
              {favorites.length !== 0 && (
                <span className={s.iconBubble}>{favorites.length}</span>
              )}
            </Link>
            <IconButton
              color="inherit"
              onClick={handleCart}
              title="Корзина покупок"
              sx={{ width: "40px", height: "40px", transition: "all 0.4s",'&:hover': {
                transform:'scale(0.8)'
    }, }}
            >
            <Badge
            color='secondary'
            badgeContent={orderLen}
            sx={{width: "30px", height: "30px"}}
            >
              <ShoppingBasket />
              </Badge>
            </IconButton>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
