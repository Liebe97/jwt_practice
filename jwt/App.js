import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginStack from './src/Navigation/LoginStack';

const Tab = createBottomTabNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Main" component={LoginStack} options={{headerShown: false}}/>
      </Tab.Navigator>
    </NavigationContainer>

  );
};

export default App;
