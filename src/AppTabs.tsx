import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, EvilIcons, Ionicons } from '@expo/vector-icons';
import { AppParamList } from './AppParamList';
import Center from './Center';
import { AuthContext } from './AuthProvider';

interface AppTabsProps {}

const Tabs = createBottomTabNavigator<AppParamList>();

const Home = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Center>
      <Text>Home</Text>
      <Button title="logout" onPress={() => logout()} />
    </Center>
  );
};

const Search = () => {
  return (
    <Center>
      <Text>Search</Text>
    </Center>
  );
};

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
            return <AntDesign name="home" size={size} color={color} />;
          }
          if (route.name === 'Search') {
            return <EvilIcons name="search" size={size} color={color} />;
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Search" component={Search} />
    </Tabs.Navigator>
  );
};

export default AppTabs;
