import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Pressable,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface AlertDialogTriggerProps {
  children: React.ReactNode;
  onPress: () => void;
}

interface AlertDialogContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface AlertDialogHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface AlertDialogFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface AlertDialogTitleProps {
  children: React.ReactNode;
  style?: TextStyle;
}

interface AlertDialogDescriptionProps {
  children: React.ReactNode;
  style?: TextStyle;
}

interface AlertDialogActionProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
}

interface AlertDialogCancelProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
}

const AlertDialog: React.FC<AlertDialogProps> & {
  Trigger: React.FC<AlertDialogTriggerProps>;
  Content: React.FC<AlertDialogContentProps>;
  Header: React.FC<AlertDialogHeaderProps>;
  Footer: React.FC<AlertDialogFooterProps>;
  Title: React.FC<AlertDialogTitleProps>;
  Description: React.FC<AlertDialogDescriptionProps>;
  Action: React.FC<AlertDialogActionProps>;
  Cancel: React.FC<AlertDialogCancelProps>;
} = ({ open, onOpenChange, children }) => {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
    >
      {children}
    </Modal>
  );
};

const AlertDialogTrigger: React.FC<AlertDialogTriggerProps> = ({ children, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      {children}
    </Pressable>
  );
};

const AlertDialogContent: React.FC<AlertDialogContentProps> = ({ children, style }) => {
  return (
    <View style={styles.overlay}>
      <View style={[styles.content, style]}>
        {children}
      </View>
    </View>
  );
};

const AlertDialogHeader: React.FC<AlertDialogHeaderProps> = ({ children, style }) => {
  return (
    <View style={[styles.header, style]}>
      {children}
    </View>
  );
};

const AlertDialogFooter: React.FC<AlertDialogFooterProps> = ({ children, style }) => {
  return (
    <View style={[styles.footer, style]}>
      {children}
    </View>
  );
};

const AlertDialogTitle: React.FC<AlertDialogTitleProps> = ({ children, style }) => {
  return (
    <Text style={[styles.title, style]}>
      {children}
    </Text>
  );
};

const AlertDialogDescription: React.FC<AlertDialogDescriptionProps> = ({ children, style }) => {
  return (
    <Text style={[styles.description, style]}>
      {children}
    </Text>
  );
};

const AlertDialogAction: React.FC<AlertDialogActionProps> = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.actionButton, style]}
    >
      {children}
    </TouchableOpacity>
  );
};

const AlertDialogCancel: React.FC<AlertDialogCancelProps> = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.cancelButton, style]}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    width: Dimensions.get('window').width * 0.9,
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
  header: {
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
  },
  actionButton: {
    backgroundColor: '#9333ea',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    minWidth: 80,
    alignItems: 'center',
  },
});

AlertDialog.Trigger = AlertDialogTrigger;
AlertDialog.Content = AlertDialogContent;
AlertDialog.Header = AlertDialogHeader;
AlertDialog.Footer = AlertDialogFooter;
AlertDialog.Title = AlertDialogTitle;
AlertDialog.Description = AlertDialogDescription;
AlertDialog.Action = AlertDialogAction;
AlertDialog.Cancel = AlertDialogCancel;

export { AlertDialog }; 