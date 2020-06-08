import { useEffect, useState } from "react"
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync
} from "expo-location"

export default callback => {
  const [err, setErr] = useState(null)

  useEffect(() => {
    startWatching()

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function startWatching() {
    try {
      await requestPermissionsAsync()
      const subscriber = await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10
        },
        location => callback(location)
      )
    } catch (e) {
      setErr(e)
    }
  }

  return [err]
}
