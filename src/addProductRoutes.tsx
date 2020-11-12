import React, { useState, useRef, useEffect } from 'react';
import { StackNavigationState, TypedNavigator } from '@react-navigation/native';
import { TouchableOpacity, Text, Button } from 'react-native';
import { HomeParamList, HomeStackNavProps } from './Stacks/HomeStack/HomeParamList';
import { SearchParamList } from './Stacks/SearchStack/SearchParamList';
import Center from './components/Center';

function Product({ navigation, route }: HomeStackNavProps<'Product'>) {
  return (
    <Center>
      <Text>{route.params.name}</Text>
      <Button
        title="Edit This Product"
        onPress={() =>
          navigation.navigate('EditProduct', {
            name: route.params.name,
          })
        }
      />
    </Center>
  );
}

function apiCall(x: any) {
  console.log(x);
  return x;
}

function EditProduct({ navigation, route }: HomeStackNavProps<'EditProduct'>) {
  const [formState] = useState();
  const submit = useRef(() => {});

  submit.current = () => {
    apiCall(formState);
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setParams({ submit });
  }, []);

  return (
    <Center>
      <Text>Editing{route.params.name}...</Text>
    </Center>
  );
}

export const addProductRoutes = (
  Stack: TypedNavigator<
    HomeParamList | SearchParamList,
    StackNavigationState<Record<string | undefined>>,
    any,
    any,
    any
  >,
) => {
  return (
    <>
      <Stack.Screen
        options={({ route }) => ({
          headerTitle: `Edit: ${route.params.name}`,
          headerRight: () => (
            <TouchableOpacity
              style={{ paddingRight: 8 }}
              onPress={() => {
                route.params.submit?.current();
              }}
            >
              <Text style={{ color: 'blue' }}>Done</Text>
            </TouchableOpacity>
          ),
        })}
        name="EditProduct"
        component={EditProduct}
      />
      <Stack.Screen
        options={({ route }) => ({
          headerTitle: `Product: ${route.params.name}`,
        })}
        name="Product"
        component={Product}
      />
    </>
  );
};

export default addProductRoutes;
