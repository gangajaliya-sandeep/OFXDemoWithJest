
import { Alert } from 'react-native'

// This function should show alert.
export const showErrorAlert = (message) => {
    Alert.alert(
        "Alert",
        message,
        [
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
    )
}

// This function should validate the right format of an email.
export const validateEmail = (value) => {
    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value);
}