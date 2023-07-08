import { useContext } from "react";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NotFound } from "../../components/NotFound/NotFound";
import Spinner from "../../components/Spinner";
import { CardContext } from "../../context/cardContext";
import { useApi } from "../../hooks/useApi";
import api from "../../utils/api";
import { Box } from "@mui/material";
import Product from "../../components/Product/product";
import { UserContext } from "../../context/userContext";
import Modal from "../../components/Modal/Modal";
import { AddReviewForm } from "../../components/Product/AddReviewForm";
import { useSelector, useDispatch } from "react-redux";
import {
  getCheckModal,
  setIsModal,
  getErrorMessage,
  removeErrorMessage,
  getReviews,
  setReviews,
} from "../../reduxToolkit/Slices/reviewstoolkitSlice";

// const ID_PRODUCT = '622c77e877d63f6e70967d22';
export const ProductPage = () => {
  const { productId } = useParams();
  const { handleLike } = useContext(CardContext);
  const [comment, setComment] = useState([]);
  const { addToOrder } = useContext(UserContext);
  const [count, setCount] = useState(1);
  const location = useLocation();
  const isPopupOpen = useSelector(getCheckModal);
  const dispatch = useDispatch();
  
  const reviews = useSelector(getReviews);

  const handleGetProduct = useCallback(
    () => api.getProductById(productId),
    [productId]
  );

  

  const {
    data: product,
    setData: setProduct,
    loading: isLoading,
    error: errorState,
  } = useApi(handleGetProduct);

  useEffect(() => {
    if (product) {
      api
        .getReview(product._id)
        .then((productComents) => {
          setComment(productComents);
        })
        .catch((err) => console.log(err));
    }
  }, [product]);

  useEffect(() => {
    if (location.pathname.includes("/dog3/add-review/")) {
      dispatch(setIsModal(true));
    }
  }, [location]);

  // useEffect(() => {
  //   if (reviews) {
  //     setComment(reviews)
  //   }
  // }, [reviews]);

  const close = useCallback(() => {
    dispatch(setIsModal(false));
    
  }, []);

  const handleProductLike = useCallback(() => {
    handleLike(product).then((updateProduct) => {
      setProduct(updateProduct);
    });
  }, [product, handleLike, setProduct]);

  return (
    <>
      <Box sx={{ transform: "translate(0%,35px)", pb: "50px" }}>
        {isLoading ? (
          <Spinner />
        ) : (
          !errorState && (
            <Product
              {...product}
              productId={productId}
              comment={comment}
              setComment={setComment}
              setProduct={setProduct}
              onProductLike={handleProductLike}
              addToOrder={()=>addToOrder(product,count)}
              setCount={setCount}
              count={count}
            />
          )
        )}
        {!isLoading && errorState && <NotFound />}
      </Box>
      <Modal active={isPopupOpen} close={close}>
        <AddReviewForm setComment={setComment}/>
      </Modal>
    </>
  );
};
