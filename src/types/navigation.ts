import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: undefined;
  AuthCallback: undefined;
  Home: undefined;
  Dashboard: undefined;
  AddBirthday: undefined;
  EditBirthday: { id: string };
  Profile: undefined;
  Settings: undefined;
  ChildDetails: { childId: string; title: string };
  FriendDetails: { id: string };
  FriendChildDetails: { friendId: string; childId: string };
  News: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
} 