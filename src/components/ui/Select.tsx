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

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

interface SelectTriggerProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

interface SelectContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

interface SelectLabelProps {
  children: React.ReactNode;
  style?: TextStyle;
}

interface SelectSeparatorProps {
  style?: ViewStyle;
}

const Select = ({ value, onValueChange, children, style }: SelectProps) => {
  return (
    <View style={[styles.container, style]}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            value,
            onValueChange,
          });
        }
        return child;
      })}
    </View>
  );
};

const SelectTrigger = ({ children, onPress, style }: SelectTriggerProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.trigger, style]}>
      {children}
      <Icon name="chevron-down" size={16} color="#1f2937" style={styles.chevron} />
    </TouchableOpacity>
  );
};

const SelectContent = ({ children, style }: SelectContentProps) => {
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

const SelectItem = ({ value, children, onPress, style }: SelectItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      {children}
    </TouchableOpacity>
  );
};

const SelectLabel = ({ children, style }: SelectLabelProps) => {
  return (
    <Text style={[styles.label, style]}>
      {children}
    </Text>
  );
};

const SelectSeparator = ({ style }: SelectSeparatorProps) => {
  return <View style={[styles.separator, style]} />;
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: 'white',
  },
  chevron: {
    marginLeft: 8,
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
    width: '80%',
    maxWidth: 300,
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
    borderRadius: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 4,
  },
});

Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Item = SelectItem;
Select.Label = SelectLabel;
Select.Separator = SelectSeparator;

export { Select }; 