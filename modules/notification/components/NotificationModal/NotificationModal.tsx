import { BellOutlined } from '@ant-design/icons';
import {
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import { useNavigate } from '@tanstack/react-router';
import {
  Button,
  List,
  Popover,
  Typography
} from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import utc from 'dayjs/plugin/utc.js';
import NotificationApi from 'modules/notification/api/notification.api';
import { type GetMyNotificationResponse, InviteJoinFolderPayloadStatus, NotificationType } from 'modules/notification/types/notification.types';
import { type Dispatch, useCallback, useMemo, useState } from "react";
import NotificationAssignedTaskItem from './NotificationItem/NotificationAssignedTask/NotificationAssignedTask';
import NotificationInviteJoinFolderItem from './NotificationItem/NotificationInviteJoinFolder/NotificationInviteJoinFolder';
import useStyles from "./notification.style";
type IconActive = "noti" | "setting" | null;
dayjs.extend(utc);
dayjs.extend(relativeTime);

type NotificationModalProps = {
  iconActive: IconActive
  setIconActive: Dispatch<React.SetStateAction<IconActive>>
  onHandleClickIcon: (icon: IconActive) => void
}

const NotificationModal = ({ iconActive, setIconActive, onHandleClickIcon }: NotificationModalProps) => {
  const [openNoti, setOpenNoti] = useState(false);
  const { styles } = useStyles()
  const navigate = useNavigate()
  const { mutationMarkAsRead } = NotificationApi.useMarkAsRead()

  const {
    data = [],
  } = NotificationApi.useGetMyNotification<GetMyNotificationResponse[]>();
  const unreadCount = data.filter(n => !n.read).length;

  const closeNotiModal = useCallback(() => {
    setOpenNoti(false);
    setIconActive(null);
  }, [setIconActive]);

  const handleMarkAsRead = useCallback((item?: GetMyNotificationResponse) => {
    if (!item?.read) {
      mutationMarkAsRead.mutate({
        markAll: !item,
        notificationId: item?._id
      })
    }

    if (item?.type === NotificationType.InviteJoinFolder) {
      if (item?.read && (item.payload.status === InviteJoinFolderPayloadStatus.Expired ||
        item.payload.status === InviteJoinFolderPayloadStatus.Declined)) {
        return
      }

      if (item?.payload.status === InviteJoinFolderPayloadStatus.Accepted || item?.payload.status === InviteJoinFolderPayloadStatus.Active) {
        navigate({ to: "/folders/$folderId", params: { folderId: item.payload.folderId } });
        closeNotiModal()
      }

      return
    }


    if (item?.type === NotificationType.AssignedTaskForYou) {
      navigate({ to: "/tasks/$taskId", params: { taskId: item.payload.taskId } });
      closeNotiModal()
    }
  }, [closeNotiModal, mutationMarkAsRead, navigate])

  const dropdownContent = useMemo(() => (
    <div style={{ width: 450 }}>
      <div className={styles.notiHeader}>
        <Typography.Text strong>Notifications</Typography.Text>
        <Button type="link" size="small" style={{ padding: 0 }}>
          <CheckCircleIcon className={styles.checkCircle} onClick={() => handleMarkAsRead} />
        </Button>
      </div>

      <List
        dataSource={data}
        className={styles.notiList}
        renderItem={(item) => (
          <List.Item className={styles.notiWrapper}>
            {item.type === NotificationType.InviteJoinFolder ? (
              <NotificationInviteJoinFolderItem
                item={item}
                closeNotiModal={closeNotiModal}
                handleMarkAsRead={handleMarkAsRead}
              />
            ) : (
              <NotificationAssignedTaskItem
                item={item}
                handleMarkAsRead={handleMarkAsRead}
              />
            )}
          </List.Item>
        )}
      />
    </div>
  ), [styles, data, handleMarkAsRead, closeNotiModal]);

  return (
    <div>
      <Popover
        content={dropdownContent}
        trigger="click"
        open={openNoti}
        onOpenChange={() => { setOpenNoti(!openNoti); onHandleClickIcon("noti") }}
        placement="bottomLeft"
      >
        <div className={styles.notificationIconWrapper}>
          <Button
            shape="circle"
            size="large"
            type="text"
            className={`optionButton ${iconActive === "noti" ? "active" : ""}`}
            icon={<BellOutlined style={{ fontSize: 18 }} />}
          />
          {unreadCount > 0 && (
            <span className={styles.customBadgeStyle}>{unreadCount}</span>
          )}
        </div>
      </Popover>
    </div>
  )
}

export default NotificationModal
