import { Collapse } from "antd";
import useStyles from "./styled";
import { ACTIVE_STATUSES } from "constants/constants";
import type { CollapseProps } from "antd";

type TaskCollapseProps = {
	tasks?: CollapseProps["items"];
};
const TaskCollapse = (props: TaskCollapseProps) => {
	const { styles } = useStyles();
	const { tasks } = props;

	console.log(tasks);

	return (
		<div className={styles.wrapper}>
			<Collapse
				size="small"
				ghost
				defaultActiveKey={ACTIVE_STATUSES}
				items={tasks}
			/>
		</div>
	);
};

export default TaskCollapse;
