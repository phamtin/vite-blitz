import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => ({
	wrapper: {
		width: "100%",
		marginBottom: token.marginSM,
	},

	title: {
		marginBottom: token.marginXS,
	},

	layout: {
		paddingBottom: token.marginSM,
	},
}));

export default useStyles;
