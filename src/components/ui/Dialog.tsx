import React from 'react';
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

interface DialogProps {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
  style?: ViewStyle;
}

interface DialogTriggerProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

interface DialogContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface DialogHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface DialogFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface DialogTitleProps {
  children: React.ReactNode;
  style?: TextStyle;
}

interface DialogDescriptionProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const Dialog = ({ children, isVisible, onClose, style }: DialogProps) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View style={[styles.container, style]}>
        {children}
      </View>
    </Modal>
  );
};

const DialogTrigger = ({ children, onPress, style }: DialogTriggerProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  );
};

const DialogContent = ({ children, style }: DialogContentProps) => {
  return (
    <View style={[styles.content, style]}>
      {children}
    </View>
  );
};

const DialogHeader = ({ children, style }: DialogHeaderProps) => {
  return (
    <View style={[styles.header, style]}>
      {children}
    </View>
  );
};

const DialogFooter = ({ children, style }: DialogFooterProps) => {
  return (
    <View style={[styles.footer, style]}>
      {children}
    </View>
  );
};

const DialogTitle = ({ children, style }: DialogTitleProps) => {
  return (
    <Text style={[styles.title, style]}>
      {children}
    </Text>
  );
};

const DialogDescription = ({ children, style }: DialogDescriptionProps) => {
  return (
    <Text style={[styles.description, style]}>
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
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '90%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    padding: 24,
  },
  header: {
    marginBottom: 16,
  },
  footer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
  },
});

Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
Dialog.Header = DialogHeader;
Dialog.Footer = DialogFooter;
Dialog.Title = DialogTitle;
Dialog.Description = DialogDescription;

export { Dialog }; 