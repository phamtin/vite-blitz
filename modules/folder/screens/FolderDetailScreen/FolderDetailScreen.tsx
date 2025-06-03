import useStyles from "./styled";

interface FolderDetailScreenProps {
	folderId: string;
}

const FolderDetailScreen = (props: FolderDetailScreenProps) => {
	const { styles } = useStyles();

	return <div className={styles.wrapper}>FolderDetailScreen</div>;
};

export default FolderDetailScreen;
