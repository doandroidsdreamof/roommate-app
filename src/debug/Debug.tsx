import { useFocusEffect } from '@react-navigation/native';
import { db } from 'db/index';
import { messages } from 'db/schema';
import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { createStyles } from './Debug.styles';

export function Debug() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
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
    <View style={styles.container}>
      <Text variant="bodyMedium" style={styles.title}>
        Total Messages: {totalMessagesCount}
      </Text>
      <Text variant="labelLarge" style={styles.label}>
        DB Debug (Auto-refreshing):
      </Text>
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </View>
  );
}
