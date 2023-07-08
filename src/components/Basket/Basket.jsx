import { ShoppingBasket } from "@mui/icons-material";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import BasketItem from "../BasketItem/BasketItem";
import { useWindowWidth } from "@react-hook/window-size";

const Basket = (props) => {
  const {
    cartOpen,
    closeCart = Function.prototype,
    order = [],
    removeFromOrder,
  } = props;

  const windowWidth = useWindowWidth();

  const getWidthStyle = () => {
    if (windowWidth < 600) {
      return { width: "300px" };
    } else {
      return { width: "400px" };
    }
  };

  return (
    <Drawer anchor="right" open={cartOpen} onClose={closeCart}>
      <List sx={getWidthStyle()}>
        <ListItem>
          <ListItemIcon>
            <ShoppingBasket />
          </ListItemIcon>
          <ListItemText primary="Корзина" />
        </ListItem>
        <Divider />
        <>
          {!order.length ? (
            <ListItem>Корзина пуста!</ListItem>
          ) : (
            order.map((item) => (
              <>
                <BasketItem
                  key={item._id}
                  removeFromOrder={removeFromOrder}
                  {...item}
                />
                <Divider />
              </>
            ))
          )}
          <ListItem>
          <Typography sx={{fontWeight:'700'}}>
          Общая стоимость:{" "}
            {order.reduce((acc, item) => {
                const finishPrice = item.price<1?1:item.price
              return acc + finishPrice * item.quantity;
            }, 0)}{" "}
            рублей.
          </Typography>
          </ListItem>
        </>
      </List>
    </Drawer>
  );
};

export default Basket;
