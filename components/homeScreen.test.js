import React from 'react'
import { create, act } from 'react-test-renderer'
import { Constants } from '../appUtils/constants';
import HomeScreen from './homeScreen'

const navigation = {
    navigate: jest.fn()
}

const tree = create(<HomeScreen navigation={navigation} />);

test('snapshot', () => {
    expect(tree).toMatchInlineSnapshot();
})

test('Get quote button pressed', () => {
    // Button pressed
    const button = tree.root.findByProps({testID: 'getQuoteButton'}).props
    act(() => button.onPress())

    const firstName = tree.root.findByProps({testID: 'firstName'}).props
    const lastName = tree.root.findByProps({testID: 'lastName'}).props
    const fromCountry = tree.root.findByProps({testID: 'fromCountry'}).props
    const toCountry = tree.root.findByProps({testID: 'toCountry'}).props
    const amount = tree.root.findByProps({testID: 'amount'}).props
    
    expect(firstName.children).not('')
    expect(lastName.children).not('')
    expect(fromCountry.children).not('')
    expect(toCountry.children).not('')
    expect(amount.children).not('')
})

test('Navigate to quote details screen', () => {
    const button = tree.root.findByProps({testID: 'getQuote'}).props
    button.onPress()

    expect(navigation.navigate).toBeCalledWith(Constants.nav_quote_details_screen)
})
