import React from 'react';
import { View, StyleSheet, ViewStyle, Dimensions } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

interface ChartProps {
  type: 'line' | 'bar' | 'pie' | 'progress' | 'contribution' | 'stackedBar';
  data: any;
  width?: number;
  height?: number;
  style?: ViewStyle;
  chartConfig?: {
    backgroundColor?: string;
    backgroundGradientFrom?: string;
    backgroundGradientTo?: string;
    decimalPlaces?: number;
    color?: (opacity: number) => string;
    labelColor?: (opacity: number) => string;
    style?: any;
    propsForDots?: any;
  };
}

const defaultChartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(147, 51, 234, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(31, 41, 55, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#9333ea',
  },
};

const Chart: React.FC<ChartProps> = ({
  type,
  data,
  width = Dimensions.get('window').width - 32,
  height = 220,
  style,
  chartConfig = defaultChartConfig,
}) => {
  const renderChart = () => {
    const commonProps = {
      data,
      width,
      height,
      chartConfig,
      style: styles.chart,
    };

    switch (type) {
      case 'line':
        return <LineChart {...commonProps} />;
      case 'bar':
        return <BarChart {...commonProps} />;
      case 'pie':
        return <PieChart {...commonProps} />;
      case 'progress':
        return <ProgressChart {...commonProps} />;
      case 'contribution':
        return <ContributionGraph {...commonProps} />;
      case 'stackedBar':
        return <StackedBarChart {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, style]}>
      {renderChart()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export { Chart }; 