import { Typography } from "antd";
import useStyles from "./inline-task.style";
import { useNavigate } from "@tanstack/react-router";

const { Text } = Typography;

type InlineTaskProps = {
  title: string;
};

const InlineTask = (props: InlineTaskProps) => {
  const { styles } = useStyles();

  const navigate = useNavigate();

  const { title = "" } = props;

  const onHandleClick = () => {
    navigate({ to: "/tasks/$taskId", params: { taskId: "task_1" } });
  };

  return (
    <div
      className={styles.wrapper}
      onClick={onHandleClick}
      onKeyDown={onHandleClick}
    >
      <Text ellipsis strong>
        {title}
      </Text>
    </div>
  );
};

export default InlineTask;
