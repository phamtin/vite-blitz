import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import {
  CalendarIcon,
  CircleStackIcon,
  DocumentIcon,
  FolderIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from '@tanstack/react-router';
import { Button, Flex, Tabs, Tag, Typography } from 'antd';
import FolderApi from 'modules/folder/api/folder.api';
import FolderDetailTab from 'modules/folder/components/FolderDetailTab/FolderDetailTab';
import type {
  ExtendFolderModel,
  FolderModel,
} from 'modules/folder/types/folder.types';
import TaskApi from 'modules/tasks/api/task.api';
import { TASK_FIELDS } from 'modules/tasks/constants/task.constant';
import type { TaskModel } from 'modules/tasks/types/task.types';
import { useState } from 'react';
import { Neutral } from 'styles/colors';
import useStyles from './styled';

const { Title, Text } = Typography;
interface FolderDetailScreenProps {
	folderId: string;
}

const FolderDetailScreen = (props: FolderDetailScreenProps) => {
	const { folderId } = props;
	const { styles } = useStyles();
	const navigate = useNavigate();

	const [query, setQuery] = useState('');

	const { data } = FolderApi.useGetFolderById<
		{ folder: FolderModel } & ExtendFolderModel
	>(folderId);
	const useGetTasks = TaskApi.useGetTasks({
		folderIds: [folderId],
		query,
		fields: TASK_FIELDS.Overview,
	});

  const tasks = useGetTasks.data || ([] as TaskModel[]);

	const goBackAllFolders = () => {
		return navigate({ to: '/folders', replace: true });
	};

	if (!data) return null;
	const folder = data.folder;

	return (
		<div className={styles.wrapper}>
			<Flex gap={10} onClick={goBackAllFolders}>
				<Button size="small" variant="outlined">
					<ChevronLeftIcon width={20} style={{ color: Neutral[500] }} />
				</Button>
				<Text strong>All Folders</Text>
			</Flex>

			<Flex gap={10} align="center" className={styles.folderTitle}>
				<Title level={3}>{folder.folderInfo.title}</Title>
				{folder.folderInfo.isDefaultFolder && <Tag>Default folder</Tag>}
			</Flex>

			<Flex className={styles.tabs}>
				<Tabs
					items={[
            {
              key: '1',
              label: 'Overview',
              children: <FolderDetailTab tabkey="overview" folder={folder} tasks={tasks} />,
							icon: <CircleStackIcon width={16} style={{ marginBottom: -2 }} />,
						},
						{
							key: '2',
							label: 'Tasks',
							children: <FolderDetailTab tabkey="task" folder={folder} />,
							icon: <DocumentIcon width={16} style={{ marginBottom: -2 }} />,
						},
						{
							key: '3',
							label: 'Calendar',
							children: <FolderDetailTab tabkey="calendar" folder={folder} />,
							icon: <CalendarIcon width={16} style={{ marginBottom: -2 }} />,
						},
						{
							key: '4',
							label: 'Files',
							children: <FolderDetailTab tabkey="file" folder={folder} />,
							icon: <FolderIcon width={16} style={{ marginBottom: -2 }} />,
						},
					]}
				/>
			</Flex>
		</div>
	);
};

export default FolderDetailScreen;
