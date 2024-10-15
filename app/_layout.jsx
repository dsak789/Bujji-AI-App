import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const RootLayout = () => {
  return (
    <View style={styles.rootContainer}>
      <StatusBar 
      barStyle='light-content'
      backgroundColor='black'
      hidden={false} />
      <Stack>
        <Stack.Screen name='index' 
        options={{
          headerShown:false
        }} />
      </Stack>
    </View>
  )
}

export default RootLayout

const styles = StyleSheet.create({
  rootContainer:{
    flex:1,
    marginTop:50,
  }
})