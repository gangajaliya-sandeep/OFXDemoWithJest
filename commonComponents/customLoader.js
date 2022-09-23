import * as React from 'react'
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import colors from '../assets/colors/colors'


const CustomLoader = (props) => {

    return (

        // Main Container View
        <View style={styles.mainContainerView}>
            <ActivityIndicator size="large" color={colors.black} />
        </View>
    )
}

export default CustomLoader

const styles = StyleSheet.create({
    mainContainerView: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        top: (Dimensions.get('window').height / 2) - 50,
        left: (Dimensions.get('window').width / 2) - 50,
        height: 100,
        width: 100,
        backgroundColor: colors.silver,
        borderRadius: 10
    }
})