/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { BirthdayProvider } from './src/contexts/BirthdayContext';
import { AuthProvider } from './src/contexts/AuthContext';

function App(): React.JSX.Element {
  return (
    // <SafeAreaProvider>
    //   <AppNavigator />
    // </SafeAreaProvider>
    <AuthProvider>
    <BirthdayProvider>
    {/* Your main application navigation or components go here */}
    {/* For example, if you have a navigator: */}
    <AppNavigator />
  </BirthdayProvider>
  </AuthProvider>
  );
}

export default App;
