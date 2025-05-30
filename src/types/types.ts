export interface User {
  name: string;
  isOnboarded: boolean;
  avatarUrl?: string;
  hasChildren?: boolean;
  children?: {
    id: string;
    name: string;
    birthDate: string;
    gender: string;
    daysToBirthday?: number;
    notes?: string;
    notificationPreference?: string;
  }[];
}

// Add other shared interfaces here in the future 