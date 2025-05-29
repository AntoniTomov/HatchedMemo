import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

interface TabsListProps {
  children: React.ReactNode;
  style?: ViewStyle;
  selectedValue?: string;
  onValueChange?: (value: string) => void;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
  selectedValue?: string;
  onValueChange?: (value: string) => void;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  style?: ViewStyle;
  selectedValue?: string;
}

const Tabs = ({
  defaultValue,
  value,
  onValueChange,
  children,
  style,
}: TabsProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <View style={[styles.container, style]}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<TabsListProps | TabsTriggerProps | TabsContentProps>, {
            selectedValue: value || selectedValue,
            onValueChange: handleValueChange,
          });
        }
        return child;
      })}
    </View>
  );
};

const TabsList = ({ children, style }: TabsListProps) => {
  return (
    <View style={[styles.list, style]}>
      {children}
    </View>
  );
};

const TabsTrigger = ({
  value,
  children,
  disabled = false,
  selectedValue,
  onValueChange,
  style,
}: TabsTriggerProps & {
  selectedValue?: string;
  onValueChange?: (value: string) => void;
}) => {
  const isSelected = value === selectedValue;

  return (
    <TouchableOpacity
      onPress={() => onValueChange?.(value)}
      disabled={disabled}
      style={[
        styles.trigger,
        isSelected && styles.triggerSelected,
        disabled && styles.triggerDisabled,
        style,
      ]}
    >
      <Text
        style={[
          styles.triggerText,
          isSelected && styles.triggerTextSelected,
          disabled && styles.triggerTextDisabled,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const TabsContent = ({
  value,
  children,
  selectedValue,
  style,
}: TabsContentProps & {
  selectedValue?: string;
}) => {
  if (value !== selectedValue) {
    return null;
  }

  return (
    <View style={[styles.content, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  list: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 4,
  },
  trigger: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  triggerSelected: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  triggerDisabled: {
    opacity: 0.5,
  },
  triggerText: {
    fontSize: 14,
    color: '#6b7280',
  },
  triggerTextSelected: {
    color: '#1f2937',
    fontWeight: '500',
  },
  triggerTextDisabled: {
    color: '#9ca3af',
  },
  content: {
    marginTop: 8,
  },
});

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

export { Tabs }; 