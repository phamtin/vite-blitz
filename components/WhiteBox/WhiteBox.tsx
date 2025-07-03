import { Flex } from 'antd';
import useStyles from './styled';

interface WhiteBoxProps {
	children: React.ReactNode;
}

const WhiteBox = ({ children }: WhiteBoxProps) => {
	const { styles } = useStyles();
	return <div className={styles.wrapper}>{children}</div>;
};

export default WhiteBox;
