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

interface MenubarProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface MenubarMenuProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface MenubarTriggerProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

interface MenubarContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface MenubarItemProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  inset?: boolean;
  style?: ViewStyle;
}

interface MenubarCheckboxItemProps {
  children: React.ReactNode;
  checked?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

interface MenubarRadioItemProps {
  children: React.ReactNode;
  value: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

interface MenubarLabelProps {
  children: React.ReactNode;
  inset?: boolean;
  style?: TextStyle;
}

interface MenubarSeparatorProps {
  style?: ViewStyle;
}

interface MenubarShortcutProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const Menubar = ({ children, style }: MenubarProps) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const MenubarMenu = ({ children, style }: MenubarMenuProps) => {
  return (
    <View style={[styles.menu, style]}>
      {children}
    </View>
  );
};

const MenubarTrigger = ({ children, onPress, style }: MenubarTriggerProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.trigger, style]}>
      {children}
    </TouchableOpacity>
  );
};

const MenubarContent = ({ children, style }: MenubarContentProps) => {
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

const MenubarItem = ({ children, onPress, disabled, inset, style }: MenubarItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.item,
        inset && styles.itemInset,
        disabled && styles.itemDisabled,
        style,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};

const MenubarCheckboxItem = ({ children, checked, onPress, disabled, style }: MenubarCheckboxItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.item, disabled && styles.itemDisabled, style]}
    >
      <View style={styles.checkboxContainer}>
        {checked && <Icon name="check" size={16} color="#9333ea" />}
      </View>
      {children}
    </TouchableOpacity>
  );
};

const MenubarRadioItem = ({ children, value, onPress, disabled, style }: MenubarRadioItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.item, disabled && styles.itemDisabled, style]}
    >
      <View style={styles.radioContainer}>
        <Icon name="circle" size={8} color="#9333ea" />
      </View>
      {children}
    </TouchableOpacity>
  );
};

const MenubarLabel = ({ children, inset, style }: MenubarLabelProps) => {
  return (
    <Text style={[styles.label, inset && styles.labelInset, style]}>
      {children}
    </Text>
  );
};

const MenubarSeparator = ({ style }: MenubarSeparatorProps) => {
  return <View style={[styles.separator, style]} />;
};

const MenubarShortcut = ({ children, style }: MenubarShortcutProps) => {
  return (
    <Text style={[styles.shortcut, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 4,
    backgroundColor: 'white',
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trigger: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  itemInset: {
    paddingLeft: 32,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  checkboxContainer: {
    width: 16,
    height: 16,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioContainer: {
    width: 16,
    height: 16,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  labelInset: {
    paddingLeft: 32,
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 4,
  },
  shortcut: {
    marginLeft: 'auto',
    fontSize: 12,
    color: '#6b7280',
  },
});

Menubar.Menu = MenubarMenu;
Menubar.Trigger = MenubarTrigger;
Menubar.Content = MenubarContent;
Menubar.Item = MenubarItem;
Menubar.CheckboxItem = MenubarCheckboxItem;
Menubar.RadioItem = MenubarRadioItem;
Menubar.Label = MenubarLabel;
Menubar.Separator = MenubarSeparator;
Menubar.Shortcut = MenubarShortcut;

export { Menubar }; 