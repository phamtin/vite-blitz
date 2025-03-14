import { Button } from "antd";
import useStyles from "./style";

const AdditionalInfoOption = ({ form }: any) => {
  const { styles } = useStyles();
  return (
    <div className={styles.wrapper}>
      <Button type="dashed" onClick={() => {}} block>
        + Add Note/Additional Info
      </Button>
    </div>
  );
};

export default AdditionalInfoOption;
