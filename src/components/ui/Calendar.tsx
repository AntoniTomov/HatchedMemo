import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Feather';

interface CalendarProps {
  selected?: string;
  onDayPress?: (date: { dateString: string }) => void;
  markedDates?: {
    [date: string]: {
      selected?: boolean;
      marked?: boolean;
      dotColor?: string;
    };
  };
  style?: ViewStyle;
}

const Calendar: React.FC<CalendarProps> = ({
  selected,
  onDayPress,
  markedDates,
  style,
}) => {
  const theme = {
    backgroundColor: '#ffffff',
    calendarBackground: '#ffffff',
    textSectionTitleColor: '#6b7280',
    selectedDayBackgroundColor: '#9333ea',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#9333ea',
    dayTextColor: '#1f2937',
    textDisabledColor: '#d1d5db',
    dotColor: '#9333ea',
    selectedDotColor: '#ffffff',
    arrowColor: '#9333ea',
    monthTextColor: '#1f2937',
    indicatorColor: '#9333ea',
    textDayFontWeight: '400',
    textMonthFontWeight: '600',
    textDayHeaderFontWeight: '500',
  };

  return (
    <View style={[styles.container, style]}>
      <RNCalendar
        onDayPress={onDayPress}
        markedDates={markedDates}
        theme={theme}
        renderArrow={(direction) => (
          <Icon
            name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
            size={24}
            color="#9333ea"
          />
        )}
        enableSwipeMonths
        hideExtraDays
        firstDay={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export { Calendar }; 