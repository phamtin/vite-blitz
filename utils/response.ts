import type { MessageInstance } from "antd/es/message/interface";

const messageOk = (messageApi: MessageInstance, msg: string) => {
	return messageApi.success(msg);
};

export { messageOk };
