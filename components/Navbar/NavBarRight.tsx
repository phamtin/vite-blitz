import {
	ArrowUturnLeftIcon,
	BellIcon,
	ChatBubbleBottomCenterIcon,
	Cog6ToothIcon,
	EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";
import {
	Avatar,
	Space,
	Button,
	Dropdown,
	Flex,
	Typography,
	type MenuProps,
} from "antd";
import { useState } from "react";
import useAppState from "store";

const items: MenuProps["items"] = [
	{
		key: "1",
		label: (
			<Flex vertical>
				<Typography.Title level={5}>Tín Phạm</Typography.Title>
				<Typography.Text type="secondary">Entrepreneur</Typography.Text>
			</Flex>
		),
	},
	{
		key: "211",
		type: "divider",
	},
	{
		key: "2",
		label: (
			<Flex align="center">
				<EllipsisHorizontalCircleIcon width={22} />
				<Typography.Text style={{ marginLeft: 8 }}>Settings</Typography.Text>
			</Flex>
		),
	},
	{
		key: "3",
		label: (
			<Flex align="center">
				<ChatBubbleBottomCenterIcon width={20} />
				<Typography.Text style={{ marginLeft: 8 }}>Supports</Typography.Text>
			</Flex>
		),
	},
	{
		key: "logout-div",
		type: "divider",
	},
	{
		key: "logout",
		label: (
			<Flex align="center">
				<ArrowUturnLeftIcon width={20} />
				<Typography.Text style={{ marginLeft: 8 }}>Log out</Typography.Text>
			</Flex>
		),
	},
];

const data: MenuProps["items"] = [
	{
		key: "data0_0",
		label: (
			<Flex vertical>
				<Typography.Title level={5}>Notification</Typography.Title>
			</Flex>
		),
	},
	{
		key: "data0",
		label: (
			<Flex vertical>
				<Typography.Title level={5}>Tín Phạm</Typography.Title>
				<Typography.Text>Racing car sprays burning fuel into crowd.</Typography.Text>
			</Flex>
		),
	},
	{
		key: "data1",
		label: (
			<Flex vertical>
				<Typography.Title level={5}>Tín Phạm</Typography.Title>
				<Typography.Text>
					Australian walks 100km after outback crash.
				</Typography.Text>
			</Flex>
		),
	},
	{
		key: "data2",
		label: (
			<Flex vertical>
				<Typography.Title level={5}>Tín Phạm</Typography.Title>
				<Typography.Text>Man charged over missing wedding girl.</Typography.Text>
			</Flex>
		),
	},
];

type IconActive = "noti" | "setting" | null;

const NavBarRight = () => {
	const logout = useAppState((s) => s.logout);
	const [iconActive, setIconActive] = useState<IconActive>(null);
	const currentLoggedInUser = useAppState((state) => state.auth.currentLoggedInUser);

	const onHandleClickIcon = (icon: IconActive) => {
		setIconActive((prev) => (prev ? (prev !== icon ? icon : null) : icon));
	};

	const handleMenuClick: MenuProps["onClick"] = (info) => {
		if (info.key === "logout") {
			logout();
			window.location.reload();
		}
	};

	return (
		<div className="NavBarRight">
			<Space align="center" size={8}>
				<Dropdown
					overlayStyle={{ width: 400 }}
					menu={{ items: data }}
					placement="bottom"
					arrow={{ pointAtCenter: true }}
					trigger={["click"]}
					onOpenChange={() => onHandleClickIcon("noti")}
				>
					<Button
						shape="circle"
						size="large"
						type="text"
						className={`optionButton ${iconActive === "noti" && "active"}`}
						icon={<BellIcon width={20} />}
					/>
				</Dropdown>

				<Button
					shape="circle"
					size="large"
					type="text"
					className={`optionButton ${iconActive === "setting" && "active"}`}
					icon={<Cog6ToothIcon width={20} />}
					onClick={() => onHandleClickIcon("setting")}
				/>

				<Dropdown
					overlayStyle={{ width: 200 }}
					menu={{ items }}
					placement="bottomRight"
					trigger={["click"]}
				>
					<Flex align="center" className="avaWrapper">
						<Avatar shape="circle" size="large" src="https://i.pravatar.cc/50" />
						<Typography.Text strong style={{ margin: "0 10px" }}>
							{currentLoggedInUser?.profileInfo.fullname || ""}
						</Typography.Text>
					</Flex>
				</Dropdown>
			</Space>
		</div>
	);
};

export default NavBarRight;
