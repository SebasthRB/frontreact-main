import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider } from '@apollo/client';
import client from './src/services/apolloClient';
import LoginScreen from './src/screens/LoginScreen';
import CrearCuentaScreen from './src/screens/CrearCuentaScreen';
import MainScreen from './src/screens/MainScreen';
import MenuScreen from './src/screens/MenuScreen';
import ReservaScreen from './src/screens/ReservaScreen'; 

type RootStackParamList = {
  Login: undefined;
  CrearCuenta: undefined;
  Main: undefined;
  MenuScreen: undefined;
  ReservaScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CrearCuenta" component={CrearCuentaScreen} options={{ headerShown: true }} />
          <Stack.Screen name="MenuScreen" component={MenuScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ReservaScreen" component={ReservaScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
