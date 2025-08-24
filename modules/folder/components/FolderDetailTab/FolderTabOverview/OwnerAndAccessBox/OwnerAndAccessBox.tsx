import { PlusIcon } from '@heroicons/react/24/outline';
import { Avatar, Descriptions, Flex, Space, Tooltip, Typography } from 'antd';
import WhiteBox from 'components/WhiteBox/WhiteBox';
import { FolderModel } from 'modules/folder/types/folder.types';
import { useState } from 'react';
import useAppState from 'store';
import { DescriptionText } from '../FolderTabOverview';
import AddMemberModal from './AddMemberModal/AddMemberModal';
const { Text } = Typography;
interface OwnerAndAccessBoxProps {
  folder: FolderModel;
}

const OwnerAndAccessBox = (props: OwnerAndAccessBoxProps) => {
  const { folder } = props;
  const { participantInfo } = folder
  const { members } = participantInfo;

  const currentLoggedInUser = useAppState((state) => state.auth.currentLoggedInUser)

  const isOwnerProject = currentLoggedInUser?.profileInfo.email === participantInfo.owner.profileInfo.email
  
  const [isOpenAddMemberModal, setIsOpenAddMemberModal] = useState(false)
  const addMemberButton = () => {
    return (
      <>
        {isOwnerProject &&
        <Tooltip title="Add member">
          <Avatar
          style={{
            marginLeft: members.length > 0 ? '-10px' : '0'
          }}
          icon={<PlusIcon width={18} height={18} color='#fff' />}
              onClick={() => setIsOpenAddMemberModal(true)}
              className='addMemberBtn'
          />
          </Tooltip>
        }
      </>
    )
  }

    const renderMembers = (participantInfo: FolderModel['participantInfo']) => {
      if (!participantInfo) return '';
      if (!members.length)
        return (
          addMemberButton()
        );
      return (
        <Flex>
          <Avatar.Group size={'default'} max={{count: 5}}>
            {members.map((member, index) => (
              <Tooltip key={member._id} title={member.profileInfo.username}>
                <Avatar
                  src={member.profileInfo.avatar}
                  style={{ marginLeft: index === 0 ? 0 : -15 }}
                />
              </Tooltip>
            ))}
          </Avatar.Group>
            {addMemberButton()}
        </Flex>
      );
  };
  
  return (
    <WhiteBox>
        <Descriptions.Item label="Title">
						<DescriptionText text={"Owner and access"} />
          </Descriptions.Item>
          
          <Flex justify='space-between' align='center' className="owner">
            <Space>
              <Avatar src={participantInfo.owner.profileInfo.avatar} alt="avatar" size={40} />
              <Text>
            <Text strong className='username'>
              {participantInfo.owner.profileInfo.username} 
              {isOwnerProject ? ' (You)' : ''}
            </Text>
                <br />
                <Text className='email'>{participantInfo.owner.profileInfo.email}</Text>
              </Text>
            </Space>
            <span>Owner</span>
          </Flex>
          
          <Descriptions column={2} style={{paddingTop: '5px'}}>
            <Descriptions.Item label="Members">
              {renderMembers(participantInfo)}
            </Descriptions.Item>
          </Descriptions>
      <AddMemberModal
        isModalOpen={isOpenAddMemberModal}
        handleCancel={() => setIsOpenAddMemberModal(false)}
        participantInfo={participantInfo}
        folderId={folder._id}
      />
        </WhiteBox>
  )
}

export default OwnerAndAccessBox
