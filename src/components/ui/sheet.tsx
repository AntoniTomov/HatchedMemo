import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Modal from 'react-native-modal';

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export const Sheet: React.FC<SheetProps> = ({
  open,
  onOpenChange,
  children,
  side = 'bottom',
}) => {
  const getAnimationType = () => {
    switch (side) {
      case 'top':
        return 'slideInDown';
      case 'right':
        return 'slideInRight';
      case 'bottom':
        return 'slideInUp';
      case 'left':
        return 'slideInLeft';
      default:
        return 'slideInUp';
    }
  };

  return (
    <Modal
      isVisible={open}
      onBackdropPress={() => onOpenChange(false)}
      onSwipeComplete={() => onOpenChange(false)}
      swipeDirection={side === 'bottom' ? 'down' : side === 'top' ? 'up' : undefined}
      animationIn={getAnimationType()}
      animationOut={getAnimationType()}
      backdropOpacity={0.5}
      style={[
        styles.modal,
        side === 'bottom' && styles.bottomModal,
        side === 'top' && styles.topModal,
        side === 'left' && styles.leftModal,
        side === 'right' && styles.rightModal,
      ]}
    >
      <View style={styles.content}>
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  bottomModal: {
    justifyContent: 'flex-end',
  },
  topModal: {
    justifyContent: 'flex-start',
  },
  leftModal: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  rightModal: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  content: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
}); 