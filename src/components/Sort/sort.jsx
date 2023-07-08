import cn from "classnames";
import { useLocation } from "react-router-dom";
import "./index.css";
const Sort = ({ currentSort, tabs = [], onChangeSort }) => {
  const handleClick = (e, tab) => {
    e.preventDefault();
    onChangeSort(tab.id);
  };
  const location = useLocation();
  return (
    <>
      {location.pathname === "/dog3"&& (
        <div className="sort content__sort">
          {tabs.map((tab) => (
            <div
              className={cn("sort__link", {
                sort__link_selected: currentSort === tab.id,
              })}
              key={tab.id}
              id={tab.id}
            >
              <a onClick={(e) => handleClick(e, tab)}>{tab.title}</a>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Sort;
