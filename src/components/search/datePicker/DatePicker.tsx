import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './DatePicker.styles';

interface DatePickerProps {
  value?: string;
  onChange: (date: string | undefined) => void;
  placeholder?: string;
  minimumDate?: Date;
}

const DatePicker = ({
  value,
  onChange,
  placeholder = 'Tarih seçin',
  minimumDate = new Date(),
}: DatePickerProps) => {
  const [show, setShow] = useState(false);

  const currentDate = value ? new Date(value) : new Date();

  const handleChange = (_: unknown, selectedDate?: Date) => {
    setShow(Platform.OS === 'ios');
    if (selectedDate) {
      onChange(selectedDate.toISOString().split('T')[0]);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Button
          mode="outlined"
          onPress={() => setShow(true)}
          style={styles.button}
        >
          {value ? formatDate(value) : placeholder}
        </Button>
        {value && (
          <Button mode="text" onPress={() => onChange(undefined)}>
            Temizle
          </Button>
        )}
      </View>

      {show && (
        <DateTimePicker
          value={currentDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          minimumDate={minimumDate}
        />
      )}
    </View>
  );
};

export default DatePicker;
