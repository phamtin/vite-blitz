import { createStyles } from "antd-style";
import { Gray } from "styles/colors";

const useStyles = createStyles(({ token }) => ({
	wrapper: {
		width: 150,
		height: 124,

		".ant-card": {
			height: "100%",
			borderRadius: "19px !important",
			position: "relative",

			"&:hover .btn-dot": {
				opacity: 1,
			},

			".btn-dot": {
				opacity: 0,
				position: "absolute",
				right: 4,
				top: 6,
			},

			".ant-card-cover": {
				height: "36%",
				backgroundColor: Gray[100],
				borderRadius: "19px 19px 0 0 !important",

				"> *": {
					overflow: "hidden !important",
				},
			},

			".ant-card-body": {
				height: "64%",
				backgroundColor: "white",
				borderRadius: "0 0 19px 19px !important",
				padding: token.padding,
				paddingTop: token.paddingMD,

				".ant-card-meta": {
					".ant-card-meta-title": {
						"> *": {
							whiteSpace: "wrap",
							lineHeight: 1.3,
							userSelect: "none",
						},
					},
				},
			},
		},
	},
}));

export default useStyles;
