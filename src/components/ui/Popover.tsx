import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Modal from 'react-native-modal';

interface PopoverProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface PopoverTriggerProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

interface PopoverContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Popover = ({ children, style }: PopoverProps) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const PopoverTrigger = ({ children, onPress, style }: PopoverTriggerProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  );
};

const PopoverContent = ({ children, style }: PopoverContentProps) => {
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

const styles = StyleSheet.create({
  container: {
    position: 'relative',
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
});

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;

export { Popover }; 