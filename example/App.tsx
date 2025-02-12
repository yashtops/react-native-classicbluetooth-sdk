
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Connection from './src/Connection';
import Device from './src/Device';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{
          title:'Bluetooth Classic'
        }} name="Connection" component={Connection} />
        <Stack.Screen name="Device" component={Device} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;