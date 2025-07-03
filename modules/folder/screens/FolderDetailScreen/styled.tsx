import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
	wrapper: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
	},

	folderTitle: {
		marginTop: token.margin,
		marginBottom: token.marginXS,
	},
	tabs: {
		'.ant-tabs': {
			width: '100%',
		},
	},
}));

export default useStyles;
