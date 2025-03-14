import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => ({
  wrapper: {
    width: "100%",
  },

  filterSelector: {
    minWidth: 150,

    ".ant-select-prefix": {
      marginLeft: 2,
      marginBottom: 2,
    },
  },
}));

export default useStyles;
