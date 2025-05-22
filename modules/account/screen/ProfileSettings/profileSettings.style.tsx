import { createStyles } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  wrapper: {
    '& .ant-tabs-tab': {
      padding: "8px 48px 8px 0px !important"
    },

    '& .ant-form-item': {
      marginBlock: '8px',
      marginRight: '24px'
    },

    '& .ant-input.ant-input-disabled.ant-input-outlined': {
      color: 'rgba(0, 0, 0, 0.58) !important'
    }
  },
  flexItem: {
    flex: 1,
  },
  btnWidth: {
    width: '120px'
  },
  btnForm: {
    marginTop: '20px !important', justifyItems: 'end'
  },
  tabs: {
    height: "450px"
  }
}))

export default useStyles;