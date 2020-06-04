import React from "react"
import { StyleSheet, View } from "react-native"
import AuthForm from "../components/AuthForm"
import NavLink from "../components/NavLink"

const SigninScreen = () => {
  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign In to Your Account"
        errorMessage=""
        onSubmit={() => {}}
        submitButtonText="Sign In"
      />
      <NavLink
        routeName="Signup"
        text="Don't have an account? Sign up instead!"
      />
    </View>
  )
}

SigninScreen.navigationOptions = { header: null }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 200
  }
})

export default SigninScreen
