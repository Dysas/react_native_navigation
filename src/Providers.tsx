import React from 'react';
import { Text, View } from 'react-native';
import AuthProvider from './AuthProvider';
import Routes from './Routes';

interface ProvidersProps {}

export const Providers: React.FC<ProvidersProps> = ({}) => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default Providers;
