import { createStyles } from 'antd-style';
import { Gray, Orange } from 'styles/colors';

const useStyles = createStyles(() => ({
	notiHeader: {
		padding: '10px',
		borderBottom: `3px solid ${Orange[500]}`,
		display: 'flex',
		justifyContent: 'space-between',
	},

	notiWrapper: {
		display: 'unset !important',
	},

	notiList: {
		maxHeight: 500,
		overflowY: 'auto',
		scrollbarWidth: 'none',
	},

	notiItem: {
		alignItems: 'start !important',
		gap: 10,
		cursor: 'pointer',
		padding: '12px !important',
		display: 'flex',
		justifyContent: 'space-between',
		minHeight: '95px',

		'&:hover': {
			backgroundColor: Gray[100],
			transition: '0.2s all linear',
			borderRadius: '5px',
		},
	},

	inviteJoinFolderStatus: {
		marginTop: '10px',
		width: 'fit-content',
		fontSize: '12px',
	},

	notificationIconWrapper: {
		position: 'relative',
		display: 'inline-block',
	},

	customBadgeStyle: {
		position: 'absolute',
		top: '4px',
		right: '4px',
		minWidth: '16px',
		height: '16px',
		padding: '0 4px',
		backgroundColor: 'red',
		color: 'white',
		fontSize: '10px',
		fontWeight: 'bold',
		lineHeight: '16px',
		textAlign: 'center',
		borderRadius: '8px',
		pointerEvents: 'none',
		zIndex: 1,
	},
}));

export default useStyles;
