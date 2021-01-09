/*

  This is a linechart component from react-native-chart-kit

  It takes in the data, units and if its should round values
  It returns a styled chart, see the docs for more details on the react-native-chart-kit library

*/

import React from 'react';
import {View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';
import {LineChart} from 'react-native-chart-kit';

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#fff',
  backgroundGradientToOpacity: 0,
  color: () => `rgba(255, 255, 255, 1)`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const LineChartComp = ({data, unit, round}) => {
  return (
    <View>
      <LineChart
        style={{borderRadius: 0}}
        data={{
          labels: ['1:00am', '2:00am', '3:00am'],
          datasets: [{data: data}],
        }}
        width={0.9 * SIZES.width}
        height={Math.max(0.3 * SIZES.height, 250)}
        fromZero={true}
        withDots={false}
        withInnerLines={false}
        withOuterLines={true}
        chartConfig={chartConfig}
        formatYLabel={(xLabel) => {
          if (round) {
            return Math.round(parseFloat(xLabel)) + unit;
          }
          return xLabel + unit;
        }}
        bezier
      />
    </View>
  );
};

export default LineChartComp;
