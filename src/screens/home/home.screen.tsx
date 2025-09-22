import { CustomText } from "@components/ui";
import { View } from "@gluestack-ui/themed";
import React from "react";
import { View as RNView, Text as RNText } from "react-native";
import { HomeProps } from "./interface";
import { PhoneSvg } from "@svgs";
import CustomPieChart from "@components/CustomPieChart";

const HomeScreen: HomeProps = ({ navigation, route }) => {
  // Example with 6 items (dynamic - can be any number)
  const pieData = [
    {
      value: 49,
      color: "#E8B86D", // Light orange
      label: "Withdraw",
      amount: "₦10,000,000",
    },
    {
      value: 1,
      color: "#D4A356", // Medium orange
      label: "Transfer",
      amount: "₦8,500,000.00",
    },
    {
      value: 49,
      color: "#C4943F", // Dark orange
      label: "Bills",
      amount: "₦6,000,000",
    },
    {
      value: 1,
      color: "#B58528", // Darker orange
      label: "Shopping",
      amount: "₦3,000,000.00",
    },
    // {
    //   value: 8,
    //   color: "#A67611", // Even darker
    //   label: "Investment",
    //   amount: "₦2,400,000.00",
    // },
    // {
    //   value: 7,
    //   color: "#976700", // Darkest
    //   label: "Savings",
    //   amount: "₦2,100,000.00",
    // },
  ];

  return (
    <View
      flex={1}
      backgroundColor="white"
      alignItems="center"
      // justifyContent="center"
    >
      {/* Title */}

      {/* Custom Pie Chart - now with thicker radius and better label visibility */}
      <View style={{ marginHorizontal: 20 }}>
        <CustomPieChart
          data={pieData}
          size={160}
          strokeWidth={45} // This makes the chart thicker/fatter
          showLabels={true}
          labelDistance={60}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
