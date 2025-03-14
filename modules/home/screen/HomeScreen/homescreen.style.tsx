import { createStyles } from "antd-style";
import { Blue, Lime, Neutral, Yellow } from "styles/colors";

const useStyles = createStyles(({ token }) => ({
  wrapper: {
    width: "100%",
    height: "100%",
    padding: token.paddingXL,
  },

  gradientText: {
    background: "linear-gradient(90deg, #14186d, #39aef1, #ee03f7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  introText: {
    marginTop: token.marginSM,
    lineHeight: 1.3,
  },

  promptWrapper: {
    display: "flex",
    gap: token.margin,
    marginTop: 40,
    marginBottom: 100,
  },

  prompt: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: 200,
    height: 125,
    padding: token.paddingSM,
    borderRadius: 16,
    border: `1px solid ${Neutral[300]}`,
    cursor: "pointer",
    span: {
      lineHeight: 1.3,
      color: Neutral[700],
    },
    "&:hover": {
      backgroundColor: Neutral[50],
      span: {
        color: Neutral[900],
      },
    },
  },

  prompt1: {
    "&:hover": {
      svg: {
        color: Blue[700],
      },
    },
  },
  prompt2: {
    "&:hover": {
      svg: {
        color: Lime[700],
      },
    },
  },
  prompt3: {
    "&:hover": {
      svg: {
        color: Blue[700],
      },
    },
  },
  prompt4: {
    "&:hover": {
      svg: {
        color: Yellow[700],
      },
    },
  },

  taskWrapper: {
    paddingRight: token.paddingLG,
  },

  meetingWrapper: {},
}));

export default useStyles;
