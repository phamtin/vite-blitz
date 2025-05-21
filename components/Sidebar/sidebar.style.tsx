import { createStyles } from "antd-style";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const useStyles = createStyles(({ token }, props: any) => ({
	wrapper: {
		width: props.sidebarWidth,
		overflow: "hidden",
		".sidebarTop": {
			display: "flex",
			justifyContent: "left",
			alignItems: "center",
			height: 51,
			paddingLeft:
				props.sidebarWidth === "220px" ? token.paddingMD : token.paddingXS - 1,
			color: token.colorBgBase,
			backgroundColor: "#0e0e0e",
			borderBottom: "1px solid #292929",

			"&__logo": {
				padding: `${token.paddingXXS}px`,
				paddingTop: `${token.paddingXS}px`,
				h4: { margin: 0 },
				h2: { margin: 0 },
				cursor: "pointer",
				"&:hover": {
					backgroundColor: "#1c1c1c",
					borderRadius: token.borderRadius,
				},
			},
		},

		".sidebarMid": {
			fontWeight: 500,
			padding: 0,
			height: "calc(100vh - 99px)",

			".ant-menu-sub": {
				backgroundColor: `${token.colorTextBase} !important`,
			},

			".ant-menu-item": {
				marginTop: 0,
				marginBottom: 0,
				paddingLeft: 14,
				border: `2px solid ${token.colorTextBase}`,
				"&-selected": {
					color: token.colorPrimaryTextHover,
					backgroundColor: "inherit",
					border: `2px solid ${token.colorPrimary}`,
				},
				"&:first-child": {
					marginTop: token.marginSM,
				},
			},

			".ant-menu-submenu-title": {
				marginTop: 0,
				marginBottom: 0,
			},

			".ant-menu-sub.ant-menu-vertical": {
				backgroundColor: token.colorTextBase,
			},
		},

		".sidebarBot": {
			display: "flex",
			justifyContent: "right",
			alignItems: "center",
			width: props.sidebarWidth,
			height: 48,
			paddingRight:
				props.sidebarWidth === "220px" ? token.paddingXXS : token.paddingXS - 1,
			backgroundColor: token.colorTextBase,
			borderTop: "1px solid #292929",
			boxSizing: "border-box",

			button: {
				border: 0,
				color: "#949494",
				backgroundColor: token.colorTextBase,

				"&:hover": {
					color: "#949494 !important",
					backgroundColor: "#1c1c1c !important",
				},
			},
		},
	},
}));

export default useStyles;
