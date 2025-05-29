import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

interface ButtonStyles {
  container: ViewStyle;
  text: TextStyle;
}

const getButtonStyles = (variant: ButtonVariant = 'default', size: ButtonSize = 'default'): ButtonStyles => {
  const baseStyles: ButtonStyles = {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      borderRadius: 6,
    },
    text: {
      fontSize: 14,
      fontWeight: '500',
    },
  };

  const sizeStyles: Record<ButtonSize, Partial<ButtonStyles>> = {
    default: {
      container: {
        height: 40,
        paddingHorizontal: 16,
        paddingVertical: 8,
      },
    },
    sm: {
      container: {
        height: 36,
        paddingHorizontal: 12,
        paddingVertical: 6,
      },
      text: {
        fontSize: 12,
      },
    },
    lg: {
      container: {
        height: 44,
        paddingHorizontal: 32,
        paddingVertical: 10,
      },
      text: {
        fontSize: 16,
      },
    },
    icon: {
      container: {
        width: 40,
        height: 40,
        padding: 8,
      },
    },
  };

  const variantStyles: Record<ButtonVariant, ButtonStyles> = {
    default: {
      container: {
        backgroundColor: '#9333ea',
      },
      text: {
        color: '#ffffff',
      },
    },
    destructive: {
      container: {
        backgroundColor: '#dc2626',
      },
      text: {
        color: '#ffffff',
      },
    },
    outline: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#e5e7eb',
      },
      text: {
        color: '#1f2937',
      },
    },
    secondary: {
      container: {
        backgroundColor: '#f3f4f6',
      },
      text: {
        color: '#1f2937',
      },
    },
    ghost: {
      container: {
        backgroundColor: 'transparent',
      },
      text: {
        color: '#1f2937',
      },
    },
    link: {
      container: {
        backgroundColor: 'transparent',
        padding: 0,
      },
      text: {
        color: '#9333ea',
        textDecorationLine: 'underline',
      },
    },
  };

  return {
    container: {
      ...baseStyles.container,
      ...sizeStyles[size].container,
      ...variantStyles[variant].container,
    },
    text: {
      ...baseStyles.text,
      ...(sizeStyles[size].text || {}),
      ...variantStyles[variant].text,
    },
  };
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  size = 'default',
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const buttonStyles = getButtonStyles(variant, size);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        buttonStyles.container,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={buttonStyles.text.color}
        />
      ) : (
        <Text style={[buttonStyles.text, textStyle]}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});

export { Button }; 