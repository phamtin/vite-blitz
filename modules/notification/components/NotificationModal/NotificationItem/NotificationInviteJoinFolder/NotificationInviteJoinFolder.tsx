import { useNavigate } from '@tanstack/react-router';
import { Avatar, Button, Flex, message, Space, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import DotIcon from 'icons/DotIcon';
import NotificationApi from 'modules/notification/api/notification.api';
import { InviteRequestType } from 'modules/notification/constants/notification.constant';
import {
  InviteJoinFolderPayloadStatus,
  type NotificationInviteJoinFolder,
} from 'modules/notification/types/notification.types';
import { Red } from 'styles/colors';
import useStyles from '../../notification.style';

const { Text } = Typography;

type NotificationInviteJoinFolderItemProps = {
  item: NotificationInviteJoinFolder;
  closeNotiModal: () => void;
  handleMarkAsRead: (item: NotificationInviteJoinFolder) => void;
};

const NotificationInviteJoinFolderItem = ({
  item,
  closeNotiModal,
  handleMarkAsRead,
}: NotificationInviteJoinFolderItemProps) => {
  const { styles } = useStyles();
  const { mutationInviteResponse } = NotificationApi.useInviteResponse();
  const navigate = useNavigate();

  const handleInviteResponse = (
    type: InviteRequestType,
    item: NotificationInviteJoinFolder,
  ) => {
    mutationInviteResponse.mutate(
      {
        type: type,
        folderId: item.payload.folderId,
        email: item.payload.inviteeEmail,
      },
      {
        onSuccess: () => {
          if (type === InviteRequestType.ACCEPT) {
            message.success({
              content: (
                <span>
                  You have joined the folder.{' '}
                  <Flex
                    onClick={() =>
                      navigate({
                        to: '/folders/$folderId',
                        params: { folderId: item.payload.folderId },
                      })
                    }
                    style={{
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      color: '#1677ff',
                    }}
                  >
                    View folder here
                  </Flex>
                </span>
              ),
            });
          }
          if (type === InviteRequestType.REJECT) {
            message.info('You have declined the folder invitation.');
          }
          closeNotiModal();
        },
      },
    );
  };

  const invitationStatus = (item: NotificationInviteJoinFolder) => {
    switch (item.payload.status) {
      case InviteJoinFolderPayloadStatus.Expired:
        return (
          <Tag color="orange" className={styles.inviteJoinFolderStatus}>
            This invite has expired.{' '}
          </Tag>
        );

      case InviteJoinFolderPayloadStatus.Active:
        return (
          <Space style={{ marginTop: '20px' }}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleInviteResponse(InviteRequestType.REJECT, item);
              }}
            >
              Decline
            </Button>
            <Button
              color="primary"
              variant="filled"
              onClick={(e) => {
                e.stopPropagation();
                handleInviteResponse(InviteRequestType.ACCEPT, item);
              }}
            >
              Accept
            </Button>
          </Space>
        );

      case InviteJoinFolderPayloadStatus.Accepted:
        return (
          <Tag color="success" className={styles.inviteJoinFolderStatus}>
            Invitation Accepted.{' '}
          </Tag>
        );

      case InviteJoinFolderPayloadStatus.Declined:
        return (
          <Tag color="magenta" className={styles.inviteJoinFolderStatus}>
            Invitation Declined.{' '}
          </Tag>
        );

      default:
        return <></>;
    }
  };
  return (
    <Flex className={styles.notiItem} onClick={() => handleMarkAsRead(item)}>
      <Avatar src={<img src={item.payload.invitorAvatar} alt="avatar" />} />
      <Flex vertical style={{ flex: 1 }}>
        <Text>
          <Text strong>{item.payload.invitorUsername}</Text> invited you to{' '}
          <Text strong>{item.payload.folderName}</Text>
        </Text>

        <Text>{dayjs.utc(`${item.createdAt}`).local().format('ddd h:mm A')}</Text>

        {invitationStatus(item)}
      </Flex>
      <Flex vertical gap={10} align="end">
        {!item.read && <DotIcon color={Red[400]} />}
        <span>{dayjs(`${item.createdAt}`).fromNow()}</span>
      </Flex>
    </Flex>
  );
};

export default NotificationInviteJoinFolderItem;
