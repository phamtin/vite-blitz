import {
  ArrowUturnLeftIcon,
  ChatBubbleBottomCenterIcon,
  Cog6ToothIcon,
  EllipsisHorizontalCircleIcon
} from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  type MenuProps,
  Space,
  Typography,
} from "antd";
import ProfileSettings from "modules/account/screen/ProfileSettings/ProfileSettings";
import NotificationModal from "modules/notification/components/NotificationModal/NotificationModal";
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

type IconActive = "noti" | "setting" | null;

const NavBarRight = () => {
  const logout = useAppState((s) => s.logout);
  const [iconActive, setIconActive] = useState<IconActive>(null);
  const currentLoggedInUser = useAppState((state) => state.auth.currentLoggedInUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onHandleClickIcon = (icon: IconActive) => {
    setIconActive((prev) => (prev ? (prev !== icon ? icon : null) : icon));
  };

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const handleUpdateProfileCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="NavBarRight">
      <Space align="center" size={14}>
        <NotificationModal
          iconActive={iconActive}
          setIconActive={setIconActive}
          onHandleClickIcon={onHandleClickIcon}
        />
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
          menu={{
            items,
            onClick: ({ key }) => {
              switch (key) {
                case "2":
                  setIsModalOpen(true);
                  return;
                case "logout":
                  // handleLogout()
                  return;
                default:
                  return;
              }
            },
          }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Flex align="center" className="avaWrapper">
            <Avatar
              shape="circle"
              size="large"
              alt="avatar"
              src={currentLoggedInUser?.profileInfo.avatar}
            />
            <Typography.Text strong style={{ margin: "0 10px" }}>
              {currentLoggedInUser?.profileInfo.username || ""}
            </Typography.Text>
          </Flex>
        </Dropdown>
      </Space>

      <ProfileSettings isModalOpen={isModalOpen} handleCancel={handleUpdateProfileCancel} />
    </div >
  )
};

export default NavBarRight;
