import { Avatar, Descriptions, Flex, Space, Tooltip, Typography } from 'antd';
import WhiteBox from 'components/WhiteBox/WhiteBox';
import { FolderModel } from 'modules/folder/types/folder.types';
import { DescriptionText } from '../FolderTabOverview';
import useStyles from '../styled';
const { Text } = Typography;
interface OwnerAndAccessBoxProps {
  folder: FolderModel;
}

const OwnerAndAccessBox = (props: OwnerAndAccessBoxProps) => {
  const { folder } = props;
	const { styles } = useStyles()
  const { folderInfo, participantInfo } = folder

    const renderMembers = (participantInfo: FolderModel['participantInfo']) => {
      if (!participantInfo) return '';
      const { members } = participantInfo;
      if (!members.length)
        return (
          <Text type="secondary" italic>
            no member
          </Text>
        );
      return (
        <Avatar.Group>
          {members.map((member) => (
            <Tooltip key={member._id} title={member.profileInfo.username}>
              <Avatar src={member.profileInfo.avatar} />
            </Tooltip>
          ))}
        </Avatar.Group>
      );
  };
  
  
  return (
    <WhiteBox>
        <Descriptions.Item label="Title">
						<DescriptionText text={"Owner and access"} />
          </Descriptions.Item>
          
          <Flex justify='space-between' align='center' className={styles.owner}>
            <Space>
              <Avatar src={participantInfo.owner.profileInfo.avatar} alt="avatar" size={40} />
              <Text>
                <Text strong className='username'>{participantInfo.owner.profileInfo.username}</Text>
                <br />
                <Text className='email'>{participantInfo.owner.profileInfo.email}</Text>
              </Text>
            </Space>
            <span>Owner</span>
          </Flex>
          
          <Descriptions column={2} style={{paddingTop: '5px'}}>
            <Descriptions.Item label="Status">
                {folderInfo.status }
            </Descriptions.Item>
            <Descriptions.Item label="Members">
              {renderMembers(participantInfo)}
            </Descriptions.Item>
          </Descriptions>
        </WhiteBox>
  )
}

export default OwnerAndAccessBox
