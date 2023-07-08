import { useContext } from "react";
import { CardContext } from "../../context/cardContext";
import "./index.css";
import { useLocation } from "react-router-dom";

const SeachInfo = ({searchText}) => {
	const {cards} = useContext(CardContext);
	const searchCount = cards.length;
	const location = useLocation()

	return (
		searchText && location.pathname === "/dog3" &&<section className="search-title">
			По запросу <span>{searchText}</span> найдено {searchCount} товаров
		</section>
	);
};

export default SeachInfo;
