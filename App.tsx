import React, { useEffect } from 'react';
import { AppLoading } from 'expo';
import * as Updates from 'expo-updates';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  useFonts,
} from '@expo-google-fonts/poppins';
import Routes from './src/routes';
import AppProvider from './src/hooks';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

const App: React.FC = () => {
  useEffect(() => {
    async function updateApp(): Promise<void> {
      const { isAvailable } = await Updates.checkForUpdateAsync();

      if (isAvailable) {
        await Updates.fetchUpdateAsync();

        await Updates.reloadAsync();
      }
    }

    updateApp();
  }, []);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#5636d3" />
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: '#5636d3' }}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
