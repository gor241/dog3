import { Box, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useCallback, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getErrorMessage,
  removeErrorMessage,
  getReviews,
} from "../../reduxToolkit/Slices/reviewstoolkitSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Review } from "./Review";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function Reviews() {
  const { productId } = useParams();

  const navigate = useNavigate();

  const errorMessage = useSelector(getErrorMessage);
  const reviews = useSelector(getReviews);

  const dispatch = useDispatch();

  const open = useCallback(() => {
    navigate(`/dog3/add-review/${productId}`);
  }, []);

  const closeErrorSnackbar = useCallback(() => {
    dispatch(removeErrorMessage());
  }, []);

  return (
    <>
      <Box>
        <Button
          sx={{
            width: "172px",
            height: "40px",
            boxSizing: "border-box",
            border: "1px solid #CFD8DC",
            borderRadius: "87px",
            fontFamily: "Nunito",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: "20px",
            color: "#1A1A1A",
            mb: "20px",
          }}
          onClick={open}
        >
          Написать отзыв
        </Button>

        {reviews?.map((review) => (
          <Review
          idReview={review._id}
            key={review._id}
            rating={review.rating}
            text={review.text}
            updated_at={review.updated_at}
            authorName={review.author.name}
            authorId={review.author._id}
          />
        ))}
        <Snackbar
          open={!!errorMessage}
          autoHideDuration={6000}
          onClose={closeErrorSnackbar}
        >
          <Alert
            onClose={closeErrorSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}
