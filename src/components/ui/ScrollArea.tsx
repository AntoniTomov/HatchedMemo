import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  ViewStyle,
  ScrollViewProps,
} from 'react-native';

interface ScrollAreaProps extends ScrollViewProps {
  style?: ViewStyle;
}

interface ScrollBarProps {
  orientation?: 'vertical' | 'horizontal';
  style?: ViewStyle;
}

const ScrollArea = ({ style, children, ...props }: ScrollAreaProps) => {
  return (
    <View style={[styles.container, style]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        {...props}
      >
        {children}
      </ScrollView>
    </View>
  );
};

const ScrollBar = ({ orientation = 'vertical', style }: ScrollBarProps) => {
  return (
    <View
      style={[
        styles.scrollbar,
        orientation === 'vertical' ? styles.scrollbarVertical : styles.scrollbarHorizontal,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  scrollbar: {
    position: 'absolute',
    backgroundColor: '#e5e7eb',
    borderRadius: 9999,
  },
  scrollbarVertical: {
    top: 0,
    right: 0,
    width: 10,
    height: '100%',
  },
  scrollbarHorizontal: {
    bottom: 0,
    left: 0,
    height: 10,
    width: '100%',
  },
});

ScrollArea.ScrollBar = ScrollBar;

export { ScrollArea }; 