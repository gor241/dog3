import { CatalogPage } from "../CatalogPage/catalog-page";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

import { BoxPage } from "../BoxPage/BoxPage";

export function IndexPage() {
  const { token } = useContext(UserContext);

  if (token) {
    return <CatalogPage />;
  }

  return <BoxPage />;
}
