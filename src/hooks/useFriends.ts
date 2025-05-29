import { useState, useCallback } from 'react';
import { Alert } from 'react-native';

interface FriendChild {
  id: string;
  name: string;
  birthDate: string;
  gender: string;
  avatarUrl?: string;
}

interface Friend {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  children?: FriendChild[];
}

export const useFriends = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(false);

  const addFriend = useCallback(async (friend: Omit<Friend, 'id'>) => {
    try {
      setLoading(true);
      // TODO: Implement API call
      const newFriend: Friend = {
        ...friend,
        id: Math.random().toString(36).substr(2, 9),
      };
      setFriends(prev => [...prev, newFriend]);
    } catch (error) {
      Alert.alert('Error', 'Failed to add friend');
    } finally {
      setLoading(false);
    }
  }, []);

  const removeFriend = useCallback(async (id: string) => {
    try {
      setLoading(true);
      // TODO: Implement API call
      setFriends(prev => prev.filter(friend => friend.id !== id));
    } catch (error) {
      Alert.alert('Error', 'Failed to remove friend');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFriend = useCallback(async (id: string, friend: Partial<Friend>) => {
    try {
      setLoading(true);
      // TODO: Implement API call
      setFriends(prev => prev.map(f => f.id === id ? { ...f, ...friend } : f));
    } catch (error) {
      Alert.alert('Error', 'Failed to update friend');
    } finally {
      setLoading(false);
    }
  }, []);

  const addFriendChild = useCallback(async (friendId: string, child: Omit<FriendChild, 'id'>) => {
    try {
      setLoading(true);
      // TODO: Implement API call
      const newChild: FriendChild = {
        ...child,
        id: Math.random().toString(36).substr(2, 9),
      };
      setFriends(prev => prev.map(friend => {
        if (friend.id === friendId) {
          return {
            ...friend,
            children: [...(friend.children || []), newChild],
          };
        }
        return friend;
      }));
    } catch (error) {
      Alert.alert('Error', 'Failed to add friend\'s child');
    } finally {
      setLoading(false);
    }
  }, []);

  const removeFriendChild = useCallback(async (friendId: string, childId: string) => {
    try {
      setLoading(true);
      // TODO: Implement API call
      setFriends(prev => prev.map(friend => {
        if (friend.id === friendId && friend.children) {
          return {
            ...friend,
            children: friend.children.filter(child => child.id !== childId),
          };
        }
        return friend;
      }));
    } catch (error) {
      Alert.alert('Error', 'Failed to remove friend\'s child');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFriendChild = useCallback(async (friendId: string, childId: string, child: Partial<FriendChild>) => {
    try {
      setLoading(true);
      // TODO: Implement API call
      setFriends(prev => prev.map(friend => {
        if (friend.id === friendId && friend.children) {
          return {
            ...friend,
            children: friend.children.map(c => c.id === childId ? { ...c, ...child } : c),
          };
        }
        return friend;
      }));
    } catch (error) {
      Alert.alert('Error', 'Failed to update friend\'s child');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    friends,
    loading,
    addFriend,
    removeFriend,
    updateFriend,
    addFriendChild,
    removeFriendChild,
    updateFriendChild,
  };
}; 