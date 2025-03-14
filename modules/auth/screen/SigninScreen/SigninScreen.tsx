import { Button, Flex, Typography } from "antd";

const SigninScreen = () => {
  const onHandleLogin = () => {};

  return (
    <Flex
      align="center"
      justify="center"
      vertical
      style={{ backgroundColor: "#f0f0f0", width: "100vw", height: "100vh" }}
    >
      <Typography.Title level={2} style={{ paddingLeft: 6, paddingBottom: 6 }}>
        Welcome back 👏
      </Typography.Title>
      <Typography.Paragraph>Signin to save the world</Typography.Paragraph>
      <Button
        size="large"
        style={{ marginTop: 6, marginBottom: 90, width: "200px" }}
        onClick={onHandleLogin}
      >
        Signin with Google
      </Button>
    </Flex>
  );
};

export default SigninScreen;
