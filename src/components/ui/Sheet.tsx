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

type AnimationType = 'slideInDown' | 'slideInRight' | 'slideInUp' | 'slideInLeft' | 'slideOutUp' | 'slideOutRight' | 'slideOutDown' | 'slideOutLeft';

interface SheetProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface SheetTriggerProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

interface SheetContentProps {
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  style?: ViewStyle;
}

interface SheetHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface SheetFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface SheetTitleProps {
  children: React.ReactNode;
  style?: TextStyle;
}

interface SheetDescriptionProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const Sheet = ({ children, style }: SheetProps) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const SheetTrigger = ({ children, onPress, style }: SheetTriggerProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  );
};

const SheetContent = ({ children, side = 'right', style }: SheetContentProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const animations: Record<'top' | 'right' | 'bottom' | 'left', Record<'in' | 'out', AnimationType>> = {
    top: {
      in: 'slideInDown',
      out: 'slideOutUp',
    },
    right: {
      in: 'slideInRight',
      out: 'slideOutRight',
    },
    bottom: {
      in: 'slideInUp',
      out: 'slideOutDown',
    },
    left: {
      in: 'slideInLeft',
      out: 'slideOutLeft',
    },
  };

  const getAnimation = (type: 'in' | 'out'): AnimationType => {
    return animations[side][type];
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      onBackButtonPress={() => setIsVisible(false)}
      style={[styles.modal, styles[`modal${side}`]]}
      animationIn={getAnimation('in')}
      animationOut={getAnimation('out')}
      backdropTransitionOutTiming={0}
    >
      <View style={[styles.content, styles[`content${side}`], style]}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setIsVisible(false)}
        >
          <Icon name="x" size={16} color="#1f2937" />
        </TouchableOpacity>
        {children}
      </View>
    </Modal>
  );
};

const SheetHeader = ({ children, style }: SheetHeaderProps) => {
  return (
    <View style={[styles.header, style]}>
      {children}
    </View>
  );
};

const SheetFooter = ({ children, style }: SheetFooterProps) => {
  return (
    <View style={[styles.footer, style]}>
      {children}
    </View>
  );
};

const SheetTitle = ({ children, style }: SheetTitleProps) => {
  return (
    <Text style={[styles.title, style]}>
      {children}
    </Text>
  );
};

const SheetDescription = ({ children, style }: SheetDescriptionProps) => {
  return (
    <Text style={[styles.description, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  modal: {
    margin: 0,
  },
  modaltop: {
    justifyContent: 'flex-start',
  },
  modalright: {
    justifyContent: 'flex-end',
  },
  modalbottom: {
    justifyContent: 'flex-end',
  },
  modalleft: {
    justifyContent: 'flex-start',
  },
  content: {
    backgroundColor: 'white',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contenttop: {
    width: '100%',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  contentright: {
    height: '100%',
    width: '80%',
    maxWidth: 400,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  contentbottom: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  contentleft: {
    height: '100%',
    width: '80%',
    maxWidth: 400,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
  },
  header: {
    marginBottom: 16,
  },
  footer: {
    marginTop: 16,
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
    marginTop: 4,
  },
});

Sheet.Trigger = SheetTrigger;
Sheet.Content = SheetContent;
Sheet.Header = SheetHeader;
Sheet.Footer = SheetFooter;
Sheet.Title = SheetTitle;
Sheet.Description = SheetDescription;

export { Sheet }; 