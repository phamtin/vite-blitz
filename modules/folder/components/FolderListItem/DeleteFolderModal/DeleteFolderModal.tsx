import { message, Modal } from 'antd'
import FolderApi from 'modules/folder/api/folder.api'

interface DeleteFolderModalProps {
  id: string
  isModalOpen: boolean
  handleCancel: () => void
}

const DeleteFolderModal = ({ id, isModalOpen, handleCancel }: DeleteFolderModalProps) => {
  const {mutationDeleteProject} = FolderApi.useDeleteFolder({folderId: id, onClose: handleCancel})
  const handleDelete = () => {
    mutationDeleteProject.mutate(undefined ,{
      onSuccess: () => {
        message.success('Folder deleted successfully')
      }
    })
  }

  return (
  <Modal
      title="Delete Project"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isModalOpen}
      onOk={handleDelete}
      onCancel={handleCancel}
      >
        <p>Are you sure you want to delete this project?</p>
      </Modal>
  )
}

export default DeleteFolderModal
