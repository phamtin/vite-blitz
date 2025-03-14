import useStyles from "./task-detail.styled";

type TaskDetailProps = {
  taskId: string;
};

const TaskDetailScreen = (props: TaskDetailProps) => {
  const { styles } = useStyles();
  return <div className={styles.wrapper}>Task Detail Screen</div>;
};

export default TaskDetailScreen;
