import { Flex, Typography, Row, Col } from "antd";
import useStyles from "./homescreen.style";
import {
	ChartPieIcon,
	PresentationChartBarIcon,
	DocumentTextIcon,
	ChartBarSquareIcon,
	ClockIcon,
} from "@heroicons/react/24/outline";
import { Lime, Blue, Yellow, Gray } from "styles/colors";
import Icon from "components/Icon/Icon";
import useAppState from "store";
import type { LoggedInUser } from "store/store.type";
import useSortRecentFolders from "modules/folder/hook/useRecentFolders/useRecentFolders";
import FolderCard from "modules/folder/components/FolderCard/FolderCard";

const { Title, Text, Paragraph } = Typography;

const HomeScreen = () => {
	const { styles } = useStyles();

	const loggedInUser = useAppState(
		(state) => state.auth.currentLoggedInUser as LoggedInUser,
	);
	const myFolders = useAppState((state) => state.folders.list);

	// const { sorted } = useSortRecentFolders({
	// 	folderIds: myFolders.map((folder) => folder._id),
	// });

	return (
		<div className={styles.wrapper}>
			<Row>
				<Col sm={2} xl={6} />
				<Col sm={20} xl={12}>
					<div>
						<Title level={4}>
							Welcome back, {loggedInUser.profileInfo.firstname} 👋🏻
						</Title>
						<Title className={styles.gradientText} level={2}>
							What would you want to do today?
						</Title>
						<Paragraph type="secondary" className={styles.introText}>
							Use one of the most common prompts to get start
							<br />
							or just use your own to begin.
						</Paragraph>
					</div>

					<div className={styles.promptWrapper}>
						<Flex className={`${styles.prompt} ${styles.prompt1}`}>
							<Text strong>Create a todo list for things to be done today.</Text>
							<Icon color={Blue[600]} icon={<ChartBarSquareIcon />} />
						</Flex>
						<Flex className={`${styles.prompt} ${styles.prompt2}`}>
							<Text strong>Check today's meetings and get aligned.</Text>
							<Icon color={Lime[600]} icon={<PresentationChartBarIcon />} />
						</Flex>
						<Flex className={`${styles.prompt} ${styles.prompt3}`}>
							<Text strong>See progress of my members.</Text>
							<Icon color={Blue[600]} icon={<ChartPieIcon />} />
						</Flex>
						<Flex className={`${styles.prompt} ${styles.prompt4}`}>
							<Text strong>View, manage my documents</Text>
							<Icon color={Yellow[600]} icon={<DocumentTextIcon />} />
						</Flex>
					</div>
				</Col>
			</Row>

			<Row>
				<Col sm={2} xl={6} />
				<Col sm={20} xl={12}>
					<Flex>
						<Flex vertical gap={16}>
							<Flex align="center" gap={8}>
								<ClockIcon width={20} color={Gray[500]} />
								<Text strong style={{ color: Gray[600] }}>
									Recently visited folders
								</Text>
							</Flex>
							<Flex gap={18}>
								{myFolders.map((folder) => (
									<FolderCard key={folder._id} variant="minimal" folder={folder} />
								))}
							</Flex>
						</Flex>
					</Flex>
				</Col>
			</Row>
		</div>
	);
};

export default HomeScreen;
