import { Close } from "@mui/icons-material";
import { Box, IconButton, ListItem, Typography } from "@mui/material";

const BasketItem = (props) => {
  const { removeFromOrder, name, price, _id, quantity, discount } = props;
  const finishPrice = Math.ceil((price / 100) * (100 - discount));
  return (
    <ListItem sx={{ display: "flex" }}>
      <Box
        sx={{
          flex: "1 1 auto",
          display:'flex',
          gap:'8px',
          alignItems:'center'
        }}
      >
      <Box sx={{flex:'1 1 auto',display:'flex',gap:'8px'}}>
      <Typography sx={{fontWeight:'600'}} variant="body1">{name} -</Typography>
      <Typography variant="body1">{finishPrice < 1 ? 1 : finishPrice}руб</Typography>
      </Box>
      
      <Typography sx={{color:'red',mr:'10px'}} variant="body2">x{quantity}</Typography>
      </Box>
      <IconButton onClick={() => removeFromOrder(_id)}>
        <Close />
      </IconButton>
    </ListItem>
  );
};

export default BasketItem;
