// SparkleChart.js
import { Sparkline } from '@mantine/charts';
import { HStack } from "rsuite";

function SparkleChart({ trendData }) {
  // Ensure the trendData prop is provided
  const trendColors = { positive: 'teal.6', negative: 'red.6', neutral: 'gray.5' };

  return (
    <HStack gap="md">
      <Sparkline
        w={242}
        h={60}
        data={trendData}
        trendColors={trendColors}
        fillOpacity={0.2}
      />
    </HStack>
  );
}

export default SparkleChart;
