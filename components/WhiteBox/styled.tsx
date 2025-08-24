import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
	wrapper: {
		height: '100%',
		padding: token.padding,
		borderRadius: 16,
		backgroundColor: 'white',
	},
}));

export default useStyles;
