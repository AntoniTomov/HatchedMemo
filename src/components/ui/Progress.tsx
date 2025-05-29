import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  Animated,
} from 'react-native';

interface ProgressProps {
  value?: number;
  style?: ViewStyle;
}

const Progress = ({ value = 0, style }: ProgressProps) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: value,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const width = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.indicator,
          {
            width,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 16,
    width: '100%',
    backgroundColor: '#e5e7eb',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  indicator: {
    height: '100%',
    backgroundColor: '#9333ea',
    borderRadius: 9999,
  },
});

export { Progress }; 