import { createStyles } from "antd-style";
import { Gray, Neutral } from "styles/colors";

const useStyles = createStyles(({ token }) => ({
	wrapper: {
		width: "100%",
		minHeight: "100%",
	},

	badgeCount: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: "1px 8px",
		borderRadius: token.borderRadiusSM,
		color: Neutral[700],
		background: "white",
		fontWeight: 500,
		userSelect: "none",
		boxShadow: `0px 0.5px 6px ${Neutral[200]}`,
	},

	taskCollapse: {
		".ant-collapse": {
			".ant-collapse-header": {
				backgroundColor: Gray[100],
				marginBottom: token.margin,
				padding: "8px 9px !important",
				borderRadius: "12px !important",
				border: `1px solid ${Gray[200]}`,

				".ant-collapse-expand-icon": {
					marginTop: 5,
				},
			},

			".ant-collapse-content-box": {
				padding: "0 !important",
				marginBottom: token.marginXL,
				marginLeft: 20,
			},
		},
	},
}));

export default useStyles;
