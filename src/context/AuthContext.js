import { AsyncStorage } from "react-native"
import createDataContext from "./createDataContext"
import trackerApi from "../api/tracker"
import { navigate } from "../navigationRef"

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload }
    case "signup":
      return { ...state, token: action.payload, errorMessage: "" }
    default:
      return state
  }
}

const signup = dispatch => async ({ email, password }) => {
  try {
    const response = await trackerApi.post("signup", { email, password })
    await AsyncStorage.setItem("token", response.data.token)
    dispatch({ type: "signup", payload: response.data.token })
    navigate("TrackList")
  } catch (err) {
    console.log(err.message)
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up"
    })
  }
}

const signin = dispatch => {
  return ({ email, password }) => {
    // Try to signin
    // Handle success bu uadating state
    // Handle failure by showing error message (somehow)
  }
}

const signout = dispatch => {
  return () => {
    // somehow sign out
  }
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup },
  { token: null, errorMessage: "" }
)
