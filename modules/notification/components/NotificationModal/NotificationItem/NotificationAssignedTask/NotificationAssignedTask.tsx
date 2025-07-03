import { Avatar, Flex, Typography } from 'antd';
import dayjs from 'dayjs';
import DotIcon from 'icons/DotIcon';
import type { NotificationAssignedTaskForYou } from 'modules/notification/types/notification.types';
import { Red } from 'styles/colors';
import { truncateText } from 'utils/truncateText';
import useStyles from '../../notification.style';

const { Text } = Typography;
type NotificationAssignedTaskItemProps = {
  item: NotificationAssignedTaskForYou;
  handleMarkAsRead: (item: NotificationAssignedTaskForYou) => void;
};
const NotificationAssignedTaskItem = ({
  item,
  handleMarkAsRead,
}: NotificationAssignedTaskItemProps) => {
  const { styles } = useStyles();

  return (
    <Flex className={styles.notiItem} onClick={() => handleMarkAsRead(item)}>
      <Avatar src={<img src={item.payload.assignerAvatar || undefined} alt="avatar" />} />
      <Flex vertical style={{ flex: 1 }}>
        <Text>
          <Text strong>{item.payload.assignerUsername}</Text> assigned you to{' '}
          <Text strong>{truncateText(item.payload.title, 60)}</Text>
        </Text>

        <Text>{dayjs.utc(`${item.createdAt}`).local().format('ddd h:mm A')}</Text>
      </Flex>
      <Flex vertical gap={10} align="end">
        {!item.read && <DotIcon color={Red[400]} />}
        <span>{dayjs(`${item.createdAt}`).fromNow()}</span>
      </Flex>
    </Flex>
  );
};

export default NotificationAssignedTaskItem;
