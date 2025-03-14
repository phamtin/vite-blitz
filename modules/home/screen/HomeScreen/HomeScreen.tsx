import { Flex, Typography, Row, Col } from "antd";
import useStyles from "./homescreen.style";
import {
  ChartPieIcon,
  PresentationChartBarIcon,
  DocumentTextIcon,
  ChartBarSquareIcon,
} from "@heroicons/react/24/outline";
import { Lime, Blue, Yellow } from "styles/colors";
import Icon from "components/Icon/Icon";
import InlineTask from "components/InlineTask/InlineTask";

const { Title, Text, Paragraph } = Typography;

const HomeScreen = () => {
  const { styles, theme } = useStyles();

  const onHandleLogin = () => {};

  return (
    <div className={styles.wrapper}>
      <Row>
        <Col sm={2} xl={6} />
        <Col sm={20} xl={12}>
          <div>
            <Title level={4}>Welcome back, Master 👋🏻</Title>
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
              <Text strong>
                Create a todo list for things to be done today.
              </Text>
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
        <Col span={7}>
          <div className={styles.taskWrapper}>
            <Title level={4}>Recent tasks</Title>
            <div>
              <InlineTask title="Integrate with the AWS, enhance API gateway performance, and security" />
              <InlineTask title="Integrate with new Front end" />
            </div>
          </div>
        </Col>
        <Col span={5}>
          <div className={styles.meetingWrapper}>
            <Title level={4}>Incomming meetings</Title>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomeScreen;
