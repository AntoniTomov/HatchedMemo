import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: undefined;
  AuthCallback: undefined;
  Home: undefined;
  AddBirthday: undefined;
  EditBirthday: { id: string };
  Profile: undefined;
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
} 