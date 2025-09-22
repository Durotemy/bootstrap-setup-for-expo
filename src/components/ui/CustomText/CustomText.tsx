import { Text } from "@gluestack-ui/themed";
import * as React from "react";
import { Props } from "./interface";
import { fontsMap, text_dark, text_light } from "@constants";

const CustomText: Props = ({
  children,
  weightType = "regular",
  truncateAt,
  underline,
  ...props
}) => {
  let text =
    typeof children === "string" && truncateAt
      ? children.length > truncateAt
        ? `${children.substring(0, truncateAt)}...`
        : children
      : children;

  return (
    <Text
      accessible
      fontFamily={fontsMap[weightType]}
      fontSize={props.fontSize ?? 14}
      underline={underline}
      color={props.color ? props.color : text_dark}
      $dark-color={props["$dark-color"] ? props["$dark-color"] : text_light}
      {...props}
    >
      {text}
    </Text>
  );
};

export default CustomText;
