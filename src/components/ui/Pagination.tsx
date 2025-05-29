import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface PaginationProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface PaginationContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface PaginationItemProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface PaginationLinkProps {
  children: React.ReactNode;
  isActive?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

const Pagination = ({ children, style }: PaginationProps) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
};

const PaginationContent = ({ children, style }: PaginationContentProps) => {
  return (
    <View style={[styles.content, style]}>
      {children}
    </View>
  );
};

const PaginationItem = ({ children, style }: PaginationItemProps) => {
  return (
    <View style={[styles.item, style]}>
      {children}
    </View>
  );
};

const PaginationLink = ({ children, isActive, onPress, style }: PaginationLinkProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.link,
        isActive ? styles.linkActive : styles.linkInactive,
        style,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};

const PaginationPrevious = ({ onPress, style }: Omit<PaginationLinkProps, 'children'>) => {
  return (
    <PaginationLink onPress={onPress} style={[styles.previous, style]}>
      <Icon name="chevron-left" size={16} color="#1f2937" />
      <Text style={styles.previousText}>Previous</Text>
    </PaginationLink>
  );
};

const PaginationNext = ({ onPress, style }: Omit<PaginationLinkProps, 'children'>) => {
  return (
    <PaginationLink onPress={onPress} style={[styles.next, style]}>
      <Text style={styles.nextText}>Next</Text>
      <Icon name="chevron-right" size={16} color="#1f2937" />
    </PaginationLink>
  );
};

const PaginationEllipsis = ({ style }: { style?: ViewStyle }) => {
  return (
    <View style={[styles.ellipsis, style]}>
      <Icon name="more-horizontal" size={16} color="#1f2937" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  item: {
    marginHorizontal: 2,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  linkActive: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  linkInactive: {
    backgroundColor: 'transparent',
  },
  previous: {
    gap: 4,
    paddingLeft: 10,
  },
  previousText: {
    fontSize: 14,
    color: '#1f2937',
  },
  next: {
    gap: 4,
    paddingRight: 10,
  },
  nextText: {
    fontSize: 14,
    color: '#1f2937',
  },
  ellipsis: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Pagination.Content = PaginationContent;
Pagination.Item = PaginationItem;
Pagination.Link = PaginationLink;
Pagination.Previous = PaginationPrevious;
Pagination.Next = PaginationNext;
Pagination.Ellipsis = PaginationEllipsis;

export { Pagination }; 