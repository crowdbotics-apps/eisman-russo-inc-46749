import React from "react"
import { userHasValidToken } from "../../api/auth"

const PublicOnlyRoute = ({ Page }) => {
    console.log("in public only");
  const hasValidToken = userHasValidToken();
  console.log("hasValidToken", hasValidToken);
  return !hasValidToken ? <Page /> : <></>
}
export default PublicOnlyRoute
