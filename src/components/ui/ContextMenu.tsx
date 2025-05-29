import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';

interface ContextMenuProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  style?: ViewStyle;
}

interface ContextMenuTriggerProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

interface ContextMenuContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface ContextMenuItemProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  inset?: boolean;
  style?: ViewStyle;
}

interface ContextMenuCheckboxItemProps {
  children: React.ReactNode;
  checked?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

interface ContextMenuRadioItemProps {
  children: React.ReactNode;
  value: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

interface ContextMenuLabelProps {
  children: React.ReactNode;
  inset?: boolean;
  style?: TextStyle;
}

interface ContextMenuSeparatorProps {
  style?: ViewStyle;
}

interface ContextMenuShortcutProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const ContextMenu = ({ children, trigger, onOpen, onClose, style }: ContextMenuProps) => {
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
      <Pressable onLongPress={handleOpen}>
        {trigger}
      </Pressable>
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

const ContextMenuTrigger = ({ children, onPress, style }: ContextMenuTriggerProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  );
};

const ContextMenuContent = ({ children, style }: ContextMenuContentProps) => {
  return (
    <View style={[styles.content, style]}>
      {children}
    </View>
  );
};

const ContextMenuItem = ({ children, onPress, disabled, inset, style }: ContextMenuItemProps) => {
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

const ContextMenuCheckboxItem = ({ children, checked, onPress, disabled, style }: ContextMenuCheckboxItemProps) => {
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

const ContextMenuRadioItem = ({ children, value, onPress, disabled, style }: ContextMenuRadioItemProps) => {
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

const ContextMenuLabel = ({ children, inset, style }: ContextMenuLabelProps) => {
  return (
    <Text style={[styles.label, inset && styles.labelInset, style]}>
      {children}
    </Text>
  );
};

const ContextMenuSeparator = ({ style }: ContextMenuSeparatorProps) => {
  return <View style={[styles.separator, style]} />;
};

const ContextMenuShortcut = ({ children, style }: ContextMenuShortcutProps) => {
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

ContextMenu.Trigger = ContextMenuTrigger;
ContextMenu.Content = ContextMenuContent;
ContextMenu.Item = ContextMenuItem;
ContextMenu.CheckboxItem = ContextMenuCheckboxItem;
ContextMenu.RadioItem = ContextMenuRadioItem;
ContextMenu.Label = ContextMenuLabel;
ContextMenu.Separator = ContextMenuSeparator;
ContextMenu.Shortcut = ContextMenuShortcut;

export { ContextMenu }; 