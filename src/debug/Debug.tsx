import { styles } from '@/components/errors/ErrorScreen.styles';
import { useFocusEffect } from '@react-navigation/native';
import { db } from 'db/index';
import { messages } from 'db/schema';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export function Debug() {
  const [data, setData] = useState([]);
  const [totalMessagesCount, setTotalMessagesCount] = useState(0);
  useFocusEffect(
    useCallback(() => {
      try {
        const result = db.select().from(messages).all();
        setData(result as never);
        const total = result.reduce((acc, row) => {
          return acc + (row.content?.length || 0);
        }, 0);

        setTotalMessagesCount(total);
      } catch (error) {
        console.error('Debug fetch failed:', error);
      }
    }, [])
  );

  return (
    <View
      style={[styles.container, { padding: 10, backgroundColor: '#f0f0f0' }]}
    >
      <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>
        Total Messages: {totalMessagesCount}
      </Text>
      <Text variant="labelLarge" style={{ color: 'red' }}>
        DB Debug (Auto-refreshing):
      </Text>
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </View>
  );
}
