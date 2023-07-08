import cn from "classnames";
import { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";
import { calcDiscountPrice, isLiked } from "../../utils/product";
import ContentLoader from "react-content-loader";
import "./index.css";
import { ReactComponent as Save } from "./save.svg";
import { ReactComponent as Comment } from "./comment-regular.svg";
import { Box, IconButton, Typography} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSelector } from "react-redux";
import { getReviews } from "../../reduxToolkit/Slices/reviewstoolkitSlice";


const Card = ({
  name,
  price,
  _id,
  likes,
  discount,
  wight,
  description,
  pictures,
  tags,
  reviews,
  addToOrder,
  openDialog
}) => {
  const { currentUser, isLoading } = useContext(UserContext);
  const { handleLike: onProductLike } = useContext(CardContext);
  const discount_price = calcDiscountPrice(price, discount);
  const liked = isLiked(likes, currentUser?._id);
  const handleLikeClick = useCallback(() => {
    onProductLike({ _id, likes });
  }, [onProductLike]);
  const review = useSelector(getReviews);

  return (
    <>
      {isLoading ? (
        <ContentLoader
          speed={1}
          width={300}
          height={250}
          viewBox="0 0 300 250"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <path d="M 0 0 h 279.2 v 125 H 0 z M 0 137 h 280 v 8.5 H 0 z M 0 152 h 280 v 26 H 0 z M 0 192 h 280 v 11 H 0 z" />
          <rect x="0" y="210" rx="20" ry="20" width="280" height="40" />
        </ContentLoader>
      ) : (
        <div className="card">
          <Link to={`/dog3/product/${_id}`} className="card__link">
            <div className="card__sticky card__sticky_type_top-left">
              {discount !== 0 && (
                <span className="card__discount">{`-${discount}%`}</span>
              )}
              {tags &&
                tags.map((tag) => (
                  <span
                    key={tag}
                    className={cn("tag", { [`tag_type_${tag}`]: true })}
                  >
                    {tag}
                  </span>
                ))}
            </div>
            <img src={pictures} alt={''} className="card__image" />
            <div className="card__desc">
              <span
                className={discount !== 0 ? "card__old-price" : "card__price"}
              >
                {price}&nbsp;₽
              </span>
              {discount !== 0 && (
                <span className="card__price card__price_type_discount">
                  {discount_price}&nbsp;₽
                </span>
              )}
              <span className="card__wight">{wight}</span>
              <p className="card__name">{name}</p>
            </div>
          </Link>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width:'100%',
              padding:'0px 5px',
              gap:'10px'
            }}
          >
          <div className="card__cart ">
          <button onClick={addToOrder} className=" btn btn_type_primary">
              В корзину
            </button>
          </div>
            <Box sx={{position:'relative',top:'3px'}}>
              <IconButton
                aria-label="Добавить в избранное"
                onClick={handleLikeClick}
                className={`favorite ${liked ? 'favoriteActive' : ''}`}
              >
                <FavoriteBorderIcon />
              </IconButton>
              <Typography
                variant="body2"
                color="textSecondary"
                component="span"
              >
                {likes.length}
              </Typography>
            </Box>
            <Box
              className="card__comments"
              onClick={()=>openDialog(_id)}
            >
              <Comment />
              {reviews.length !== 0 && (
                <span className="card__badge">{reviews.length}</span>
              )}
            </Box>
          </Box>
        </div>
      )}
    </>
  );
};

export default Card;
