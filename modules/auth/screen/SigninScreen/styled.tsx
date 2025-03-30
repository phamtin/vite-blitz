import { createStyles } from "antd-style";

const useStyles = createStyles(() => ({
  container: {
    backgroundColor: "#f0f0f0",
    width: "100vw",
    height: "100vh",
    padding: "20px",
  },
  title: {
    paddingLeft: 6,
    paddingBottom: 6
  },
  btn: {
    marginBlock: 30,
    width: "100%"
  },
  image: {
    flex: 1,

    "& img": {
      borderRadius: "20px"
    },

    "@media (max-width: 1200px)": {
      display: "none"
    },
  },
  content: {
    flex: 1,

    "& > div": {
      maxWidth: "55%",
      margin: "auto"
    }
  }
}));

export default useStyles;
