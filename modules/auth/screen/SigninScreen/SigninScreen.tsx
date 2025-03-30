import { useMutation } from "@tanstack/react-query";
import { Button, Divider, Flex, Form, Image, Input, Typography } from "antd";
import api from "api/api";
import useAppState from "store";
import useStyles from "./styled";
type FieldType = {
  username?: string;
  password?: string;
};
interface GoogleUserData {
  email: string;
  fullname: string;
  firstname: string;
  lastname: string;
  avatar: string;
}
const SigninScreen = () => {
  const { styles } = useStyles();
  const setCurrentUser = useAppState((state) => state.setCurrentUser);

  const onHandleLogin = () => { };

  const mutationLoginWithGoogle = useMutation({
    mutationFn: (userData: GoogleUserData) => {
      return api.post("auth/signin/google", { json: userData }).json();
    },
  });

  const onHandleLoginWithGoogle = () => {
    mutationLoginWithGoogle.mutate(
      {
        email: "tngoc24012@gmail.com",
        fullname: "Ngoc Tong",
        firstname: "Ngoc",
        lastname: "Tong",
        avatar: "https://lh3.googleusercontent.com/a/ACg8ocJ9HGTDkz4C71NSR3KZyzNxwqa75DiQQsOa_N6OLDLXltXO=s120",
      },
      {
        onSuccess: (data: any) => {
          const { jwt, accountSettings, profileInfo } = data.data
          setCurrentUser({ jwt, accountSettings, profileInfo })
          window.location.reload()
        },
        onError: (error) => {
          console.error("Login google failed", error);
        },
      }
    );
  };

  return (
    <Flex
      align="center"
      justify="center"
      className={styles.container}
      gap={50}
    >
      <div className={styles.content}>
        <div>
          <Typography.Title level={1} className={styles.title}>
            Welcome back 👏
          </Typography.Title>
          <Typography.Paragraph className={styles.title}>
            Need an account?
            <Button
              type="link"
            >
              Sign up
            </Button>
          </Typography.Paragraph>
          <Form
            name="basic"
            layout={"vertical"}
            size="large"
            labelCol={{ style: { fontWeight: "bold" } }}
          >
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
              style={{ marginBottom: 15 }}
            >
              <Input placeholder="E.g., user@example.com" aria-label="Username" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
              <Button
                size="large"
                className={styles.btn}
                color="default"
                variant="solid"
                onClick={onHandleLogin}
              >
                Login
              </Button>
            </Form.Item>

            <Divider>or</Divider>

          </Form>
          <Button
            size="large"
            className={styles.btn}
            onClick={onHandleLoginWithGoogle}
          >
            Sign in with Google
          </Button>
        </div>
      </div>

      <div className={styles.image}>
        <Image src="https://plus.unsplash.com/premium_photo-1674675646998-3711d9793728?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGFzayUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D" height={"90vh"} width={"80%"} preview={false} />
      </div>
    </Flex>
  );
};

export default SigninScreen;
