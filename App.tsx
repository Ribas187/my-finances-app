import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import Routes from './src/routes';
import AppProvider from './src/hooks';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

const App: React.FC = () => {
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
