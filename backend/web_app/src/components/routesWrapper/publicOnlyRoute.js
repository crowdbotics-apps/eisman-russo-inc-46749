import React from "react"
import { userHasValidToken } from "../../api/auth"

const PublicOnlyRoute = ({ Page }) => {
  const hasValidToken = userHasValidToken();
  return !hasValidToken ? <Page /> : <></>
}
export default PublicOnlyRoute
