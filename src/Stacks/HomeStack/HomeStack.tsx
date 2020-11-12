import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Text, FlatList, TouchableOpacity, Button } from 'react-native';
import faker from 'faker';
import { HomeParamList, HomeStackNavProps } from './HomeParamList';
import { AuthContext } from '../AuthStack/AuthProvider';
import addProductRoutes from '../../addProductRoutes';
import Center from '../../components/Center';

interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();

function Feed({ navigation }: HomeStackNavProps<'Feed'>) {
  return (
    <Center>
      <FlatList
        style={{ width: '100%' }}
        renderItem={({ item }) => {
          return (
            <Button
              title={item}
              onPress={() => {
                navigation.navigate('Product', {
                  name: item,
                });
              }}
            />
          );
        }}
        keyExtractor={(product, idx) => product + idx}
        data={Array.from(Array(50), () => faker.commerce.product())}
      />
    </Center>
  );
}

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  const { logout } = useContext(AuthContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  logout();
                }}
              >
                <Text>LOGOUT</Text>
              </TouchableOpacity>
            );
          },
        }}
        component={Feed}
      />
      {addProductRoutes(Stack)}
    </Stack.Navigator>
  );
};

export default HomeStack;
