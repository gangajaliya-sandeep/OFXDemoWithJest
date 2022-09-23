import 'react-native-gesture-handler'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Constants } from '../appUtils/constants'

import HomeScreen from '../components/homeScreen'
import QuoteDetailsScreen from '../components/quoteDetailsScreen'

const Stack = createStackNavigator()

export const RootNavigation = (props) => {

    return (

        <NavigationContainer ref={navigationRef} >
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name={Constants.nav_home_screen} component={HomeScreen} />
                <Stack.Screen name={Constants.nav_quote_details_screen} component={QuoteDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export const navigationRef = React.createRef()

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

export function goBack() {
    navigationRef.current?.goBack()
}