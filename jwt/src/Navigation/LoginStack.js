import React from "react";

import { createStackNavigator } from "@react-navigation/stack"
import Main from "../Screen/login/index";

const Stack = createStackNavigator();

const LoginStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Login" component={Main} options={{headerShown: false}} />
		</Stack.Navigator>
	)
}

export default LoginStack