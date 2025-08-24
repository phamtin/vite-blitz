import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => ({
  card: {
    width: 250,
    textAlign: "center",
    position: "relative",
    cursor: "pointer"
  },
  iconDropdown: {
    width: "16px",
    marginRight: "8px",
  },
  buttonDropdown: {
    position: "absolute",
    right: "10px",
    top: "10px",
    cursor: "pointer"
  },
  folderInfo: {
    paddingInline: "10px",
    marginTop: "10px"
  }
}));

export default useStyles;
