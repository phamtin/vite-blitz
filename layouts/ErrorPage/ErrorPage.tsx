import { Button, Typography, Tag } from "antd";

import useStyles from "./error-page.style";

type ErrorPageProps = {
  code: number;
  message: string;
};

const ErrorPage = ({ code }: ErrorPageProps) => {
  const { styles } = useStyles();

  const goToHome = () => {
    window.location.replace("/home");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Tag color="red">{code}</Tag>
        <Typography.Title level={3}>
          Oops! You're lost in the space...
        </Typography.Title>
        <Typography.Paragraph>
          Sorry, the page you looking for can't be found. It may has been moved,
          <br />
          or deleted, or It has something wrong in the first place.
        </Typography.Paragraph>

        <Button type="primary" onClick={goToHome}>
          Come back homes
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
