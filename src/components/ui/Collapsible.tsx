import React, { useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ViewStyle,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface CollapsibleProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

interface CollapsibleTriggerProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

interface CollapsibleContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Collapsible: React.FC<CollapsibleProps> & {
  Trigger: React.FC<CollapsibleTriggerProps>;
  Content: React.FC<CollapsibleContentProps>;
} = ({ open = false, onOpenChange, children, style }) => {
  const animatedHeight = useRef(new Animated.Value(open ? 1 : 0)).current;

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.timing(animatedHeight, {
      toValue: open ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [open]);

  return (
    <View style={[styles.container, style]}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === CollapsibleTrigger) {
            return React.cloneElement(child as React.ReactElement<CollapsibleTriggerProps>, {
              onPress: () => onOpenChange?.(!open),
            });
          }
          if (child.type === CollapsibleContent) {
            return (
              <Animated.View
                style={[
                  styles.content,
                  {
                    maxHeight: animatedHeight.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1000], // Adjust based on your content
                    }),
                    opacity: animatedHeight,
                  },
                ]}
              >
                {child}
              </Animated.View>
            );
          }
        }
        return child;
      })}
    </View>
  );
};

const CollapsibleTrigger: React.FC<CollapsibleTriggerProps> = ({
  children,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  );
};

const CollapsibleContent: React.FC<CollapsibleContentProps> = ({
  children,
  style,
}) => {
  return <View style={[styles.contentContainer, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  content: {
    overflow: 'hidden',
  },
  contentContainer: {
    paddingVertical: 8,
  },
});

Collapsible.Trigger = CollapsibleTrigger;
Collapsible.Content = CollapsibleContent;

export { Collapsible }; 