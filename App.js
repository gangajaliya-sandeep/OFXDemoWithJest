import React from 'react'
import { RootNavigation } from './appUtils/rootNavigation'
import KeyboardManager from 'react-native-keyboard-manager'

const App = () => {

  if (Platform.OS === 'ios') {
    KeyboardManager.setEnable(true)
    KeyboardManager.setEnableDebugging(false)
    KeyboardManager.setKeyboardDistanceFromTextField(10)
    KeyboardManager.setEnableAutoToolbar(true)
    KeyboardManager.setToolbarDoneBarButtonItemText("Done")
    KeyboardManager.setToolbarManageBehaviourBy("subviews")
    KeyboardManager.setToolbarPreviousNextButtonEnable(false)
    KeyboardManager.setToolbarTintColor('#0000FF')
    KeyboardManager.setToolbarBarTintColor('#FFFFFF')
    KeyboardManager.setShouldShowToolbarPlaceholder(true)
    KeyboardManager.setOverrideKeyboardAppearance(false)
    KeyboardManager.setKeyboardAppearance("default")
    KeyboardManager.setShouldResignOnTouchOutside(true)
    KeyboardManager.setShouldPlayInputClicks(true)
    KeyboardManager.resignFirstResponder()
    KeyboardManager.isKeyboardShowing()
      .then((isShowing) => {
      })
  }

  return (
    <RootNavigation />
  )
}
export default App