import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';

interface NavigationMenuProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface NavigationMenuListProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface NavigationMenuItemProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface NavigationMenuTriggerProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

interface NavigationMenuContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface NavigationMenuLinkProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

const NavigationMenu = ({ children, style }: NavigationMenuProps) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const NavigationMenuList = ({ children, style }: NavigationMenuListProps) => {
  return (
    <View style={[styles.list, style]}>
      {children}
    </View>
  );
};

const NavigationMenuItem = ({ children, style }: NavigationMenuItemProps) => {
  return (
    <View style={[styles.item, style]}>
      {children}
    </View>
  );
};

const NavigationMenuTrigger = ({ children, onPress, style }: NavigationMenuTriggerProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.trigger, style]}>
      {children}
      <Icon name="chevron-down" size={16} color="#1f2937" style={styles.chevron} />
    </TouchableOpacity>
  );
};

const NavigationMenuContent = ({ children, style }: NavigationMenuContentProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      onBackButtonPress={() => setIsVisible(false)}
      style={styles.modal}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View style={[styles.content, style]}>
        {children}
      </View>
    </Modal>
  );
};

const NavigationMenuLink = ({ children, onPress, style }: NavigationMenuLinkProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.link, style]}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  item: {
    marginHorizontal: 2,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  chevron: {
    marginLeft: 4,
  },
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  link: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
});

NavigationMenu.List = NavigationMenuList;
NavigationMenu.Item = NavigationMenuItem;
NavigationMenu.Trigger = NavigationMenuTrigger;
NavigationMenu.Content = NavigationMenuContent;
NavigationMenu.Link = NavigationMenuLink;

export { NavigationMenu }; 