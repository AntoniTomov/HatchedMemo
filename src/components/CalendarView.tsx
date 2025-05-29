import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { format, addDays } from 'date-fns';
import { Card } from './ui/card';

const CalendarView: React.FC = () => {
  const today = new Date();
  const currentDate = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Generate dates for mini calendar (2 days before, today, 2 days after)
  const dates = [-2, -1, 0, 1, 2].map(offset => {
    const date = addDays(today, offset);
    return {
      day: date.getDate(),
      isToday: offset === 0
    };
  });

  return (
    <Card style={styles.container}>
      <Text style={styles.title}>Calendar</Text>
      
      <View style={styles.datesContainer}>
        {dates.map((date, index) => (
          <View 
            key={index}
            style={[
              styles.dateBox,
              date.isToday && styles.todayBox
            ]}
          >
            <Text style={[
              styles.dateText,
              date.isToday && styles.todayText
            ]}>
              {date.day}
            </Text>
          </View>
        ))}
      </View>
      
      <Text style={styles.monthYear}>
        {format(today, 'MMMM yyyy')}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 16,
  },
  datesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dateBox: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  todayBox: {
    borderWidth: 2,
    borderColor: '#8247f5',
  },
  dateText: {
    fontSize: 16,
    color: '#9ca3af',
  },
  todayText: {
    color: '#8247f5',
  },
  monthYear: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default CalendarView; 