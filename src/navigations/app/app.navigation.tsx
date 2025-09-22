import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { AppParamList } from "./interface";
import { HomeScreen } from "@screens";

const Stack = createNativeStackNavigator<AppParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
