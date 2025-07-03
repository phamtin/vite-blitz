import { createStyles } from 'antd-style';
import { Blue, Neutral } from 'styles/colors';

const useStyles = createStyles(({ token }) => ({
	wrapper: {
		width: '100%',
		height: '79vh',
		padding: token.paddingXXS,
		borderRadius: 20,
		backgroundColor: Blue[50],
	},
}));

export default useStyles;
