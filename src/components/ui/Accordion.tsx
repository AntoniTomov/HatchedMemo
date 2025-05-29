import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface AccordionProps {
  children: React.ReactNode;
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  style?: ViewStyle;
}

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  style?: ViewStyle;
  isOpen?: boolean;
  onToggle?: () => void;
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  isOpen?: boolean;
  onToggle?: () => void;
}

interface AccordionContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
  isOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> & {
  Item: React.FC<AccordionItemProps>;
  Trigger: React.FC<AccordionTriggerProps>;
  Content: React.FC<AccordionContentProps>;
} = ({ children, type = 'single', defaultValue, style }) => {
  const [openItems, setOpenItems] = useState<string[]>(
    defaultValue ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) : []
  );

  const toggleItem = (value: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    
    if (type === 'single') {
      setOpenItems(openItems.includes(value) ? [] : [value]);
    } else {
      setOpenItems(prev =>
        prev.includes(value)
          ? prev.filter(item => item !== value)
          : [...prev, value]
      );
    }
  };

  const isOpen = (value: string) => openItems.includes(value);

  return (
    <View style={[styles.root, style]}>
      {React.Children.map(children, child => {
        if (React.isValidElement<AccordionItemProps>(child)) {
          return React.cloneElement(child, {
            isOpen: isOpen(child.props.value),
            onToggle: () => toggleItem(child.props.value),
          });
        }
        return child;
      })}
    </View>
  );
};

const AccordionItem: React.FC<AccordionItemProps> = ({ children, style, isOpen, onToggle }) => {
  return (
    <View style={[styles.item, style]}>
      {React.Children.map(children, child => {
        if (React.isValidElement<AccordionTriggerProps | AccordionContentProps>(child)) {
          return React.cloneElement(child, {
            isOpen,
            onToggle,
          });
        }
        return child;
      })}
    </View>
  );
};

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ children, style, isOpen, onToggle }) => {
  const rotateAnimation = new Animated.Value(isOpen ? 1 : 0);

  React.useEffect(() => {
    Animated.timing(rotateAnimation, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <TouchableOpacity
      onPress={onToggle}
      style={[styles.trigger, style]}
    >
      <View style={styles.triggerContent}>
        {children}
      </View>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <Icon name="chevron-down" size={16} color="#6b7280" />
      </Animated.View>
    </TouchableOpacity>
  );
};

const AccordionContent: React.FC<AccordionContentProps> = ({ children, style, isOpen }) => {
  if (!isOpen) return null;

  return (
    <View style={[styles.content, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  triggerContent: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

export { Accordion }; 