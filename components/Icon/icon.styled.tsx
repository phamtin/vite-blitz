import { createStyles } from "antd-style";
import type { IconProps } from "./Icon";

const useStyles = createStyles((_, props: IconProps) => {
  const SIZE = {
    small: { width: 28, height: 28 },
    medium: { width: 34, height: 34 },
    large: { width: 48, height: 48 },
  };
  const PADDING = {
    small: 2,
    medium: 7,
    large: 10,
  };

  return {
    wrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: props.color,

      width: SIZE[props.size as keyof typeof SIZE].width,
      height: SIZE[props.size as keyof typeof SIZE].height,
      padding: PADDING[props.size as keyof typeof PADDING],

      backgroundColor: props.background ? `${props.color}25` : "transparent",
      border: props.border ? `1px solid ${props.color}60` : "0",
      borderRadius: props.size === "small" ? "40px" : "80px",
      cursor: props.clickable ? "pointer" : "default",
      "&:hover": {
        backgroundColor: props.clickable ? `${props.color}50` : "transparent",
      },
    },
  };
});

export default useStyles;
