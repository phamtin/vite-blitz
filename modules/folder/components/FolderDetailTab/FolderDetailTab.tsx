import { Flex } from 'antd';
import type { FolderModel } from 'modules/folder/types/folder.types';
import FolderTabCalendar from './FolderTabCalendar/FolderTabCalendar';
import FolderTabFile from './FolderTabFile/FolderTabFile';
import FolderTabOverview from './FolderTabOverview/FolderTabOverview';
import FolderTabTask from './FolderTabTask/FolderTabTask';
import useStyles from './styled';

interface FolderDetailTabProps {
	tabkey: 'overview' | 'task' | 'calendar' | 'file';
	folder: FolderModel;
}

const FolderDetailTab = (props: FolderDetailTabProps) => {
	const { tabkey, folder } = props;

	const { styles } = useStyles();
	let tab = <FolderTabOverview folder={folder} />;

	switch (tabkey) {
		case 'task':
			tab = <FolderTabTask />;
			break;
		case 'calendar':
			tab = <FolderTabCalendar />;
			break;
		case 'file':
			tab = <FolderTabFile />;
			break;
	}

	return <div className={styles.wrapper}>{tab}</div>;
};

export default FolderDetailTab;
