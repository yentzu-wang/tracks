import React, { useEffect, useContext } from "react"
import { Context as AuthContext } from "../context/AuthContext"

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext)

  useEffect(() => {
    tryLocalSignin()
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <></>
}
export default ResolveAuthScreen
