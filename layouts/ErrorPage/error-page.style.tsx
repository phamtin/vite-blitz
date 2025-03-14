import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => ({
  wrapper: {
    width: "100%",
    height: "100vh",
  },
  content: {
    width: 600,
    height: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "column",
    margin: "0 auto",

    "h3.ant-typography": {
      color: token.colorTextHeading,
    },

    "div.ant-typography": {
      color: token.colorTextSecondary,
      marginBottom: token.marginLG,
    },
  },
}));

export default useStyles;
