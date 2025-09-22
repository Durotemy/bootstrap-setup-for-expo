import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { HomeScreen } from "../../screens";
import { AuthParamList } from "./interface";

const Stack = createNativeStackNavigator<AuthParamList>();

export default function AuthStack() {
  return null;
}
