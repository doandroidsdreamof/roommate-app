import React from 'react';
import { View } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Text, useTheme } from 'react-native-paper';
import { createStyles } from './RangeSlider.styles';

interface CommonProps {
  min: number;
  max: number;
  step?: number;
  formatLabel?: (value: number) => string;
}

interface SingleModeProps extends CommonProps {
  isSingle: true;
  value: number;
  onValueChange: (value: number) => void;

  lowValue?: never;
  highValue?: never;
  onLowChange?: never;
  onHighChange?: never;
}

interface RangeModeProps extends CommonProps {
  isSingle?: false;
  lowValue: number;
  highValue: number;
  onLowChange: (value: number) => void;
  onHighChange: (value: number) => void;

  value?: never;
  onValueChange?: never;
}

type SliderProps = SingleModeProps | RangeModeProps;

const RangeSlider = (props: SliderProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const formatLabel = props.formatLabel || ((val) => String(val));

  const handleValuesChange = (values: number[]) => {
    if (props.isSingle) {
      if (values[0] !== props.value) {
        props.onValueChange(values[0]);
      }
    } else {
      if (values[0] !== props.lowValue) props.onLowChange(values[0]);
      if (values[1] !== props.highValue) props.onHighChange(values[1]);
    }
  };

  const sliderValues = props.isSingle
    ? [props.value]
    : [props.lowValue, props.highValue];

  return (
    <View style={styles.container}>
      <View style={styles.labelsContainer}>
        {props.isSingle ? (
          <Text variant="bodyMedium">{formatLabel(props.value)}</Text>
        ) : (
          <>
            <Text variant="bodyMedium">{formatLabel(props.lowValue)}</Text>
            <Text variant="bodyMedium">{formatLabel(props.highValue)}</Text>
          </>
        )}
      </View>

      <MultiSlider
        values={sliderValues}
        min={props.min}
        max={props.max}
        step={props.step || 1}
        onValuesChange={handleValuesChange}
        selectedStyle={styles.selectedTrack}
        unselectedStyle={styles.unselectedTrack}
        markerStyle={styles.marker}
        pressedMarkerStyle={styles.pressedMarker}
        containerStyle={styles.sliderContainer}
        trackStyle={styles.track}
        sliderLength={280}
        snapped
      />
    </View>
  );
};

export default RangeSlider;
