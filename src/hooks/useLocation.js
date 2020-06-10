import { useEffect, useState } from "react"
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync
} from "expo-location"

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null)
  const [subscriber, setSubscriber] = useState(null)

  useEffect(() => {
    if (shouldTrack) {
      startWatching()
    } else {
      subscriber.remove()
      setSubscriber(null)
    }

    return () => {
      if (subscriber) {
        subscriber.remove()
      }
    }
  }, [shouldTrack, callback])

  async function startWatching() {
    try {
      await requestPermissionsAsync()
      const sub = await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10
        },
        callback
      )
      setSubscriber(sub)
    } catch (e) {
      setErr(e)
    }
  }

  return [err]
}
