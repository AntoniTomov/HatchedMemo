import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type ProtectedRouteProps = {
  component: React.ComponentType<any>;
};

const ProtectedRoute = ({ component: Component }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  React.useEffect(() => {
    if (!user) {
      navigation.replace('Welcome');
    }
  }, [user, navigation]);

  if (!user) {
    return null;
  }

  return <Component />;
};

export default ProtectedRoute; 