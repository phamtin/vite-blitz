import { useDebounceFn } from "ahooks";
import { Avatar, Button, Flex, Form, Input } from "antd";
import ProfileApi from "modules/account/api/profile.api";
import type { UpdateProfileInitialValues } from "modules/account/types/account.types";
import {
	nameRules,
	phoneNumberRules,
} from "modules/account/validation/updateProfile";
import { useState } from "react";
import useAppState from "store";
import useStyles from "../../screen/ProfileSettings/profileSettings.style";

const ProfileDetails = () => {
	const { styles } = useStyles();
	const [form] = Form.useForm();
	const currentLoggedInUser = useAppState((state) => state.auth.currentLoggedInUser);
	const profileInfo = currentLoggedInUser?.profileInfo;
	const [isValueChanged, setIsValueChanged] = useState(false);
	const [hasError, setHasError] = useState(false);

	const initialValues: UpdateProfileInitialValues = {
		firstname: profileInfo?.firstname,
		lastname: profileInfo?.lastname,
		username: profileInfo?.username,
		phoneNumber: profileInfo?.phoneNumber,
	};

	const { mutationUpdateProfileInfo } = ProfileApi.useUpdateProfile(() => {
		setIsValueChanged(false);
	});

	const handleSubmit = () => {
		const values = form.getFieldsValue();
		mutationUpdateProfileInfo.mutate({
			profileInfo: values,
		});
	};

	const checkIsChanged = () => {
		const currentValues = form.getFieldsValue();
		for (const key in initialValues) {
			const typedKey = key as keyof UpdateProfileInitialValues;
			if (initialValues[typedKey] !== currentValues[typedKey]) {
				return true;
			}
		}
		return false;
	};

	const { run: debouncedOnValuesChange } = useDebounceFn(
		() => {
			onCheckValidFields();
			setIsValueChanged(checkIsChanged());
		},
		{ wait: 200 },
	);

	const onCheckValidFields = async () => {
		const errList = form.getFieldsError();
		const isError = errList.some((field) => field.errors.length > 0);
		setHasError(isError);
	};

	const checkKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const isNumber = e.key >= "0" && e.key <= "9";
		const isBackspaceOrDelete = [
			"Backspace",
			"Delete",
			"ArrowLeft",
			"ArrowRight",
		].includes(e.key);
		if (!isNumber && !isBackspaceOrDelete) {
			e.preventDefault();
		}
	};

	const isPending = mutationUpdateProfileInfo.isPending;
	const isDisabled = hasError || !isValueChanged || isPending;

	return (
		<Form
			layout={"vertical"}
			form={form}
			initialValues={initialValues}
			className={styles.wrapper}
			onValuesChange={debouncedOnValuesChange}
		>
			<Form.Item label="Avatar">
				<Flex vertical gap="small">
					<div>
						<Avatar shape="circle" size="large" src={profileInfo?.avatar} />
						<Button type="link">Change picture</Button>
					</div>
				</Flex>
			</Form.Item>

			<Form.Item name="username" label="Username" rules={nameRules}>
				<Input placeholder="Enter your username" maxLength={10} />
			</Form.Item>

			<Flex justify="space-between">
				<Form.Item
					name="firstname"
					label="First name"
					className={styles.flexItem}
					rules={nameRules}
				>
					<Input placeholder="Enter your first name" maxLength={10} />
				</Form.Item>

				<Form.Item
					name="lastname"
					label="Last name"
					className={styles.flexItem}
					rules={nameRules}
				>
					<Input placeholder="Enter your last name" maxLength={10} />
				</Form.Item>
			</Flex>

			<Form.Item label="Email">
				<Input disabled value={profileInfo?.email} />
			</Form.Item>

			<Form.Item name="phoneNumber" label="Phone number" rules={phoneNumberRules}>
				<Input
					placeholder="Enter your phone number"
					maxLength={10}
					onKeyDown={checkKeyDown}
				/>
			</Form.Item>
			<Form.Item className={styles.btnForm}>
				<Button
					className={styles.btnWidth}
					type="primary"
					onClick={handleSubmit}
					disabled={isDisabled}
				>
					{isPending ? "Loading..." : "Save changes"}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default ProfileDetails;
