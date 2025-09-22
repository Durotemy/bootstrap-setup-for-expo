import { Text } from "@gluestack-ui/themed";
import { PropsWithChildren } from "react";

export type WeightType =
  | "thin"
  | "extraLight"
  | "light"
  | "regular"
  | "medium"
  | "semiBold"
  | "bold"
  | "extraBold"
  | "black";

export type Props = React.FC<
  PropsWithChildren<React.ComponentProps<typeof Text>> & {
    weightType?: WeightType;
    truncateAt?: number;
    underline?: boolean;
  }
>;
