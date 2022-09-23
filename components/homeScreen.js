import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'
import { showErrorAlert, validateEmail } from '../appUtils/commonUtils'
import { Constants } from '../appUtils/constants'
import * as RootNavigation from '../appUtils/rootNavigation.js'
import colors from '../assets/colors/colors'
import CountryPickerScreen from '../commonComponents/countryPickerScreen'
import CustomLoader from '../commonComponents/customLoader'

const HomeScreen = ({navigation}) => {

    // Object Declaration
    const [countryList, setCountryList] = useState([])
    const [isLoading, setLoading] = useState(false)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [amount, setAmount] = useState('')

    const [selectedTelephone, setSelectedTelephone] = useState(undefined)
    const [isOpenCountryPickerPopup, setOpenCountryPicker] = useState(false)

    const [fromCountry, setFromCountry] = useState(undefined)
    const [isOpenFromCountryPickerPopup, setOpenFromCountryPicker] = useState(false)

    const [toCountry, setToCountry] = useState(undefined)
    const [isOpenToCountryPickerPopup, setOpenToCountryPicker] = useState(false)


    useEffect(() => {
        setCountryList([{ "name": "Australia", "numberCode": "+61", "currency": "AUD" },
        { "name": "United States", "numberCode": "+1", "currency": "USD" },
        { "name": "India", "numberCode": "+91", "currency": "INR" },
        { "name": "New Zealand", "numberCode": "+64", "currency": "NZD" },
        { "name": "The Great Britain", "numberCode": "+44", "currency": "GBP" },])
    }, [])

    // CountryList Popup methods
    const countrySelected = (country) => {
        setSelectedTelephone(country)
    }

    const fromCountrySelected = (country) => {
        setFromCountry(country)
    }

    const toCountrySelected = (country) => {
        setToCountry(country)
    }

    // Get Quote
    const getQuote = () => {
        if (firstName == '') {
            showErrorAlert(Constants.validation_first_name)
        } else if (lastName == '') {
            showErrorAlert(Constants.validation_last_name)
        } else if (email != '' && !validateEmail(email)) {
            showErrorAlert(Constants.validation_valid_email)
        } else if (!fromCountry) {
            showErrorAlert(Constants.validation_from_country)
        } else if (!toCountry) {
            showErrorAlert(Constants.validation_to_country)
        } else if (fromCountry.name == toCountry.name) {
            showErrorAlert(Constants.validation_country_can_not_same)
        } else if (amount == '') {
            showErrorAlert(Constants.validation_amount)
        } else {
            getQuoteFromServer()
        }
    }

    // Webservice Call
    const getQuoteFromServer = () => {
        setLoading(true)
        fetch(Constants.API_Base_URL + Constants.getQuote + fromCountry.currency + '/' + toCountry.currency + '/' + amount + '?format=json')
            .then((response) => response.json())
            .then((json) => parseResponse(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
    }

    const parseResponse = (jsonResponse) => {
        console.log('jsonResponse = ', jsonResponse)
        if (jsonResponse) {
            if (jsonResponse.Errors && jsonResponse.Message) {
                showAlert('Error', jsonResponse.Message)
                return
            }
            navigation.navigate(Constants.nav_quote_details_screen, { quoteDetails: jsonResponse, fromCountry: fromCountry, toCountry: toCountry, amount: amount })
            // RootNavigation.navigate(Constants.nav_quote_details_screen, { quoteDetails: jsonResponse, fromCountry: fromCountry, toCountry: toCountry, amount: amount })
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>

            {/* Scroll View */}
            <ScrollView style={{ flex: 1 }}>

                {/* First Name & Last Name Container View */}
                <View style={styles.fistNameLastNameContainer}>

                    {/* First Name */}
                    <View style={{ flex: 0.5 }}>
                        <View style={{ marginRight: 6 }}>

                            {/* First Name Title */}
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14 }}>First Name </Text>
                                <Text style={{ fontSize: 14, color: colors.red }}>*</Text>
                            </View>

                            {/* First Name Input */}
                            <TextInput
                                style={styles.textInput}
                                placeholder='First Name'
                                onChangeText={text => setFirstName(text)}
                                autoCorrect={false}
                                editable={true}
                                testID="firstName"
                            />
                        </View>
                    </View>

                    {/* Last Name */}
                    <View style={{ flex: 0.5 }}>
                        <View style={{ marginLeft: 6 }}>

                            {/* Last Name Title */}
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14 }}>Last Name </Text>
                                <Text style={{ fontSize: 14, color: colors.red }}>*</Text>
                            </View>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Last Name'
                                onChangeText={text => setLastName(text)}
                                autoCorrect={false}
                                editable={true}
                                testID="lastName"
                            />
                        </View>
                    </View>
                </View>

                {/* Email */}
                <Text style={styles.emailTitle}>Email</Text>
                <TextInput
                    style={[styles.textInput, { marginLeft: 10, marginRight: 10 }]}
                    placeholder='Email'
                    onChangeText={text => setEmail(text)}
                    autoCorrect={false}
                    editable={true}
                    keyboardType={'email-address'}
                />

                {/* Telephone Title */}
                <Text style={styles.emailTitle}>Telephone / Mobile</Text>

                {/* Telephone Selection Container */}
                <View style={styles.telephoneContainer}>

                    {/* Telephone Button */}
                    <TouchableOpacity style={styles.telephoneButton}
                        onPress={() => setOpenCountryPicker(!isOpenCountryPickerPopup)}
                        testID="getQuoteButton"
                        >

                        <Text style={{ marginLeft: 10, fontSize: 14 }}>{selectedTelephone ? selectedTelephone.numberCode : '+61'}</Text>
                        <Image style={styles.dropDownImage} source={require('../assets/images/down_arrow.png')} />

                    </TouchableOpacity>

                    {/* Separator */}
                    <Image style={{ width: 1, backgroundColor: colors.text_input_border }} />

                    {/* Telephone Text Input */}
                    <TextInput
                        style={{ flex: 1, paddingHorizontal: 10 }}
                        placeholder='Telephone / Mobile'
                        autoCorrect={false}
                        editable={true}
                        keyboardType={'number-pad'}
                    />
                </View>

                {/* From Country & To Country Container */}
                <View style={styles.fromCountryToCountryContainer}>
                    <View style={{ marginTop: 10, marginLeft: 10, marginRight: 10, flexDirection: 'row' }}>

                        {/* From Country Container */}
                        <View style={{ flex: 0.5 }}>
                            <View style={{ marginRight: 6 }}>

                                {/* From Country Title */}
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 14 }}>From Country </Text>
                                    <Text style={{ fontSize: 14, color: colors.red }}>*</Text>
                                </View>

                                {/* From Country Button */}
                                <TouchableOpacity style={[styles.fromCountryButton, styles.defaultBorder]} onPress={() => setOpenFromCountryPicker(true)} >
                                    <Text style={{ marginLeft: 10, fontSize: 14 }}
                                    testID="fromCountry"
                                    >
                                        {fromCountry && fromCountry.currency}
                                    </Text>
                                    <Image style={styles.dropDownImage} source={require('../assets/images/down_arrow.png')} />
                                </TouchableOpacity>

                            </View>
                        </View>

                        {/* To Country Container */}
                        <View style={{ flex: 0.5 }}>
                            <View style={{ marginLeft: 6 }}>

                                {/* To Country Title */}
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 14 }}>To Country </Text>
                                    <Text style={{ fontSize: 14, color: colors.red }}>*</Text>
                                </View>

                                {/* To Country Button */}
                                <TouchableOpacity style={[styles.fromCountryButton, styles.defaultBorder]} onPress={() => setOpenToCountryPicker(true)}>
                                    <Text style={{ marginLeft: 10, fontSize: 14 }}
                                        testID="toCountry"
                                    >
                                        {toCountry && toCountry.currency}
                                    </Text>
                                    <Image style={styles.dropDownImage} source={require('../assets/images/down_arrow.png')} />
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>

                    {/* Amount Container */}
                    <View style={styles.amountContainer}>

                        <View style={{ flex: 0.5 }}>

                            <View style={{ marginRight: 6 }}>
                                {/* Amount Title */}
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 14 }}>Amount </Text>
                                    <Text style={{ fontSize: 14, color: colors.red }}>*</Text>
                                </View>

                                {/* Amount TextInput */}
                                <TextInput
                                    style={[styles.textInput]}
                                    placeholder='Amount'
                                    onChangeText={text => setAmount(text)}
                                    autoCorrect={false}
                                    editable={true}
                                    keyboardType={'number-pad'}
                                    testID="amount"
                                />
                            </View>
                        </View>
                    </View>

                    {/* Get Quote Button */}
                    <TouchableOpacity style={styles.getQuoteButton} onPress={() => getQuote()} >
                        <Text style={styles.getQuoteTitle}>GET QUOTE</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>

            {/* Country Picker Popup */}
            {isOpenCountryPickerPopup &&
                <Modal isVisible={isOpenCountryPickerPopup}
                    coverScreen={false}
                    testID={'modal'}
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                >
                    <CountryPickerScreen countryList={countryList} countrySelected={countrySelected} setOpenCountryPicker={setOpenCountryPicker} screenType={'CountryCode'} />
                </Modal>
            }

            {/* From Country Picker Popup */}
            {isOpenFromCountryPickerPopup &&
                <Modal isVisible={isOpenFromCountryPickerPopup}
                    coverScreen={false}
                    testID={'modal'}
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                >
                    <CountryPickerScreen countryList={countryList} countrySelected={fromCountrySelected} setOpenCountryPicker={setOpenFromCountryPicker} screenType={'FromCountryCode'} />
                </Modal>
            }

            {/* From Country Picker Popup */}
            {isOpenToCountryPickerPopup &&
                <Modal isVisible={isOpenToCountryPickerPopup}
                    coverScreen={false}
                    testID={'modal'}
                    style={{ justifyContent: 'flex-end', margin: 0 }}
                >
                    <CountryPickerScreen countryList={countryList} countrySelected={toCountrySelected} setOpenCountryPicker={setOpenToCountryPicker} screenType={'ToCountryCode'} />
                </Modal>
            }
            {/* Loader */}
            {isLoading && <CustomLoader />}
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.white
    },
    fistNameLastNameContainer: {
        marginTop: 24, marginLeft: 10, marginRight: 10, flexDirection: 'row'
    },
    textInput: {
        marginTop: 8,
        height: 44,
        flex: 1,
        paddingHorizontal: 10,
        fontSize: 14,
        color: colors.black,
        borderRadius: 4,
        borderColor: colors.text_input_border,
        borderWidth: 1
    },
    emailTitle: {
        marginTop: 20, marginLeft: 10, fontSize: 14
    },
    telephoneContainer: {
        marginTop: 8,
        marginLeft: 10,
        marginRight: 10,
        height: 44,
        fontSize: 14,
        color: colors.black,
        borderRadius: 4,
        borderColor: colors.text_input_border,
        borderWidth: 1,
        flexDirection: 'row'
    },
    telephoneButton: {
        width: 70,
        backgroundColor: colors.light_gray_bg,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    fromCountryToCountryContainer: {
        marginTop: 10,
        backgroundColor: colors.light_gray_bg
    },
    fromCountryButton: {
        marginTop: 8,
        height: 44,
        backgroundColor: colors.light_gray_bg,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    amountContainer: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row'
    },
    getQuoteButton: {
        marginTop: 24,
        marginBottom: 20,
        height: 40,
        width: 180,
        borderRadius: 20,
        backgroundColor: colors.button_bg,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    getQuoteTitle: {
        fontSize: 14,
        color: colors.white,
        fontWeight: '600'
    },
    defaultBorder: {
        borderRadius: 4,
        borderColor: colors.text_input_border,
        borderWidth: 1
    },
    dropDownImage: {
        marginRight: 10,
        width: 14,
        height: 14,
        resizeMode: "contain"
    }
})