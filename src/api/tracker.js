import axios from "axios"
import { AsyncStorage } from "react-native"

const instance = axios.create({
  baseURL: "http://f12ad161c1f3.ngrok.io"
})

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem("token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  err => Promise.reject(err)
)

export default instance
