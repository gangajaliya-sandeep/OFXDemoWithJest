import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import colors from '../assets/colors/colors'
import * as RootNavigation from '../appUtils/rootNavigation.js'

const QuoteDetailsScreen = (props) => {

    console.log('props.route.params', props.route.params)
    var quoteDetails = props.route.params.quoteDetails
    var fromCountry = props.route.params.fromCountry
    var toCountry = props.route.params.toCountry
    var amount = props.route.params.amount

    return (
        <SafeAreaView style={styles.safeArea}>

            {/* Scroll View */}
            <ScrollView style={styles.scrollView}>

                {/* Details Container View */}
                <View style={styles.detailsContainer}>

                    {/* OFX Customer Rate Title */}
                    <Text style={styles.titleText}>OFX Customer Rate</Text>

                    {/* OFX Rate */}
                    <Text style={styles.ofxRate}>{quoteDetails && quoteDetails.CustomerRate}</Text>

                    {/* From Container */}
                    <View style={styles.fromContainer}>
                        <Text style={styles.titleText}>From</Text>

                        {/* From Rate Container */}
                        <View style={styles.fromRateContainer}>
                            <Text style={styles.currencyCountry}>{fromCountry.currency} </Text>
                            <Text style={styles.currencyText}>{amount}</Text>
                        </View>
                    </View>

                    {/* To Container */}
                    <View style={styles.fromContainer}>
                        <Text style={styles.titleText}>To</Text>

                        {/* To Rate Container */}
                        <View style={styles.fromRateContainer}>
                            <Text style={styles.currencyCountry}>{toCountry.currency} </Text>
                            <Text style={styles.currencyText}>{quoteDetails.CustomerAmount}</Text>
                        </View>
                    </View>

                    {/* Start New Quote Button */}
                    <TouchableOpacity style={styles.newQuoteButton} onPress={() => RootNavigation.goBack()} >

                        <Text style={{ fontSize: 14, color: colors.white, fontWeight: '600' }}>START NEW QUOTE</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default QuoteDetailsScreen

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.light_gray_bg
    },
    scrollView: {
        flex: 1,
    },
    detailsContainer: {
        marginTop: 30,
        alignItems: 'center'
    },
    titleText: {
        fontSize: 18
    },
    ofxRate: {
        marginTop: 12,
        fontSize: 26,
        fontWeight: '600',
        color: colors.rate_font
    },
    fromContainer: {
        marginTop: 12,
        width: 160
    },
    fromRateContainer: {
        marginTop: 8,
        flexDirection: 'row'
    },
    currencyCountry: {
        fontSize: 22
    },
    currencyText: {
        fontSize: 22,
        color: colors.button_bg
    },
    newQuoteButton: {
        marginTop: 40,
        marginBottom: 20,
        height: 40,
        width: 220,
        borderRadius: 20,
        backgroundColor: colors.button_bg,
        alignItems: 'center',
        justifyContent: 'center'
    }
})