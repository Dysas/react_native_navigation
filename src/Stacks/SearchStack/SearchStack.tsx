import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Button, FlatList } from 'react-native';
import faker from 'faker';
import Center from '../../components/Center';
import { SearchParamList } from './SearchParamList';
import addProductRoutes from '../../addProductRoutes';

interface SearchStackProps {}

const Stack = createStackNavigator<SearchParamList>();

const Search = ({ navigation }) => {
  const [show, setShow] = useState(false);
  return (
    <Center>
      <Button
        title="Search Products"
        onPress={() => {
          setShow(true);
        }}
      />
      {show ? (
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
      ) : null}
    </Center>
  );
};

export const SearchStack: React.FC<SearchStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
      {addProductRoutes(Stack)}
    </Stack.Navigator>
  );
};

export default SearchStack;
