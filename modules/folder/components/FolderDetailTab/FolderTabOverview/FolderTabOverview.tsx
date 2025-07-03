import { PencilIcon } from '@heroicons/react/24/solid';
import {
	Avatar,
	Button,
	Col,
	Descriptions,
	Flex,
	Row,
	Tooltip,
	Typography,
} from 'antd';
import WhiteBox from 'components/WhiteBox/WhiteBox';
import type { FolderModel } from 'modules/folder/types/folder.types';
import { Neutral } from 'styles/colors';
import useStyles from './styled';

const { Paragraph, Text } = Typography;

interface FolderTabOverviewProps {
	folder: FolderModel;
}

const FolderTabOverview = (props: FolderTabOverviewProps) => {
	const { folder } = props;
	const { styles } = useStyles();
	const { folderInfo, participantInfo } = folder;

	const DescriptionText = ({ text }: { text: string }) => {
		return (
			<Paragraph strong style={{ color: Neutral[700] }} ellipsis={{ rows: 2 }}>
				{text}
			</Paragraph>
		);
	};

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
		<div className={styles.wrapper}>
			<Row gutter={4}>
				<Col xs={8}>
					<WhiteBox>
						<div className={styles.infoViewOnly}>
							<Descriptions
								size="small"
								column={1}
								title={
									<Button shape="circle" className={'editpen'}>
										<PencilIcon width={16} />
									</Button>
								}
							>
								<Descriptions.Item label="Title">
									<DescriptionText text={folderInfo.title} />
								</Descriptions.Item>
								<Descriptions.Item label="Description">
									<DescriptionText text={folderInfo.description || ''} />
								</Descriptions.Item>
								<Descriptions.Item label="Created by">
									<DescriptionText
										text={participantInfo.owner.profileInfo.username}
									/>
								</Descriptions.Item>
								<Descriptions.Item label="Members">
									{renderMembers(participantInfo)}
								</Descriptions.Item>
							</Descriptions>
						</div>
					</WhiteBox>
				</Col>
				<Col xs={8}>
					<WhiteBox>
						<Descriptions size="small" column={1}>
							<Descriptions.Item label="Title">
								<DescriptionText text={folderInfo.title} />
							</Descriptions.Item>
							<Descriptions.Item label="Description">
								<DescriptionText text={folderInfo.description || ''} />
							</Descriptions.Item>
							<Descriptions.Item label="Created by">
								<DescriptionText text={participantInfo.owner.profileInfo.username} />
							</Descriptions.Item>
							<Descriptions.Item label="Members">
								{renderMembers(participantInfo)}
							</Descriptions.Item>
						</Descriptions>
					</WhiteBox>
				</Col>
				<Col xs={8}>
					<WhiteBox>
						<Descriptions size="small" column={1}>
							<Descriptions.Item label="Title">
								<DescriptionText text={folderInfo.title} />
							</Descriptions.Item>
							<Descriptions.Item label="Description">
								<DescriptionText text={folderInfo.description || ''} />
							</Descriptions.Item>
							<Descriptions.Item label="Created by">
								<DescriptionText text={participantInfo.owner.profileInfo.username} />
							</Descriptions.Item>
							<Descriptions.Item label="Members">
								{renderMembers(participantInfo)}
							</Descriptions.Item>
						</Descriptions>
					</WhiteBox>
				</Col>
			</Row>
		</div>
	);
};

export default FolderTabOverview;
