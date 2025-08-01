import { EllipsisVerticalIcon, PencilIcon, TagIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Avatar, Button, Card, Dropdown, Flex, MenuProps, message, Tooltip, Typography } from "antd"
import { GetMyFoldersResponse } from 'hooks/queryAppData/type'
import { FolderIcon } from "icons/FolderIcon"
import ProfileApi from "modules/account/api/profile.api"
import { FolderModel } from "modules/folder/types/folder.types"
import { useState } from "react"
import useAppState from "store"
import { Neutral, Red } from "styles/colors"
import DeleteFolderModal from "./DeleteFolderModal/DeleteFolderModal"
import useStyles from "./styled"
interface FolderOverviewItemProps {
  folder: GetMyFoldersResponse
}

const FolderOverviewItem = (props: FolderOverviewItemProps) => {
  const {styles} = useStyles()
  const { folder } = props
  const pinnedFolderIds = useAppState((state) => state.auth.currentLoggedInUser?.accountSettings.pinnedFolderIds)
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
  const {mutationUpdateProfileInfo} = ProfileApi.useUpdateProfile()
  const renderMemberAvatars = (folder: FolderModel) => {
      if (!folder) return [];
  
      const owner = folder.participantInfo.owner.profileInfo;
      const members = folder.participantInfo.members.map(
        (m) => m.profileInfo,
      );
      return [owner, ...members].map((m) => (
        <Tooltip key={m.username} title={m.username}>
          <Avatar src={m.avatar} />
        </Tooltip>
      ));
  };

  const isPinned = () => {
    return pinnedFolderIds?.includes(folder.folder._id);
  }

  const handlePinnedFolder = () => {
    let newPinnedFolderIds
    if (isPinned()) {
      newPinnedFolderIds = pinnedFolderIds?.filter(p => p !== folder.folder._id)
    } else {
      newPinnedFolderIds = [...pinnedFolderIds!, folder.folder._id]
    }

    mutationUpdateProfileInfo.mutate({
      accountSettings: {
        pinnedFolderIds: newPinnedFolderIds!
      }
    }, {
      onSuccess: () => {
        if (isPinned()) {
          message.success('Unpinned successfully')
        } else {
          message.success("Pinned successfully")
        }
      },
      onError: (error) => {
        console.error('Failed to update pinned folders:', error);
        message.error('Something went wrong. Please try again.');
      }
    })
  }

  const items: MenuProps['items'] = [
  {
    label: (
      <Flex align="center">
        <TagIcon className={styles.iconDropdown} />

                <Typography.Text>Tags</Typography.Text>

      </Flex>
    ),
    key: 'tags',
    },
  {
    type: 'divider',
  },
  {
    label: (
      <Flex align="center">
        <img src="/icons/pin.svg" className={styles.iconDropdown} />
        <Typography.Text>{isPinned() ? "Unpin" : "Pin" }</Typography.Text>
      </Flex>
    ),
    key: 'pin',
  },
  {
    type: 'divider',
  },
  {
    label: (
      <Flex align="center">
        <PencilIcon className={styles.iconDropdown}/>
        <Typography.Text>Edit</Typography.Text>
      </Flex>
    ),
    key: 'edit',
  },
  {
    type: 'divider',
  },
  {
    label: (
       <Flex align="center">
        <TrashIcon color={Red[600]} className={styles.iconDropdown} />
        <Typography.Text>Delete</Typography.Text>
      </Flex>
    ),
    key: 'delete',
  },
  ];
  
  return (
    <div className={styles.card}>
    <Card>
        <FolderIcon width="100" height="100" color={folder.folder.folderInfo.color} />
        <Dropdown menu={{
          items,
          onClick: ({key}) => {
            switch (key) {
              case "pin":
                handlePinnedFolder()
                return
              case "delete":
                setIsOpenModalDelete(true)
              default: 
                return  
            }
          }
        }}
          trigger={['click']} placement="bottomRight">
          <Button shape="default"
							type="text"
            className={styles.buttonDropdown}
            icon={
            
              <EllipsisVerticalIcon width={20} color={Neutral[500]} />
          }
          />
  </Dropdown>
      </Card>
      <Flex justify="space-between" align="center" className={styles.folderInfo}>

      <Typography.Title level={5}>{folder.folder.folderInfo.title}</Typography.Title>
      <Avatar.Group
                max={{
                  count: 3,
                }}
                >
                {renderMemberAvatars(folder.folder)}
              </Avatar.Group>
      </Flex>
      
      <DeleteFolderModal id={folder.folder._id} isModalOpen={isOpenModalDelete} handleCancel={() => setIsOpenModalDelete(false) } />
    </div>
  )
}

export default FolderOverviewItem


