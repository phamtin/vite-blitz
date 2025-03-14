import { createStyles } from "antd-style";
import { Neutral } from "styles/colors";

const useStyles = createStyles(({ token }) => ({
  wrapper: {
    width: "100%",
  },
  createTaskWrapper: {
    padding: 0,
  },

  titleInput: {
    fontWeight: 600,
    marginBottom: token.marginXS,
    fontSize: 24,
    borderBottom: `2px solid ${Neutral[200]}`,
  },

  mainData: {
    padding: token.paddingLG,
    paddingTop: token.paddingSM,
  },

  metaData: {
    height: "100%",
    backgroundColor: Neutral[50],
  },

  metaBlock: {
    display: "flex",
    flexDirection: "column",
    padding: token.padding,
    borderBottom: `1px solid ${Neutral[200]}`,
  },

  options: {
    marginTop: token.margin,
  },
}));

export default useStyles;
