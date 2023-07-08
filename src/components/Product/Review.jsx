import { Rating } from "@mui/material";
import { Box } from "@mui/system";
import { FirstRow } from "./review/FirstRow";
import { useCallback, useContext } from "react";
import { UserContext } from "../../context/userContext";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { delReview } from "../../reduxToolkit/Slices/reviewstoolkitSlice";

export function Review({
  rating,
  text,
  authorName,
  updated_at,
  authorId,
  idReview,
}) {
  const { currentUser } = useContext(UserContext);
  const { productId } = useParams();

  const dispatch = useDispatch();

  const clickDelReview = useCallback(() => {
    dispatch( delReview({ productId, idReview: idReview }));
  }, [authorId, productId, currentUser, idReview]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "0 16px",
        borderTop: "1px solid #ECEFF1",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <FirstRow authorName={authorName} updated_at={updated_at} />
        {currentUser._id === authorId && (
          <Box title="Удалить отзыв" onClick={clickDelReview}>
            <CloseIcon
              sx={{
                cursor: "pointer",
                "&:hover": {
                  filter: "drop-shadow(0px 0px 9px rgb(0, 0, 0))",
                },
                "&:active": {
                  filter: "drop-shadow(0px 0px 9px rgb(249, 74, 74))",
                },
              }}
            />
          </Box>
        )}
      </Box>
      <Rating name="size-large" value={rating} readOnly size="large" />
      <Box sx={{ pt: "10px" }}>{text}</Box>
    </Box>
  );
}
