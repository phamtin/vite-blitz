import { BellIcon, ChatBubbleLeftEllipsisIcon, Cog6ToothIcon, ComputerDesktopIcon, MicrophoneIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  Flex,
  Tabs,
  TabsProps
} from "antd";
import Modal from "components/core/Modal/Modal";
import ProfileDetails from "../../components/ProfileDetails/ProfileDetails";
import useStyles from "./profileSettings.style";
type ProfileSettingsProps = {
  isModalOpen: boolean
  handleCancel: () => void
}
const items: TabsProps['items'] = [
  {
    label: <Flex align="center">
      <UserIcon style={{ width: 18, height: 18, marginRight: 8 }} />
      Profile
    </Flex>,
    key: 'profile',
    children: <ProfileDetails />,
  },
  {
    label: <Flex align="center">
      <Cog6ToothIcon style={{ width: 18, height: 18, marginRight: 8 }} />
      Account
    </Flex>,
    key: 'account',
    children: <div>Content of tab Account</div>,
  },
  {
    label: <Flex align="center">
      <ChatBubbleLeftEllipsisIcon style={{ width: 18, height: 18, marginRight: 8 }} />
      Chat
    </Flex>,
    key: 'chat',
    children: <div>Content of tab Chat</div>,
  },
  {
    label: (
      <Flex align="center">
        <MicrophoneIcon style={{ width: 18, height: 18, marginRight: 8 }} />
        Voice & Video
      </Flex>
    ),
    key: "voice-video",
    children: <div>Content of tab Voice & Video</div>,
  },
  {
    label: (
      <Flex align="center">
        <ComputerDesktopIcon style={{ width: 18, height: 18, marginRight: 8 }} />
        Appearance
      </Flex>
    ),
    key: "appearance",
    children: <div>Content of tab Appearance</div>,
  },
  {
    label: (
      <Flex align="center">
        <BellIcon style={{ width: 18, height: 18, marginRight: 8 }} />
        Notification
      </Flex>
    ),
    key: "notification",
    children: <div>Content of tab Notification</div>,
  },
];

const ProfileSettings = ({ isModalOpen, handleCancel }: ProfileSettingsProps) => {
  const { styles } = useStyles();

  return (
    <div className={styles.wrapper}>
      <Modal
        width={750}
        title="Settings"
        open={isModalOpen}
        destroyOnHidden
        onCancel={handleCancel}
        footer={null}
      >
        <Tabs
          tabPosition={'left'}
          className={styles.tabs}
          items={items}
        />
      </Modal>
    </div>
  );
};

export default ProfileSettings
