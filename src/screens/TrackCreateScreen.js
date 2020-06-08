import "../_mockLocation"
import React, { useEffect, useState, useContext } from "react"
import { StyleSheet } from "react-native"
import { Text } from "react-native-elements"
import { SafeAreaView } from "react-navigation"
import {
  requestPermissionsAsync,
  watchPositionAsync,
  Accuracy
} from "expo-location"
import Map from "../components/Map"
import { Context as LocationContext } from "../context/LocationContext"

const TrackCreateScreen = () => {
  const { addLocation } = useContext(LocationContext)
  const [err, setErr] = useState(null)

  useEffect(() => {
    startWatching()

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function startWatching() {
    try {
      await requestPermissionsAsync()
      await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10
        },
        location => addLocation(location)
      )
    } catch (e) {
      setErr(e)
    }
  }

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2>Create a Track</Text>
      <Map />
      {err && <Text>Please enable location services</Text>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default TrackCreateScreen
