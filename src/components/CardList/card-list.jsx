import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";
import { SortContext } from "../../context/sortContext";
import Card from "../Card/card";
import { NotFound } from "../NotFound/NotFound";
import "./index.css";
import {
  Box,
  FormControl,
  MenuItem,
  Pagination,
  Select,
  useMediaQuery,
} from "@mui/material";

const CardList = ({ cards,openDialog }) => {
  const navigate = useNavigate();
  const { isLoading,refreshIcon,addToOrder } = useContext(UserContext);
  const { selectedTabId } = useContext(SortContext);

  //т.к. серверной  пагинации нет в api
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Общее количество страниц
  const totalPages = Math.ceil(cards.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const rowsPerPageOptions = [8, 16, 24];

  const handleChangePage = useCallback(
    (event, newPage) => {
      setCurrentPage(newPage);
    },
    [setCurrentPage]
  );

  const handleChangeRowsPerPage = useCallback(
    (event) => {
      setItemsPerPage(parseInt(event.target.value));
      setCurrentPage(1);
    },
    [setCurrentPage, setItemsPerPage]
  );

  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const size = isSmallScreen ? "small" : "medium";

  return (
    <>
      {!cards.length && !isLoading && (
        <NotFound
          buttonText="Назад"
          title="Код 404: Простите по вашему запросу ничего не найдено! Перефразируйте запрос и попробуйте снова! "
          buttonAction={() => refreshIcon()}
        />
      )}
      <div className="cards">
        {cards
          .sort((a, b) => {
            switch (selectedTabId) {
              case "cheap":
                return a.price - a.discount - (b.price - b.discount);
              case "low":
                return b.price - b.discount - (a.price - a.discount);
              case "sale":
                return b.discount - a.discount;
            }
          })
          .slice(startIndex, endIndex)
          .map((item, index) => (
            <Card key={item._id} openDialog={openDialog} addToOrder={()=>addToOrder(item)} {...item} />
          ))}
      </div>
      <Box
        sx={
          !cards.length && !isLoading
            ? { display: "none" }
            : {
                display: "flex",
                alignItems: "center",
                mt: "20px",
                justifyContent: "center",
              }
        }
      >
        <Pagination
          count={totalPages}
          variant="outlined"
          size={size}
          page={currentPage}
          onChange={handleChangePage}
        />
        <FormControl sx={{ transform: "scale(0.8)", minWidth: "70px" }}>
          <Select value={itemsPerPage} onChange={handleChangeRowsPerPage}>
            {rowsPerPageOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default CardList;
