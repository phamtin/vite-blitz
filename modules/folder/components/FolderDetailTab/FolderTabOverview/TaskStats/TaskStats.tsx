import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { Button, Card, Descriptions, Flex, Progress, ProgressProps, Space, Tag, Typography } from 'antd'
import WhiteBox from 'components/WhiteBox/WhiteBox'
import { FlagIcon } from 'icons/FlagIcon'
import { PRIORITY_COLOR_MAP } from 'modules/tasks/constants/task.constant'
import TaskHook from 'modules/tasks/hook/task.hook'
import { TaskModel, TaskPriority, TaskStatus } from 'modules/tasks/types/task.types'
import { Orange } from 'styles/colors'
import { DescriptionText } from '../FolderTabOverview'

const conicColors: ProgressProps['strokeColor'] = {
  '0%': Orange[200],
  '50%': Orange[300],
  '100%': Orange[500],
};

const { Text, Title } = Typography;

interface TaskStatsProps {
  tasks?: TaskModel[]
}
const TaskStats = (props: TaskStatsProps) => {
  const { tasks } = props
	const taskMetadata = TaskHook.useGetTaskMetadata();
  
    const countTasksByPriority = (priority: TaskPriority) => {
      return tasks?.filter(s => s.priority === priority).length || 0
  }
    const countTasksByStatus = (status: TaskStatus) => {
      return tasks?.filter(s => s.status === status).length || 0
  }
  
  const percentTasksByStatus = (status: TaskStatus) => {
    if (!tasks || !tasks.length) return 0;
    return countTasksByStatus(status) / tasks.length
  }

  const percentTaskDone = percentTasksByStatus(TaskStatus.Done) * 100

  return (
    <WhiteBox>
              <Descriptions.Item label="Title">
                <DescriptionText text={"Task statistics"} />
              </Descriptions.Item>
              <Flex justify='space-between'>
                <Space>
                  <Title level={3}>{countTasksByStatus(TaskStatus.Done)} / {tasks?.length}</Title> 
                  Task completed
              </Space>
                <Tag
      className='tagProgress'
                >
                  {percentTaskDone + "%"}
              </Tag>
    
              </Flex>
              <Progress
      percent={
        tasks && tasks.length > 0
          ? percentTaskDone
                    : 0
      }
      showInfo={false}
      strokeColor={conicColors}
    />
                <Card className="card">
                  {taskMetadata.priorities.map((priority, index, arr) => (
                    <Card.Grid key={priority as TaskPriority} hoverable={false} className='grid' style={{borderRadius:
              index === 0
                ? "8px 0 0 8px"
                : index === arr.length - 1
                ? "0 8px 8px 0"
                : 0,
          }}>
                      <Tag
                        className='tag'
      style={{
        background: PRIORITY_COLOR_MAP[priority as TaskPriority].bg,
        color: PRIORITY_COLOR_MAP[priority as TaskPriority].text,
      }}
    >
      <FlagIcon fill={PRIORITY_COLOR_MAP[priority as TaskPriority].text}/>
      <span className='priorityTag'>{priority as TaskPriority}</span>
    </Tag>
    
                      <Title level={4} className='priorityTitle'>{countTasksByPriority(priority as TaskPriority)} Task</Title>
                      <Text className='priorityDesc'>In {priority as TaskPriority } category</Text>
                  </Card.Grid>
                  ))}
                </Card>
              
              <Button style={{ width: "100%" }}>
                <ArrowUpTrayIcon width={20}/>
                Export statistics</Button>
            </WhiteBox>
  )
}

export default TaskStats
