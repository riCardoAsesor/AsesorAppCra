import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import AuthScreen from './src/screens/AuthScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import PasswordResetScreen from './src/screens/PasswordResetScreen';
import HomeScreen from './src/screens/HomeScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import QuestionnaireScreen from './src/screens/QuestionnaireScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import LoaderScreen from './src/screens/LoaderScreen';
import AdvancedFormScreen from './src/screens/AdvancedFormScreen';

export type RootStackParamList = {
  Loader: undefined;
  Auth: undefined;
  Register: undefined;
  PasswordReset: undefined;
  Home: undefined;
  Welcome: undefined;
  Questionnaire: { option: string };
  Results: { recomendacion: any };
  AdvancedForm: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loader" id={undefined}>
        <Stack.Screen name="Loader" component={LoaderScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Crear Cuenta' }} />
        <Stack.Screen name="PasswordReset" component={PasswordResetScreen} options={{ title: 'Restablecer Contraseña' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
        <Stack.Screen name="AdvancedForm" component={AdvancedFormScreen} options={{ title: 'Formulario Avanzado' }} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
