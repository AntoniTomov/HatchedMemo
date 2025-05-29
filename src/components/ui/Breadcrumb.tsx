import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface BreadcrumbProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface BreadcrumbListProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface BreadcrumbItemProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface BreadcrumbLinkProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: TextStyle;
}

interface BreadcrumbPageProps {
  children: React.ReactNode;
  style?: TextStyle;
}

interface BreadcrumbSeparatorProps {
  children?: React.ReactNode;
  style?: ViewStyle;
}

const Breadcrumb: React.FC<BreadcrumbProps> & {
  List: React.FC<BreadcrumbListProps>;
  Item: React.FC<BreadcrumbItemProps>;
  Link: React.FC<BreadcrumbLinkProps>;
  Page: React.FC<BreadcrumbPageProps>;
  Separator: React.FC<BreadcrumbSeparatorProps>;
} = ({ children, style }) => {
  return (
    <View style={[styles.root, style]}>
      {children}
    </View>
  );
};

const BreadcrumbList: React.FC<BreadcrumbListProps> = ({ children, style }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.list, style]}
    >
      {children}
    </ScrollView>
  );
};

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({ children, style }) => {
  return (
    <View style={[styles.item, style]}>
      {children}
    </View>
  );
};

const BreadcrumbLink: React.FC<BreadcrumbLinkProps> = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.link, style]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const BreadcrumbPage: React.FC<BreadcrumbPageProps> = ({ children, style }) => {
  return (
    <Text style={[styles.page, style]}>
      {children}
    </Text>
  );
};

const BreadcrumbSeparator: React.FC<BreadcrumbSeparatorProps> = ({ children, style }) => {
  return (
    <View style={[styles.separator, style]}>
      {children || <Icon name="chevron-right" size={14} color="#9ca3af" />}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  link: {
    fontSize: 14,
    color: '#6b7280',
  },
  page: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '500',
  },
  separator: {
    marginHorizontal: 4,
  },
});

Breadcrumb.List = BreadcrumbList;
Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Link = BreadcrumbLink;
Breadcrumb.Page = BreadcrumbPage;
Breadcrumb.Separator = BreadcrumbSeparator;

export { Breadcrumb }; 