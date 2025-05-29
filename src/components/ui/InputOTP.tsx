import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from 'react-native';

interface InputOTPProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
}

interface InputOTPGroupProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface InputOTPSlotProps {
  index: number;
  value: string;
  onChange: (value: string) => void;
  style?: ViewStyle;
}

interface InputOTPSeparatorProps {
  style?: ViewStyle;
}

const InputOTP = ({ length = 6, value = '', onChange, style, containerStyle }: InputOTPProps) => {
  const [otp, setOtp] = useState(value.split('').slice(0, length));
  const inputRefs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    onChange?.(newOtp.join(''));

    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {Array.from({ length }).map((_, index) => (
        <InputOTPSlot
          key={index}
          index={index}
          value={otp[index] || ''}
          onChange={(text) => handleChange(text, index)}
          style={style}
        />
      ))}
    </View>
  );
};

const InputOTPGroup = ({ children, style }: InputOTPGroupProps) => {
  return (
    <View style={[styles.group, style]}>
      {children}
    </View>
  );
};

const InputOTPSlot = ({ index, value, onChange, style }: InputOTPSlotProps) => {
  return (
    <TextInput
      ref={(ref) => {
        if (ref) {
          inputRefs.current[index] = ref;
        }
      }}
      style={[styles.slot, style]}
      value={value}
      onChangeText={onChange}
      maxLength={1}
      keyboardType="number-pad"
      textAlign="center"
    />
  );
};

const InputOTPSeparator = ({ style }: InputOTPSeparatorProps) => {
  return <View style={[styles.separator, style]} />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  group: {
    flexDirection: 'row',
    gap: 8,
  },
  slot: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    fontSize: 16,
    textAlign: 'center',
  },
  separator: {
    width: 8,
    height: 1,
    backgroundColor: '#e5e7eb',
    alignSelf: 'center',
  },
});

InputOTP.Group = InputOTPGroup;
InputOTP.Slot = InputOTPSlot;
InputOTP.Separator = InputOTPSeparator;

export { InputOTP }; 