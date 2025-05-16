import { createStyles } from "antd-style";
import { Neutral } from "styles/colors";

const useStyles = createStyles(({ token }) => ({
	wrapper: {
		width: "100%",

		".ant-collapse-header": {
			backgroundColor: Neutral[100],
			marginBottom: token.marginXXS,
			padding: "8px 9px !important",
			borderRadius: "9999px !important",

			".ant-collapse-expand-icon": {
				marginTop: 5,
			},
		},

		".ant-collapse-content-box": {
			padding: "0 !important",
			marginBottom: token.margin,
			marginLeft: token.marginLG,
		},
	},
}));

export default useStyles;
