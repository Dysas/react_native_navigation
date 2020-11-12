import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Button, Text } from 'react-native';
import { AuthParamList, AuthNavProps } from './AuthParamList';
import { AuthContext } from './AuthProvider';
import { Center } from '../../components/Center';

interface AuthStackProps {}

const Stack = createStackNavigator<AuthParamList>();

const Login = ({ navigation }: AuthNavProps<'Login'>) => {
  const { login } = useContext(AuthContext);
  return (
    <Center>
      <Text>Login Screen</Text>
      <Button title="Login me in" onPress={() => login()} />
      <Button title="Go to register" onPress={() => navigation.navigate('Register')} />
    </Center>
  );
};

const Register = ({ navigation }: AuthNavProps<'Register'>) => {
  return (
    <Center>
      <Text>Register Screen</Text>
      <Button title="Go to login" onPress={() => navigation.navigate('Login')} />
    </Center>
  );
};

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default AuthStack;
