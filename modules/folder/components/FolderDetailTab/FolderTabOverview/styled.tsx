import { createStyles } from 'antd-style';
import { Cyan, Neutral } from 'styles/colors';

const useStyles = createStyles(({ token }) => ({
	wrapper: {
		width: '100%',
	},

	infoViewOnly: {
		position: 'relative',
		paddingTop: 0,
		borderRadius: 16,
		backgroundColor: 'white',

		'.editpen': {
			visibility: 'hidden',
			position: 'absolute',
			top: 18,
			right: 18,
		},

		'&:hover .editpen': {
			visibility: 'visible',
		},
	},

	stats: {
		padding: '20px',
		borderRadius: 16,
		backgroundColor: 'white',
	},
}));

export default useStyles;
