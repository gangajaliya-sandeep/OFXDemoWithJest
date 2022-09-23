import React, { useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList, TextInput, BackHandler } from 'react-native'
import { showErrorToastMessage } from '../appUtils/commonUtils'
import colors from '../assets/colors/colors'

const CountryPickerScreen = (props) => {

    var countryList = props.countryList
    var screenType = props.screenType

    const selectCountry = (country) => {
        props.countrySelected(country)
        props.setOpenCountryPicker(false)
    }

    const closePopup = () => {
        props.setOpenCountryPicker(false)
    }

    return (
        <View style={styles.mainContainer} >

            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={() => closePopup()} activeOpacity={0.5} >

                {/* Close Icon */}
                <Image style={{ height: 25, width: 25 }} source={require('../assets/images/close_icon.png')} ></Image>
            </TouchableOpacity>

            {/* FlatList */}
            <FlatList style={{ flex: 1 }}
                data={countryList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <CountryPickerItem item={item} selectCountry={selectCountry} screenType={screenType} />}
            />
            {/* 
            <TouchableOpacity style={{ marginTop: 24, marginBottom: 30, height: 40, width: 180, borderRadius: 20, backgroundColor: colors.button_bg, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 14, color: colors.white, fontWeight: '600' }}>SELECT COUNTRY</Text>
            </TouchableOpacity> */}

        </View >
    )
}

const CountryPickerItem = (props) => {

    var country = props.item

    return (
        <TouchableOpacity style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => props.selectCountry(country)}>

            {props.screenType == 'CountryCode' ?
                <Text style={{ marginLeft: 20, fontSize: 15, fontWeight: '600' }}>{country.numberCode} - {country.name}</Text>
                :
                <Text style={{ marginLeft: 20, fontSize: 15, fontWeight: '600' }}>{country.name} ({country.currency})</Text>
            }

        </TouchableOpacity>
    )
}

export default CountryPickerScreen

const styles = StyleSheet.create({

    mainContainer: {
        height: 300,
        backgroundColor: colors.white,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
    },
    closeButton: {
        height: 60,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
})