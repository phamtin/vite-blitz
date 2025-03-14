import { Spin } from "antd";
import { Neutral } from "styles/colors";

const STYLE = {
  div: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 14,
    boxShadow: `0px 1px 6px 2px ${Neutral[200]}`,
  },
};

type LoadingProps = {
  loading: boolean;
  delay?: number;
  size?: "small" | "default" | "large";
};

const Loading = (props: LoadingProps) => {
  const { loading = false, delay = 2000, size = "large" } = props;

  if (!loading) return <></>;

  return (
    <div style={STYLE.div}>
      <Spin size={size} delay={delay} style={STYLE.spinner} />
    </div>
  );
};

export default Loading;
