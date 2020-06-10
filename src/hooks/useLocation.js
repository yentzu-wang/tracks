import { useEffect, useState } from "react"
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync
} from "expo-location"

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null)

  useEffect(() => {
    let subscriber
    async function startWatching() {
      try {
        await requestPermissionsAsync()
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10
          },
          callback
        )
      } catch (e) {
        setErr(e)
      }
    }

    if (shouldTrack) {
      startWatching()
    } else if (subscriber) {
      subscriber.remove()
      subscriber = null
    }

    return () => {
      if (subscriber) {
        subscriber.remove()
      }
    }
  }, [shouldTrack, callback])

  return [err]
}
