import type { FolderModel } from 'modules/folder/types/folder.types';
import { TaskModel } from 'modules/tasks/types/task.types';
import FolderTabCalendar from './FolderTabCalendar/FolderTabCalendar';
import FolderTabFile from './FolderTabFile/FolderTabFile';
import FolderTabOverview from './FolderTabOverview/FolderTabOverview';
import FolderTabTask from './FolderTabTask/FolderTabTask';
import useStyles from './styled';

interface FolderDetailTabProps {
	tabkey: 'overview' | 'task' | 'calendar' | 'file';
  folder: FolderModel;
  tasks?: TaskModel[]
}

const FolderDetailTab = (props: FolderDetailTabProps) => {
  const { tabkey, folder, tasks } = props;

  const { styles } = useStyles();
  let tab = <FolderTabOverview folder={folder} tasks={tasks} />;

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
