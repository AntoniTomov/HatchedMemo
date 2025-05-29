import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Dimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

interface DrawerProps {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
  style?: ViewStyle;
}

interface DrawerTriggerProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

interface DrawerContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface DrawerHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface DrawerFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface DrawerTitleProps {
  children: React.ReactNode;
  style?: TextStyle;
}

interface DrawerDescriptionProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DRAWER_HEIGHT = SCREEN_HEIGHT * 0.8;

const Drawer = ({ children, isVisible, onClose, style }: DrawerProps) => {
  const translateY = useSharedValue(DRAWER_HEIGHT);

  React.useEffect(() => {
    translateY.value = withSpring(isVisible ? 0 : DRAWER_HEIGHT);
  }, [isVisible]);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      if (event.translationY > DRAWER_HEIGHT * 0.3) {
        translateY.value = withSpring(DRAWER_HEIGHT);
        runOnJS(onClose)();
      } else {
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!isVisible) return null;

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.overlay} />
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.drawer, animatedStyle, style]}>
          <View style={styles.handle} />
          {children}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const DrawerTrigger = ({ children, onPress, style }: DrawerTriggerProps) => {
  return (
    <View style={style} onTouchEnd={onPress}>
      {children}
    </View>
  );
};

const DrawerContent = ({ children, style }: DrawerContentProps) => {
  return (
    <View style={[styles.content, style]}>
      {children}
    </View>
  );
};

const DrawerHeader = ({ children, style }: DrawerHeaderProps) => {
  return (
    <View style={[styles.header, style]}>
      {children}
    </View>
  );
};

const DrawerFooter = ({ children, style }: DrawerFooterProps) => {
  return (
    <View style={[styles.footer, style]}>
      {children}
    </View>
  );
};

const DrawerTitle = ({ children, style }: DrawerTitleProps) => {
  return (
    <Text style={[styles.title, style]}>
      {children}
    </Text>
  );
};

const DrawerDescription = ({ children, style }: DrawerDescriptionProps) => {
  return (
    <Text style={[styles.description, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: DRAWER_HEIGHT,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
  },
  content: {
    flex: 1,
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

Drawer.Trigger = DrawerTrigger;
Drawer.Content = DrawerContent;
Drawer.Header = DrawerHeader;
Drawer.Footer = DrawerFooter;
Drawer.Title = DrawerTitle;
Drawer.Description = DrawerDescription;

export { Drawer }; 