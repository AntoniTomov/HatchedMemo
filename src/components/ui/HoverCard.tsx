import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Modal from 'react-native-modal';

interface HoverCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface HoverCardTriggerProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

interface HoverCardContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const HoverCard = ({ children, style }: HoverCardProps) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const HoverCardTrigger = ({ children, onPress, style }: HoverCardTriggerProps) => {
  return (
    <Pressable onPress={onPress} style={style}>
      {children}
    </Pressable>
  );
};

const HoverCardContent = ({ children, style }: HoverCardContentProps) => {
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

HoverCard.Trigger = HoverCardTrigger;
HoverCard.Content = HoverCardContent;

export { HoverCard }; 