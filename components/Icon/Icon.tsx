import type { ReactNode } from "react";
import { Blue } from "styles/colors";
import useStyles from "./icon.styled";

export type IconProps = {
  icon?: ReactNode;
  text?: string;
  size?: "small" | "medium" | "large";
  border?: boolean;
  background?: boolean;
  color?: string;
  clickable?: boolean;
};

const Icon = (props: IconProps) => {
  const {
    size = "medium",
    border = false,
    background = true,
    color = Blue[600],
    icon,
    text = "",
    clickable = false,
  } = props;

  const propsWithDefault = {
    size,
    border,
    background,
    color,
    icon,
    text,
    clickable,
  };

  const { styles } = useStyles(propsWithDefault);

  return <div className={styles.wrapper}>{text || icon}</div>;
};

export default Icon;
