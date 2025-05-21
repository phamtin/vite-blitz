import { createStyles } from "antd-style";
import { Neutral } from "styles/colors";

const useStyles = createStyles(({ token }) => ({
  wrapper: {
    width: "100%",
  },

  titleInput: {
    fontWeight: 600,
    marginBottom: token.marginXS,
    fontSize: 24,
    borderBottom: `2px solid ${Neutral[200]}`,
  },

  mainData: {
    padding: token.padding,
    paddingTop: token.paddingXXS,
  },

  metaData: {
    marginTop: token.margin,
    border: `1px solid ${Neutral[200]}`,
    padding: `${token.paddingXXS}px ${token.paddingXS}px`,
    marginRight: token.margin,
    borderRadius: token.borderRadiusLG,
  },

  metaBlock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: token.paddingXS,
    ":not(:last-child)": {
      borderBottom: `1px dashed ${Neutral[200]}`,
    },
  },

  options: {
    marginTop: token.margin,
  },
}));

export default useStyles;
