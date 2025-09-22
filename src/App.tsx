import * as React from "react";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { RootStack } from "@navigations";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

const queryClient = new QueryClient();

export default function App() {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const prepareFonts = async () => {
      try {
        await Font.loadAsync({
          Inter_Thin: Inter_100Thin,
          Inter_Extra_light: Inter_200ExtraLight,
          Inter_300_light: Inter_300Light,
          Inter_400_regular: Inter_400Regular,
          Inter_500_Medium: Inter_500Medium,
          Inter_600_semiBold: Inter_600SemiBold,
          Inter_700bold: Inter_700Bold,
          Inter_800ExtraBold: Inter_800ExtraBold,
          Inter_900Black: Inter_900Black,
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.log(error);
      } finally {
        setReady(true);
      }
    };

    prepareFonts();
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider config={config}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
