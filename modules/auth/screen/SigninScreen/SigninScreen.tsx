import { Button, Divider, Flex, Form, Image, Input, Typography } from "antd";
import useStyles from "./styled";
import GoogleAuthBtn from "modules/auth/components/GoogleAuth/GoogleAuthBtn";

type FieldType = {
	username?: string;
	password?: string;
};

const SigninScreen = () => {
	const { styles } = useStyles();

	return (
		<Flex align="center" justify="center" className={styles.container} gap={50}>
			<div className={styles.content}>
				<div>
					<Typography.Title level={1} className={styles.title}>
						Welcome back 👏
					</Typography.Title>
					<Typography.Paragraph className={styles.title}>
						Need an account?
						<Button type="link">Sign up</Button>
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
							rules={[{ required: true, message: "Please input your username!" }]}
							style={{ marginBottom: 15 }}
						>
							<Input
								size="large"
								placeholder="E.g., user@example.com"
								aria-label="Username"
							/>
						</Form.Item>

						<Form.Item<FieldType>
							label="Password"
							name="password"
							rules={[{ required: true, message: "Please input your password!" }]}
						>
							<Input.Password size="large" />
						</Form.Item>

						<Form.Item label={null}>
							<Button
								size="large"
								className={styles.btn}
								color="default"
								variant="solid"
								onClick={() => {}}
							>
								Login
							</Button>
						</Form.Item>

						<Divider>or</Divider>
					</Form>
					<GoogleAuthBtn />
				</div>
			</div>

			<div className={styles.image}>
				<Image
					src="https://plus.unsplash.com/premium_photo-1674675646998-3711d9793728?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGFzayUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D"
					height={"90vh"}
					width={"80%"}
					preview={false}
				/>
			</div>
		</Flex>
	);
};

export default SigninScreen;
