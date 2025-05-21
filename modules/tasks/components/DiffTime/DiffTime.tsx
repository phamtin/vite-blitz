import { Flex, Typography } from "antd";
import dayjs from "dayjs";
import type { TaskModel } from "modules/tasks/types/task.types";
import { ExclamationCircleIcon, ClockIcon } from "@heroicons/react/24/outline";
import { Neutral, Red } from "styles/colors";

const { Text } = Typography;

const EndTimeDiff = ({ task }: { task: TaskModel }) => {
	if (!task.timing?.endDate) {
		return (
			<Text type="secondary" italic style={{ fontSize: 11 }}>
				&nbsp;No end date
			</Text>
		);
	}

	const diff = dayjs(task.timing.endDate).diff(dayjs(), "d");

	const text = diff > 0 ? `${diff <= 1 ? "1 Day" : `${diff} Days`} left` : "Dued";

	const icon =
		diff > 0 ? (
			<ClockIcon color={Neutral[600]} width={18} />
		) : (
			<ExclamationCircleIcon color={Red[500]} width={18} />
		);

	return (
		<Flex align="center" gap={3}>
			{icon}
			<Text className="textDiffTime">{text}</Text>
		</Flex>
	);
};

export default EndTimeDiff;
