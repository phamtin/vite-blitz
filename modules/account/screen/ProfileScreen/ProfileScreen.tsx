import { Button, Flex, Typography } from "antd";

const ProfileScreen = () => {
  const onHandleLogin = () => {
    console.log("handle login");
  };

  return (
    <Flex align="center" justify="center" vertical>
      <Typography.Title level={2} style={{ paddingLeft: 6, paddingBottom: 6 }}>
        Welcome back 👏
      </Typography.Title>
      <Typography.Paragraph>Signin to save the world</Typography.Paragraph>
      <Flex vertical gap={20}>
        <Button type="primary" onClick={onHandleLogin}>
          Signin with Google
        </Button>
        <Button onClick={onHandleLogin}>Signin with Google</Button>
        <Button type="text" onClick={onHandleLogin}>
          Signin with Google
        </Button>
        <Button type="link" onClick={onHandleLogin}>
          Signin with Google
        </Button>
        <Button type="dashed" onClick={onHandleLogin}>
          Signin with Google
        </Button>
        <Button ghost onClick={onHandleLogin}>
          Signin with Google
        </Button>
      </Flex>
    </Flex>
  );
};

export default ProfileScreen;
