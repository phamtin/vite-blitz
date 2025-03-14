import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => ({
  wrapper: {
    width: "100%",

    "&:hover": {
      cursor: "pointer",
    },

    ".ant-typography": {
      "&:hover": {
        textDecorationLine: "underline",
      },
    },
  },
}));

export default useStyles;
