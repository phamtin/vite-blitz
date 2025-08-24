import { createStyles } from 'antd-style';
import { Neutral, Orange } from 'styles/colors';

const useStyles = createStyles(({ token }) => ({
  wrapper: {
    width: '100%',
    
    '.ant-card.ant-card-bordered.ant-card-contain-grid': {
      border: "none",
    },

    '.ant-card-body': {
      padding: '10px',
    }
  },

  infoViewOnly: {
    position: 'relative',
    paddingTop: 0,
    borderRadius: 16,
    backgroundColor: 'white',

    '.editpen': {
      visibility: 'hidden',
      position: 'absolute',
      top: 18,
      right: 18,
    },

    '&:hover .editpen': {
      visibility: 'visible',
    },
  },

  stats: {
    padding: '20px',
    borderRadius: 16,
    backgroundColor: 'white',
  },
  
  ownerAndAccess: {
    ".owner": {
      backgroundColor: Neutral[100],
      paddingInline: token.paddingSM,
      borderRadius: token.borderRadiusSM,
      paddingBlock: token.paddingXS,
    },

    '.username': {
      fontSize: "14px"
    },

    '.email': {
      fontSize: "12px"
    },

    '.addMemberBtn': {
      backgroundColor: Orange[500],
                color: '#333',
                cursor: 'pointer',
                fontWeight: 'bold',
    }
  },

  kickOff: {
    ".ant-typography": {
      fontSize: "12px"
    },

    ".dateIcon": {
      padding: "15px",
      backgroundColor: `${Neutral[100]}`,
      borderRadius: '10px',
      marginRight: "10px"
    }
  },

  taskStats: {
    ".tagProgress": {
      backgroundColor: Orange[100],
      fontSize: '12px',  
      height: '26px',       
      minWidth: '26px',     
      lineHeight: '24px',   
      border: `2px solid ${Orange[200]}`,
      color: Orange[500],
      margin: 0
    },

    '.card': {
      marginBlock: "22.5px",

      '.priorityTag': {
        marginTop: "-4px", display: "inline-block"
      },

      '.priorityTitle': {
        paddingTop: "20px"
      },

      '.priorityDesc': {
        fontSize: "10px"
      },

      '.grid': {
        width: '25%',
        padding: "10px",
      },

      '.tag': {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        border: 'none',
        fontWeight: 500,
        padding: "5px",
      }
    },
  },

  timeStats: {
    '.totalTime': {
      borderBottom: "1px dashed #ccc", paddingBottom: "10px", marginBottom: "10px"
    }
  },

  addMemberModal: {
    ".ant-input": {
      marginBlock: "20px"
    },

    ".ant-avatar.ant-avatar-circle": {
      width: "40px",
      height: "40px"
    },

    ".ant-input-group-addon": {
      background: "unset"
    },

    ".member": {
      marginBottom: "15px"
    },

    ".tagAdmin": {
      width: "fit-content"
    },

    ".tagMember": {
      color: Orange[500],
      fontSize: "12px"
    },

    ".withdrawBtn": {
      maxWidth: "80px",
    whiteSpace: "normal",
                textAlign: "center",
                padding: "5px",
    height: "fit-content"
    }
  }

}));

export default useStyles;
