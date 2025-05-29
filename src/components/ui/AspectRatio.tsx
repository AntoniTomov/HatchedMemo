import React from 'react';
import { View, StyleSheet, ViewStyle, LayoutChangeEvent } from 'react-native';

interface AspectRatioProps {
  ratio?: number;
  children: React.ReactNode;
  style?: ViewStyle;
}

const AspectRatio: React.FC<AspectRatioProps> = ({ ratio = 1, children, style }) => {
  const [width, setWidth] = React.useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width: newWidth } = event.nativeEvent.layout;
    setWidth(newWidth);
  };

  return (
    <View style={[styles.container, style]} onLayout={onLayout}>
      <View style={[styles.content, { paddingBottom: `${(1 / ratio) * 100}%` }]}>
        <View style={[styles.inner, { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]}>
          {children}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  content: {
    width: '100%',
  },
  inner: {
    width: '100%',
    height: '100%',
  },
});

export { AspectRatio }; 