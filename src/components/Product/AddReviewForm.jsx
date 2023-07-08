import { Button, FormLabel } from "@mui/material";
import { Box } from "@mui/system";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsModal,
  getReviews,
  getText,
  setIsText,
  getRating,
  setIsRating,
  setAddReview,
} from "../../reduxToolkit/Slices/reviewstoolkitSlice";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FormRow = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "40px",
  justifyContent: "space-between",
  width: "100%",
});

const FormRowTitle = styled(FormLabel)({
  minWidth: "160px",
});

export function AddReviewForm({setComment}) {
  const text = useSelector(getText);
  const rating = useSelector(getRating);
  const rewies = useSelector(getReviews);
  const navigate = useNavigate();

  const { productId } = useParams();

  const dispatch = useDispatch();

  const onTextChange = useCallback((event) => {
    const newText = event.target.value;
    dispatch(setIsText(newText));
  }, []);

  const onRatingChange = useCallback((event) => {
    const newRating = Number(event.target.value);
    dispatch(setIsRating(newRating));
  }, []);

  const onButtonClick = useCallback(() => {
    dispatch(setAddReview(productId, text, rating));
    dispatch(setIsText(""));
    dispatch(setIsRating(2));
    navigate(`/dog3/product/${productId}`);
  }, []);

  // const propsOnSubmit = 42
  // const onInput = ''

  // const obj = { onSubmit: propsOnSubmit, onInput: onInput }
  // // return obj
  // return { onSubmit: propsOnSubmit, onInput: onInput }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minWidth: "340px" }}>
      <h1>Отзыв о товаре</h1>

      <FormRow>
        <FormRowTitle>Общая оценка</FormRowTitle>
        <Rating
          name="size-large"
          value={rating}
          size="large"
          onChange={onRatingChange}
        />
      </FormRow>
      <FormRow>
        <FormRowTitle>Комментарии</FormRowTitle>
        <TextField
          value={text}
          onChange={onTextChange}
          sx={{ width: "100%" }}
          multiline
          placeholder="Поделитесь впечатлениями о товаре"
          rows={4}
        />
      </FormRow>
      <Button onClick={onButtonClick}>Отправить отзыв</Button>
    </Box>
  );
}
