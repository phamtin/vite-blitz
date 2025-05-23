import type { FolderModel } from "modules/folder/types/folder.types";
import useStyles from "./styled";
import MinimalCard from "./FolderCardMinimal/MinimalCard";

type FolderCardProps = {
	folder: FolderModel;
	variant?: "minimal" | "default" | "verbose";
};

const FolderCard = (props: FolderCardProps) => {
	if (props.variant === "minimal") {
		return <MinimalCard folder={props.folder} />;
	}

	return <div>Invalid card</div>;
};

export default FolderCard;
