import { Flex, Typography } from "antd";
import "./style.css";

const SplashScreen = () => {
  return (
    <Flex align="center" justify="center" style={{ height: "100vh" }}>
      <div className="spinner-container">
        <div className="container">
          <span />
          <span />
          <span />
          <span />
        </div>
        <Typography.Title level={5}>Did you meditate today?</Typography.Title>
      </div>
    </Flex>
  );
};

export default SplashScreen;