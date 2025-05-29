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

interface DropdownMenuProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  style?: ViewStyle;
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  inset?: boolean;
  style?: ViewStyle;
}

interface DropdownMenuCheckboxItemProps {
  children: React.ReactNode;
  checked?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

interface DropdownMenuRadioItemProps {
  children: React.ReactNode;
  value: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

interface DropdownMenuLabelProps {
  children: React.ReactNode;
  inset?: boolean;
  style?: TextStyle;
}

interface DropdownMenuSeparatorProps {
  style?: ViewStyle;
}

interface DropdownMenuShortcutProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const DropdownMenu = ({ children, trigger, onOpen, onClose, style }: DropdownMenuProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleOpen = () => {
    setIsVisible(true);
    onOpen?.();
  };

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  return (
    <View style={style}>
      <TouchableOpacity onPress={handleOpen}>
        {trigger}
      </TouchableOpacity>
      <Modal
        isVisible={isVisible}
        onBackdropPress={handleClose}
        onBackButtonPress={handleClose}
        style={styles.modal}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View style={styles.content}>
          {children}
        </View>
      </Modal>
    </View>
  );
};

const DropdownMenuTrigger = ({ children, onPress, style }: DropdownMenuTriggerProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  );
};

const DropdownMenuContent = ({ children, style }: DropdownMenuContentProps) => {
  return (
    <View style={[styles.content, style]}>
      {children}
    </View>
  );
};

const DropdownMenuItem = ({ children, onPress, disabled, inset, style }: DropdownMenuItemProps) => {
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

const DropdownMenuCheckboxItem = ({ children, checked, onPress, disabled, style }: DropdownMenuCheckboxItemProps) => {
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

const DropdownMenuRadioItem = ({ children, value, onPress, disabled, style }: DropdownMenuRadioItemProps) => {
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

const DropdownMenuLabel = ({ children, inset, style }: DropdownMenuLabelProps) => {
  return (
    <Text style={[styles.label, inset && styles.labelInset, style]}>
      {children}
    </Text>
  );
};

const DropdownMenuSeparator = ({ style }: DropdownMenuSeparatorProps) => {
  return <View style={[styles.separator, style]} />;
};

const DropdownMenuShortcut = ({ children, style }: DropdownMenuShortcutProps) => {
  return (
    <Text style={[styles.shortcut, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
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

DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.CheckboxItem = DropdownMenuCheckboxItem;
DropdownMenu.RadioItem = DropdownMenuRadioItem;
DropdownMenu.Label = DropdownMenuLabel;
DropdownMenu.Separator = DropdownMenuSeparator;
DropdownMenu.Shortcut = DropdownMenuShortcut;

export { DropdownMenu }; 