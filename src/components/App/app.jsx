import { useState, useEffect, useCallback, useRef } from "react";
import Footer from "../Footer/footer";
import Modal from "../Modal/Modal";
import Header from "../Header/header";
import Logo from "../Logo/logo";
import Search from "../Search/search";
import "./index.css";
import SeachInfo from "../SeachInfo";
import api from "../../utils/api";
import useDebounce from "../../hooks/useDebounce";
import { isLiked } from "../../utils/product";
import { ProductPage } from "../../pages/ProductPage/product-page";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { NotFoundPage } from "../../pages/NotFoundPage/not-found-page";
import { UserContext } from "../../context/userContext";
import { CardContext } from "../../context/cardContext";
import { SortContext } from "../../context/sortContext";
import { FaqPage } from "../../pages/FAQPage/faq-page";
import { FavoritePage } from "../../pages/FavoritePage/favorite-page";
import { IndexPage } from "../../pages/IndexPage/IndexPage";
import { useDispatch, useSelector } from "react-redux";
import Modale_content from "../Modal_content/Modal_content";
import Modal_avatar from "../Modal_avatar/Modal_avatar";
import Modale_form from "../Modale_form/Modale_form";
import { setIsUserContent } from "../../reduxToolkit/Slices/registrationkitSlice";
import { Box, Container } from "@mui/material";
import Snack from "../Snack/Snack";
import Basket from "../Basket/Basket";
import { getReviews } from "../../reduxToolkit/Slices/reviewstoolkitSlice";

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const debounceSearchQuery = useDebounce(searchQuery, 300);
  const [favorites, setFavorites] = useState([]);
  const [selectedTabId, setSelectedTabId] = useState("cheap");
  const [modalActive, setModalActive] = useState(false);
  const [token, setToken] = useState(null);
  const [flag, setFlag] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const tokenFromLS = localStorage.getItem("token");
  const [snackAdd, setAddSnack] = useState(false);
  const [snackDel, setDelSnack] = useState(false);
  const [snackProductAdd, setSnackProductAdd] = useState(false);
  const [snackProductDell, setSnackProductDell] = useState(false);
  const [prevFavoritesLength, setPrevFavoritesLength] = useState(0);
  const [order, setOrder] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const reviews = useSelector(getReviews);

  const openAvatarContent = () => {
    setContent(
      <div>{<Modal_avatar close={close} openBackForm={openBackForm} />}</div>
    );
    setModalActive(true);
  };

  const openFormContent = () => {
    setContent(
      <div>{<Modale_form close={close} openBackForm={openBackForm} />}</div>
    );
    setModalActive(true);
  };

  const [content, setContent] = useState(
    <div>
      {
        <Modale_content
          close={() => setModalActive(false)}
          openFormContent={openFormContent}
          openAvatarContent={openAvatarContent}
        />
      }
    </div>
  );

  const close = () => {
    setModalActive(false);
    setTimeout(() => {
      setContent(
        <div>
          {
            <Modale_content
              close={() => setModalActive(false)}
              openFormContent={openFormContent}
              openAvatarContent={openAvatarContent}
            />
          }
        </div>
      );
    }, 500);
  };

  const openBackForm = () => {
    setContent(
      <div>
        {
          <Modale_content
            close={() => setModalActive(false)}
            openFormContent={openFormContent}
            openAvatarContent={openAvatarContent}
          />
        }
      </div>
    );
    setModalActive(true);
  };

  useEffect(() => {
    if (favorites.length > prevFavoritesLength) {
      setAddSnack(true);
    } else if (favorites.length < prevFavoritesLength) {
      setDelSnack(true);
    }
    setPrevFavoritesLength(favorites.length);
  }, [favorites]);

  const user = useSelector((state) => state.registration.user);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRequest = useCallback(() => {
    setIsLoading(true);
    api
      .search(searchQuery)
      .then((searchResult) => {
        setCards(searchResult);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchQuery]);

  // Проверяем,если в localStorage token

  useEffect(() => {
    const tokenFromLS = localStorage.getItem("token");
    if (tokenFromLS) {
      api.setToken(tokenFromLS);
      setToken(tokenFromLS);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([productsData, userData]) => {
        setCurrentUser(userData);
        setCards(productsData.products);
        const favoriteProducts = productsData.products.filter((item) =>
          isLiked(item.likes, userData._id)
        );
        setFavorites((prevSate) => favoriteProducts);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [user, token, flag]);

  useEffect(() => {
    if (token) {
      handleRequest();
    }
  }, [debounceSearchQuery, token]);

  useEffect(() => {
    if (!user && tokenFromLS) {
      api.getUserInfo().then((user) => {
        dispatch(setIsUserContent(user));
      });
    }
  }, [user]);

  const handleFormSubmit = useCallback(
    (inputText) => {
      navigate("/");
      setSearchQuery(inputText);
      handleRequest();
    },
    [navigate, setSearchQuery, handleRequest]
  );

  const handleInputChange = useCallback(
    (inputValue) => {
      setSearchQuery(inputValue);
    },
    [setSearchQuery]
  );

  const handleProductLike = useCallback(
    (product) => {
      const liked = isLiked(product.likes, currentUser._id);
      return api.changeLikeProduct(product._id, liked).then((updateCard) => {
        const newProducts = cards.map((cardState) => {
          return cardState._id === updateCard._id ? updateCard : cardState;
        });

        if (!liked) {
          setFavorites((prevState) => [...prevState, updateCard]);
        } else {
          setFavorites((prevState) =>
            prevState.filter((card) => card._id !== updateCard._id)
          );
        }

        setCards(newProducts);
        return updateCard;
      });
    },
    [currentUser, cards]
  );

  useEffect(() => {
    // При монтировании компонента
    document.body.style.overflow = "";

    return () => {
      // При размонтировании компонента
      document.body.style.overflow = "hidden";
    };
  }, []);

  const exit = () => {
    localStorage.clear();
    navigate("/dog3");
    setToken("");
  };
  const refreshIcon = () => {
    setFlag(!flag);
    setSearchQuery("");
    handleInputChange("");
    navigate("/dog3");
  };

  const addToOrder = (goodsItem, quantity = 1) => {
    const indexInOrder = order.findIndex((item) => item._id === goodsItem._id);
    if (indexInOrder > -1) {
      quantity = order[indexInOrder].quantity + 1;
      setOrder(
        order.map((item) => {
          if (item._id !== goodsItem._id) return item;
          return {
            _id: item._id,
            name: item.name,
            price: item.price,
            discount: item.discount,
            quantity,
          };
        })
      );
    } else {
      setOrder([
        ...order,
        {
          _id: goodsItem._id,
          name: goodsItem.name,
          price: goodsItem.price,
          discount: goodsItem.discount,
          quantity,
        },
      ]);
    }
    setSnackProductAdd(true);
  };

  const removeFromOrder = (goodsItem) => {
    setOrder(order.filter((item) => item._id !== goodsItem));
    setSnackProductDell(true);
  };

  return (
    <Box
      sx={{
        position: modalActive ? "fixed" : "relative",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 5,
        overflow: "hidden",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SortContext.Provider value={{ selectedTabId, setSelectedTabId }}>
        <UserContext.Provider
          value={{
            currentUser,
            isLoading,
            token,
            setToken,
            setSearchQuery,
            userInfo,
            setUserInfo,
            currentUser,
            flag,
            userInfo,
            setUserInfo,
            refreshIcon,
            addToOrder,
          }}
        >
          <CardContext.Provider
            value={{ cards, favorites, handleLike: handleProductLike }}
          >
            <Box
              sx={{
                minHeight: "100vh",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Header
                setModalActive={setModalActive}
                token={token}
                exit={exit}
                refresh={setFlag}
                flag={flag}
                handleCart={() => setIsCartOpen(true)}
                orderLen={order.length}
              >
                <>
                  <Logo
                    href="/dog3"
                    title="На главную"
                    refreshIcon={refreshIcon}
                  />
                  <Routes>
                    <Route
                      path="/dog3"
                      element={
                        <Search
                          onSubmit={handleFormSubmit}
                          onInput={handleInputChange}
                        />
                      }
                    />
                  </Routes>
                </>
              </Header>
              <Container
                sx={{ mt: "1rem", flex: "1 1 auto", position: "relative" }}
              >
                <SeachInfo searchText={searchQuery} />
                <Routes location={location}>
                  <Route path="/dog3/*" element={<IndexPage />} />
                  <Route
                    path="/dog3/product/:productId"
                    element={<ProductPage token={token} />}
                  />
                  <Route
                    path="/dog3/add-review/:productId"
                    element={<ProductPage token={token} />}
                  />
                  <Route path="/dog3/faq" element={<FaqPage />} />
                  <Route path="/dog3/favorites" element={<FavoritePage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Container>
              <Basket
                cartOpen={isCartOpen}
                closeCart={() => setIsCartOpen(false)}
                order={order}
                removeFromOrder={removeFromOrder}
              />
              <Footer />
              <Modal active={modalActive} close={close}>
                {token && content}
              </Modal>
              <Snack
                isOpen={snackAdd}
                text={"Товар добавлен в избранное"}
                severity="success"
                handleClose={() => setAddSnack(false)}
              />
              <Snack
                isOpen={snackDel}
                text={"Товар удалён из избранного"}
                severity="warning"
                handleClose={() => setDelSnack(false)}
              />
              <Snack
                isOpen={snackProductAdd}
                text={"Товар добавлен в корзину"}
                severity="info"
                handleClose={() => setSnackProductAdd(false)}
              />
              <Snack
                isOpen={snackProductDell}
                text={"Товар удалён из корзины"}
                severity="error"
                handleClose={() => setSnackProductDell(false)}
              />
            </Box>
            <div className="bg"></div>
          </CardContext.Provider>
        </UserContext.Provider>
      </SortContext.Provider>
    </Box>
  );
}

export default App;
