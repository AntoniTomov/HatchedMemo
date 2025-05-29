import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';

interface CommandProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface CommandDialogProps {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

interface CommandInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  style?: ViewStyle;
}

interface CommandListProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface CommandEmptyProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface CommandGroupProps {
  children: React.ReactNode;
  heading?: string;
  style?: ViewStyle;
}

interface CommandItemProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

interface CommandShortcutProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const Command = ({ children, style }: CommandProps) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const CommandDialog = ({ children, isVisible, onClose }: CommandDialogProps) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View style={styles.dialogContent}>
        {children}
      </View>
    </Modal>
  );
};

const CommandInput = ({ placeholder, value, onChangeText, style }: CommandInputProps) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <Icon name="search" size={20} color="#6b7280" style={styles.searchIcon} />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        placeholderTextColor="#6b7280"
      />
    </View>
  );
};

const CommandList = ({ children, style }: CommandListProps) => {
  return (
    <ScrollView style={[styles.list, style]}>
      {children}
    </ScrollView>
  );
};

const CommandEmpty = ({ children, style }: CommandEmptyProps) => {
  return (
    <View style={[styles.empty, style]}>
      <Text style={styles.emptyText}>{children}</Text>
    </View>
  );
};

const CommandGroup = ({ children, heading, style }: CommandGroupProps) => {
  return (
    <View style={[styles.group, style]}>
      {heading && (
        <Text style={styles.groupHeading}>{heading}</Text>
      )}
      {children}
    </View>
  );
};

const CommandItem = ({ children, onPress, disabled, style }: CommandItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.item,
        disabled && styles.itemDisabled,
        style,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};

const CommandShortcut = ({ children, style }: CommandShortcutProps) => {
  return (
    <Text style={[styles.shortcut, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '90%',
    maxHeight: '80%',
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  list: {
    maxHeight: 300,
  },
  empty: {
    padding: 16,
    alignItems: 'center',
  },
  emptyText: {
    color: '#6b7280',
    fontSize: 14,
  },
  group: {
    paddingVertical: 8,
  },
  groupHeading: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  shortcut: {
    marginLeft: 'auto',
    fontSize: 12,
    color: '#6b7280',
  },
});

Command.Dialog = CommandDialog;
Command.Input = CommandInput;
Command.List = CommandList;
Command.Empty = CommandEmpty;
Command.Group = CommandGroup;
Command.Item = CommandItem;
Command.Shortcut = CommandShortcut;

export { Command }; 