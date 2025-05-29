import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Slider from '@react-native-community/slider';

interface SliderProps {
  value?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  style?: ViewStyle;
}

const SliderComponent = ({
  value = 0,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  style,
}: SliderProps) => {
  return (
    <View style={[styles.container, style]}>
      <Slider
        value={value}
        onValueChange={onValueChange}
        minimumValue={min}
        maximumValue={max}
        step={step}
        disabled={disabled}
        minimumTrackTintColor="#9333ea"
        maximumTrackTintColor="#e5e7eb"
        thumbTintColor="#9333ea"
        style={styles.slider}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export { SliderComponent as Slider }; 