import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import Deck from './pages/Deck';
import Card from './pages/Card';

const AppStack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{
                headerShown: false
            }}>
                <AppStack.Screen name="Main" component={Main} />
                <AppStack.Screen name="Deck" component={Deck} />
                <AppStack.Screen name="Card" component={Card} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}