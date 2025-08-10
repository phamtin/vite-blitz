import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button, Flex, Space, Typography } from "antd";
import { FILTER_FOLDER_OPTIONS } from "constants/constants";
import { GetMyFoldersResponse } from "hooks/queryAppData/type";
import FolderApi from "modules/folder/api/folder.api";
import FolderListItem from "modules/folder/components/FolderListItem/FolderListItem";
import { useState } from "react";
import useAppState from "store";
import useStyles from "./styled";
export type FilterFolder = "All" | "Favorites" | "Shared" | "My"

const FolderOverviewScreen = () => {
  const { styles } = useStyles();
  const [filter, setFilter] = useState<FilterFolder>("All");
  const currentLoggedInUser = useAppState((state) => state.auth.currentLoggedInUser)
  const { data: allFolders = [] } = FolderApi.useGetMyFolders<GetMyFoldersResponse[]>()

  const filteredFolders = allFolders.filter(folder => {
    const folderOwnerEmail = folder.folder.participantInfo.owner.profileInfo.email

    if (filter === "Favorites") return currentLoggedInUser?.accountSettings.pinnedFolderIds.includes(folder.folder._id);
    if (filter === "Shared") return folderOwnerEmail !== currentLoggedInUser?.profileInfo.email;
    if (filter === "My") return folderOwnerEmail === currentLoggedInUser?.profileInfo.email;
    return true;
  });

  return <Flex vertical gap={20} className={styles.wrapper}>
    <Typography.Title level={3}>{filter} folders</Typography.Title>
    <Space>
       {FILTER_FOLDER_OPTIONS.map(({ key, label }) => (
          <Button
            key={key}
            type={filter === key ? "primary" : "default"}
            onClick={() => setFilter(key)}
          >
            {label}
          </Button>
        ))}
    </Space>

    <Flex gap="middle" wrap>

      {
        filteredFolders.length ? filteredFolders.map(item => {
          return (
            <FolderListItem folder={item} key={item.folder._id} />
          )
        }) : <Flex justify="center" vertical align="center" className={styles.noFoldersWrapper}>
            <DocumentMagnifyingGlassIcon width={50}/>
            <p>No folders available.</p>
          </Flex>}
    </Flex>
  </Flex>;
};

export default FolderOverviewScreen;
