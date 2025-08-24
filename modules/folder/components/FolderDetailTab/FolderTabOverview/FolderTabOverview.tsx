import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Flex,
  Row,
  Statistic,
  Typography
} from 'antd';
import StatusDot from 'components/TaskStatusSelector/StatusDot';
import WhiteBox from 'components/WhiteBox/WhiteBox';
import dayjs from 'dayjs';
import type { FolderModel } from 'modules/folder/types/folder.types';
import TaskHook from 'modules/tasks/hook/task.hook';
import { TaskModel, TaskStatus } from 'modules/tasks/types/task.types';
import { useMemo } from 'react';
import { Neutral } from 'styles/colors';
import OwnerAndAccessBox from './OwnerAndAccessBox/OwnerAndAccessBox';
import useStyles from './styled';
import TaskStats from './TaskStats/TaskStats';

const { Paragraph, Text, Title } = Typography;

interface FolderTabOverviewProps {
  folder: FolderModel;
  tasks?: TaskModel[]
}

export const DescriptionText = ({ text }: { text: string }) => {
  return (
    <Paragraph strong style={{ color: Neutral[700] }} ellipsis={{ rows: 2 }}>
      {text}
    </Paragraph>
  );
};
const FolderTabOverview = (props: FolderTabOverviewProps) => {
	const { folder, tasks } = props;
	const { styles } = useStyles();
  const { folderInfo } = folder;
	const taskMetadata = TaskHook.useGetTaskMetadata();

  const totalTime = useMemo(() => {
    return tasks?.reduce((acc, cur) => acc + (cur.timing.estimation || 0), 0)
  }, [tasks])

  const countTimeByStatus = (status: TaskStatus) => {
    return tasks?.filter(t => t.status === status).reduce((acc, cur) => acc + (cur.timing.estimation || 0), 0)
  }

	return (
		<div className={styles.wrapper}>
			<Row gutter={[8, 8]}>
        <Col xs={12}><WhiteBox>
          <Descriptions.Item label="Title">
						<DescriptionText text={"About project"} />
          </Descriptions.Item>
          
          <Paragraph italic={!folderInfo.description} ellipsis={{ rows: 4 }} >{folderInfo.description || "No description yet."}
            
          </Paragraph>
        </WhiteBox></Col>

        <Col xs={7} className={styles.ownerAndAccess}>
          <OwnerAndAccessBox folder={folder} />
        </Col>

        <Col xs={5}><WhiteBox>
          <Descriptions.Item label="Title">
						<DescriptionText text={"Kick-off date"} />
          </Descriptions.Item>
          
            <Card className={styles.kickOff}>
              <Flex align='center'>
              <img src='/icons/date.svg' className="dateIcon" />
              <Text>
                Started at <br />
                <Text strong>
                {dayjs.utc(`${folder.createdAt}`).local().format('ddd, DD MMM YYYY')}</Text>
              </Text>
              </Flex>
          </Card>
          
          <Descriptions column={1 } style={{paddingTop: '5px'}}>
                      <Descriptions.Item label="Status">
                          {folderInfo.status }
                      </Descriptions.Item>
                      
                    </Descriptions>
        </WhiteBox>
        </Col>
        
        <Col xs={12} className={styles.taskStats}>
          <TaskStats tasks={ tasks} />
        </Col>

        <Col xs={12} className={ styles.timeStats}><WhiteBox>
          <Descriptions.Item label="Title">
						<DescriptionText text={"Time statistics"} />
          </Descriptions.Item>
          
          <Statistic title="Total times" value={`${totalTime}h`} className='totalTime' />

          {
            taskMetadata.status.map(s => {
              return (
                <Flex key={s as TaskStatus} align="center" gap={8}
                  style={{ marginBottom: "4px" }} 
                >
                  <StatusDot status={s as TaskStatus} />
                  <Text style={{ fontWeight: 500 }}>{s as TaskStatus}</Text>
                  <Text>{ countTimeByStatus(s as TaskStatus)}h</Text>
                </Flex>
              )
            })
          }
          <Button style={{ width: "100%" }}>
            <ArrowUpTrayIcon width={20}/>
            
            Export statistics</Button>
        </WhiteBox>
        </Col>
			</Row>
		</div>
	);
};

export default FolderTabOverview;
