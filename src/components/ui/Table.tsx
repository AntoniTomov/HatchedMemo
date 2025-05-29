import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface TableProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface TableHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface TableBodyProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface TableFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface TableRowProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface TableHeadProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface TableCellProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface TableCaptionProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Table = ({ children, style }: TableProps) => {
  return (
    <ScrollView horizontal style={[styles.container, style]}>
      <View style={styles.table}>
        {children}
      </View>
    </ScrollView>
  );
};

const TableHeader = ({ children, style }: TableHeaderProps) => {
  return (
    <View style={[styles.header, style]}>
      {children}
    </View>
  );
};

const TableBody = ({ children, style }: TableBodyProps) => {
  return (
    <View style={[styles.body, style]}>
      {children}
    </View>
  );
};

const TableFooter = ({ children, style }: TableFooterProps) => {
  return (
    <View style={[styles.footer, style]}>
      {children}
    </View>
  );
};

const TableRow = ({ children, style }: TableRowProps) => {
  return (
    <View style={[styles.row, style]}>
      {children}
    </View>
  );
};

const TableHead = ({ children, style }: TableHeadProps) => {
  return (
    <View style={[styles.head, style]}>
      {children}
    </View>
  );
};

const TableCell = ({ children, style }: TableCellProps) => {
  return (
    <View style={[styles.cell, style]}>
      {children}
    </View>
  );
};

const TableCaption = ({ children, style }: TableCaptionProps) => {
  return (
    <View style={[styles.caption, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  table: {
    width: '100%',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  body: {
    width: '100%',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  head: {
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  cell: {
    padding: 12,
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  caption: {
    padding: 12,
    color: '#6b7280',
  },
});

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Row = TableRow;
Table.Head = TableHead;
Table.Cell = TableCell;
Table.Caption = TableCaption;

export { Table }; 