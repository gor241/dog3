import { useContext, useEffect, useState } from "react";
import CardList from "../../components/CardList/card-list";
import Sort from "../../components/Sort/sort";
import { CardContext } from "../../context/cardContext";
import { SortContext } from "../../context/sortContext";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import api from "../../utils/api";
import dog from "./dog.webp";

const tabs = [
  {
    id: "cheap",
    title: "Сначала дешёвые",
  },
  {
    id: "low",
    title: "Сначала дорогие",
  },
  {
    id: "sale",
    title: "По скидке",
  },
];

export const CatalogPage = () => {
  const { cards } = useContext(CardContext);
  const { selectedTabId, setSelectedTabId } = useContext(SortContext);
  const [dialog, setDialog] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [comment, setComment] = useState([]);

  const close = () => {
    setDialog(false);
    setCommentId("");
  };

  const openDialog = (id) => {
    setDialog(true);
    setCommentId(id);
  };

  useEffect(() => {
    if (commentId) {
      api
        .getReview(commentId)
        .then((productComents) => {
          setComment(productComents);
        })
        .catch((err) => console.log(err));
    }
  }, [commentId]);

  return (
    <>
      <Sort
        tabs={tabs}
        currentSort={selectedTabId}
        onChangeSort={(tabid) => {
          setSelectedTabId(tabid);
        }}
      />
      <div className="content__cards">
        <CardList cards={cards} openDialog={openDialog} />
      </div>
      <Dialog
        open={dialog}
        onClose={close}
        PaperProps={{
          sx: { background: `white url(${dog}) center/cover no-repeat` },
        }}
      >
        <DialogTitle>Отзывы к товару</DialogTitle>
        <DialogContent>
          {comment.length > 0 ? (
            comment.map((item) => (
              <Box
                key={item._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  pb: "10px",
                  pt: "10px",
                  alignItems: "center",
                }}
              >
                <Box title="О пользователе">
                  <Avatar
                    aria-label="comment author"
                    className={item._id}
                    sx={{
                      boxShadow: "0px 0px 3px 3px rgba(34, 60, 80, 0.5)",
                      width: "30px",
                      height: "30px",
                    }}
                  >
                    <img
                      src={item.author.avatar}
                      alt="post author"
                      style={{ width: "30px", height: "30px" }}
                    />
                  </Avatar>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    flex: "1 1 auto",
                    flexWrap: "wrap",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flex: "1 1 100%",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <Typography variant="subtitle1" component="p">
                      {item.author.name}:
                    </Typography>
                    <Typography variant="subtitle2" component="p"></Typography>
                    <Box>
                      <Rating size="small" value={item.rating} readOnly />
                    </Box>
                  </Box>

                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    component="p"
                    sx={{ flex: "1 1 auto" }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Box>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                component="p"
                sx={{ flex: "1 1 auto" }}
              >
                Отзывов нет
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Отмена</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
