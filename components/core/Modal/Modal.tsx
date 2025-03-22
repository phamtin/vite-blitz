import { Modal as AntModal, type ModalProps } from "antd";
import { Neutral } from "styles/colors";

type Props = {
  children: React.ReactNode;
};

const STYLE: ModalProps["styles"] = {
  header: {
    height: 44,
    paddingTop: 14,
    paddingLeft: 16,
  },
  content: {
    padding: 0,
  },
  body: {
    borderTop: `1px solid ${Neutral[200]}`,
  },
  footer: {
    paddingRight: 16,
    paddingBottom: 16,
  },
};

const Modal = (props: Props & ModalProps) => {
  const { width = 1000, children } = props;

  return (
    <AntModal open={true} width={width} styles={STYLE} {...props}>
      {children}
      <br />
    </AntModal>
  );
};

export default Modal;
