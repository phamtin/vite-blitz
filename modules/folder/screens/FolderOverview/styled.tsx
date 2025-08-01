import { createStyles } from "antd-style";

const useStyles = createStyles(({token}) => ({
	wrapper: {
		width: "100%",
  },
  
  noFoldersWrapper: {
    width: "100%",
    marginTop: token.marginXXL
  }
}));

export default useStyles;
