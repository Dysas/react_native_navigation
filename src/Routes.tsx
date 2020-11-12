import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Center from './components/Center';
import { AuthContext } from './Stacks/AuthStack/AuthProvider';
import AuthStack from './Stacks/AuthStack/AuthStack';
import AppTabs from './Tabs/App/AppTabs';

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const { user, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is logged in or not
    AsyncStorage.getItem('user')
      .then((userString) => {
        if (userString) {
          // DECODE IT
          login();
        }
        setLoading(false);
        console.log(userString);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    );
  }

  return <NavigationContainer>{user ? <AppTabs /> : <AuthStack />}</NavigationContainer>;
};

export default Routes;
