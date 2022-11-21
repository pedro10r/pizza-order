import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans';
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';
import { ThemeProvider } from 'styled-components/native';

import theme from './src/theme';

import { AuthProvider } from './src/hooks/auth';

import { Product } from '@screens/Product';

export default function App() {

  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular,
  });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <AuthProvider>
        {fontsLoaded && <Product />}
      </AuthProvider>
    </ThemeProvider>
  );
}
