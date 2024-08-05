import { persistor, store } from "./redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import React, { useContext, useEffect } from "react"
import { Provider } from "react-redux"
import "react-native-gesture-handler"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { Provider as PaperProvider } from "react-native-paper"
import Toaster from "react-native-toast-message"

import { screens } from "@screens"
import { modules, reducers, hooks } from "@modules"
import {
  OptionsContext,
  getOptions,
  getGlobalOptions
} from "@options"
import { StackNames } from "./utils/constants"
import { RootStackScreen } from "./navigation/rootNavigation"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { isMountedRef, navigationRef } from "./utils/NavigationUtils"
import { AuthStackScreen } from "./navigation/authNavigation"
import { AppStackScreen } from "./navigation/appNavigation"
import { toastConfig } from "./components/core/toast/ToastConfig"

const Stack = createStackNavigator()

const getNavigation = modules => {
  const globalOptions = getGlobalOptions();

  const initialRoute =
    globalOptions.initialRoute || (modules[0] && modules[0].value.title);

  const Navigation = () => {
    const routes = modules.map(mod => {
      const pakage = mod.package;
      const name = mod.value.title;
      const Navigator = mod.value.navigator;
      const Component = props => {
        return (
          <OptionsContext.Provider value={getOptions(pakage)}>
            <Navigator {...props} />
          </OptionsContext.Provider>
        );
      };
      return <Stack.Screen key={name} name={name} component={Component} />;
    });

    const { screenOptions } = globalOptions;

    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={screenOptions}
          ref={navigationRef}
        >
          <Stack.Screen
            name={StackNames.RootStack}
            component={RootStackScreen}
          />
          <Stack.Screen
            name={StackNames.AuthStack}
            component={AuthStackScreen}
          />
          <Stack.Screen name={StackNames.AppStack} component={AppStackScreen} />
          {routes}
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  return Navigation;
};

const App = () => {
  const Navigation = getNavigation(modules.concat(screens));
  let effects = {};
  hooks.map(hook => {
    effects[hook.name] = hook.value();
  });

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            <Navigation />
            <Toaster config={toastConfig} visibilityTime={4000} />
          </PaperProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
