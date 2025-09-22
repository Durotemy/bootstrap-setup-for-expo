import React from "react";
import { View, Text, Dimensions } from "react-native";
import Svg, { G, Path, Circle, Line, Text as SvgText } from "react-native-svg";

interface PieData {
  value: number;
  color: string;
  label: string;
  amount: string;
}

interface CustomPieChartProps {
  data: PieData[];
  size?: number;
  innerRadius?: number;
  showLabels?: boolean;
  labelDistance?: number;
  strokeWidth?: number;
}

const CustomPieChart: React.FC<CustomPieChartProps> = ({
  data,
  size = 200,
  innerRadius = 40,
  showLabels = true,
  labelDistance = 60,
  strokeWidth = 40,
}) => {
  const { width } = Dimensions.get("window");
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2 - 10; // Leave some padding

  // Make the chart thicker by reducing inner radius relative to outer radius
  const adjustedInnerRadius = radius - strokeWidth;

  // Calculate total value
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Calculate angles for each segment
  let currentAngle = -90; // Start from top
  const segments = data.map((item) => {
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle += angle;

    return {
      ...item,
      startAngle,
      endAngle,
      angle,
    };
  });

  // Helper function to convert degrees to radians
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

  // Helper function to create SVG path for arc
  const createArcPath = (
    centerX: number,
    centerY: number,
    radius: number,
    innerRadius: number,
    startAngle: number,
    endAngle: number
  ) => {
    const startAngleRad = toRadians(startAngle);
    const endAngleRad = toRadians(endAngle);

    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);

    const x3 = centerX + innerRadius * Math.cos(endAngleRad);
    const y3 = centerY + innerRadius * Math.sin(endAngleRad);
    const x4 = centerX + innerRadius * Math.cos(startAngleRad);
    const y4 = centerY + innerRadius * Math.sin(startAngleRad);

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    return `
      M ${x1} ${y1}
      A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
      Z
    `;
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Svg
        width={size + 200}
        height={size + 120}
        viewBox={`0 0 ${size + 200} ${size + 120}`}
      >
        {/* Draw pie segments */}
        {segments.map((segment, index) => {
          const path = createArcPath(
            centerX + 100, // Center the chart in viewBox
            centerY + 60,
            radius,
            adjustedInnerRadius,
            segment.startAngle,
            segment.endAngle
          );

          return (
            <Path
              key={index}
              d={path}
              fill={segment.color}
              stroke="#fff"
              strokeWidth="2"
            />
          );
        })}

        {/* Draw smart directional labels */}
        {showLabels &&
          segments.map((segment, index) => {
            const midAngle = (segment.startAngle + segment.endAngle) / 2;

            // Chart center coordinates
            const chartCenterX = centerX + 100;
            const chartCenterY = centerY + 60;

            // Start point at edge of chart
            const edgeRadius = radius + 5;
            const startX =
              chartCenterX + edgeRadius * Math.cos(toRadians(midAngle));
            const startY =
              chartCenterY + edgeRadius * Math.sin(toRadians(midAngle));

            // Smart directional logic based on slice position
            const lineLength = 25;
            let lineEndX = startX;
            let lineEndY = startY;
            let textAnchor: "start" | "middle" | "end" = "middle";
            let labelX = startX;
            let labelY = startY;

            // Determine direction based on angle quadrant
            if (midAngle >= -45 && midAngle <= 45) {
              // Right side - line goes right
              lineEndX = startX + lineLength;
              lineEndY = startY;
              labelX = lineEndX + 8;
              labelY = lineEndY;
              textAnchor = "start";
            } else if (midAngle > 45 && midAngle <= 135) {
              // Bottom side - line goes down
              lineEndX = startX;
              lineEndY = startY + lineLength;
              labelX = lineEndX;
              labelY = lineEndY + 8;
              textAnchor = "middle";
            } else if (midAngle > 135 || midAngle <= -135) {
              // Left side - line goes left
              lineEndX = startX - lineLength;
              lineEndY = startY;
              labelX = lineEndX - 8;
              labelY = lineEndY;
              textAnchor = "end";
            } else {
              // Top side - line goes up
              lineEndX = startX;
              lineEndY = startY - lineLength;
              labelX = lineEndX;
              labelY = lineEndY - 8;
              textAnchor = "middle";
            }

            return (
              <G key={`label-${index}`}>
                {/* Directional line */}
                <Line
                  x1={startX}
                  y1={startY}
                  x2={lineEndX}
                  y2={lineEndY}
                  stroke="#999"
                  strokeWidth="1"
                />

                {/* Amount text */}
                <SvgText
                  x={labelX}
                  y={labelY - 3}
                  textAnchor={textAnchor}
                  fontSize="13"
                  fontWeight="bold"
                  fill="#000"
                >
                  {segment.amount}
                </SvgText>

                {/* Label text */}
                <SvgText
                  x={labelX}
                  y={labelY + 12}
                  textAnchor={textAnchor}
                  fontSize="11"
                  fill="#666"
                >
                  {segment.label}
                </SvgText>
              </G>
            );
          })}
      </Svg>
    </View>
  );
};

export default CustomPieChart;
