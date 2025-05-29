import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';

interface AvatarProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

interface AvatarImageProps {
  source: { uri: string };
  alt?: string;
  style?: ImageStyle;
}

interface AvatarFallbackProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const Avatar: React.FC<AvatarProps> & {
  Image: React.FC<AvatarImageProps>;
  Fallback: React.FC<AvatarFallbackProps>;
} = ({ children, style }) => {
  return (
    <View style={[styles.root, style]}>
      {children}
    </View>
  );
};

const AvatarImage: React.FC<AvatarImageProps> = ({ source, alt, style }) => {
  return (
    <Image
      source={source}
      style={[styles.image, style]}
      accessibilityLabel={alt}
    />
  );
};

const AvatarFallback: React.FC<AvatarFallbackProps> = ({ children, style }) => {
  return (
    <View style={styles.fallback}>
      <Text style={[styles.fallbackText, style]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    height: 40,
    width: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '500',
  },
});

Avatar.Image = AvatarImage;
Avatar.Fallback = AvatarFallback;

export { Avatar }; 