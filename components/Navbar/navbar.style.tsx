import { createStyles } from "antd-style";
import { Neutral, Sky } from "../../styles/colors";

const useStyles = createStyles(({ token }) => ({
	wrapper: {
		width: "100%",
		height: 51,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: token.padding,
		borderBottom: `1px solid ${Neutral[200]}`,

		".NavBarRight": {
			".avaWrapper": {
				borderRadius: 999,
				overflow: "hidden",
				"&:hover": {
					backgroundColor: Neutral[200],
					cursor: "pointer",
				},
			},

			".optionButton": {
				color: Neutral[600],

				"&.active": {
					color: `${token.colorPrimaryActive}!important`,
					backgroundColor: Sky[100],
				},
			},
		},

		"span.ant-avatar": {
			cursor: "pointer",
		},
	},
}));

export default useStyles;
