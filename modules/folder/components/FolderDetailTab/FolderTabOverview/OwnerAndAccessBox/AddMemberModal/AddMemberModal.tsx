import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDebounce } from 'ahooks';
import { Avatar, Button, Flex, Input, message, Modal, Space, Tag, Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import ProfileApi from 'modules/account/api/profile.api';
import { AccountModel } from 'modules/account/types/account.types';
import FolderApi from 'modules/folder/api/folder.api';
import { FolderParticipant } from 'modules/folder/types/folder.types';
import { useState } from 'react';
import { Cyan } from 'styles/colors';
import useStyles from '../../styled';

const { Text , Title} = Typography
const { Search } = Input;

interface AddMemberModalProps {
  isModalOpen: boolean
  handleCancel: () => void
  participantInfo: FolderParticipant
  folderId: string
}

enum MemberStatus {
  Admin = "Admin",
  Member = "Member",
  NotMember = "Not a member",
  Waiting = "Waiting accept"
}

const AddMemberModal = ({ isModalOpen, handleCancel, participantInfo, folderId }: AddMemberModalProps) => {
  const { styles } = useStyles()
  const { owner, members, invitations } = participantInfo
  const [email, setEmail] = useState<string>('')
  const debouncedEmail = useDebounce(email, { wait: 1000 })
  const [processingEmail, setProcessingEmail] = useState<string>('')
  const [isOpenModalRemove, setIsOpenModalRemove] = useState(false)

  const { mutationRemoveMemberFolder } = FolderApi.useRemoveMemberFolder({ folderId })
  const { mutationAddMemberFolder } = FolderApi.useAddMemberFolder({ folderId })
  const { mutationWithdrawInvitationMember } = FolderApi.useWithdrawInvitationMember({ folderId })
  const { data, isLoading } = ProfileApi.useGetAccountByEmail<AccountModel>(debouncedEmail)
  
  const handleRemoveMember = (email: string) => { 
      setProcessingEmail(email)
    mutationRemoveMemberFolder.mutate({
      folderId: folderId,
      memberEmail: email
    }, {
      onSuccess: () => {
        message.success("Member removed!")
        setIsOpenModalRemove(false)
      },
      onSettled: () => {
      setProcessingEmail('')
    }
    })
  }

  const handleAddMember = (email: string) => {
      setProcessingEmail(email)
    mutationAddMemberFolder.mutate({
      folderId: folderId,
      emails: [email]
    }, {
      onSuccess: () => {
        sendInvitationSuccessModal()
        setEmail('')
      },
       onSettled: () => {
      setProcessingEmail('')
    }
    })
  }

  const handleWithdrawInvitationMember = (email: string) => {
          setProcessingEmail(email)
    mutationWithdrawInvitationMember.mutate({
      folderId: folderId,
      inviteeEmail: email
    }, {
      onSuccess: () => {
        message.success("The invitation has been cancelled.")
      },
       onSettled: () => {
      setProcessingEmail('')
    }
    })
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const memberStatuses = [
    {
      ...owner,
      type: MemberStatus.Admin
    },
    ...members.map(m => {
      return {
        ...m, 
        type: MemberStatus.Member
      }
    }),
    ...invitations.map(i => {
      return {
        ...i, 
        type: MemberStatus.Waiting,
        profileInfo: {
          avatar: i.inviteeAvatar,
          email: i.inviteeEmail
        }
      }
    })
  ]

  const findMemberStatus = (email: string) => {
    const status = memberStatuses.find(m => m.profileInfo.email === email)?.type

    return status || MemberStatus.NotMember
  }

  const renderMemberStatus = (status: MemberStatus) => {
    switch (status) {
      case MemberStatus.Admin:
        return <Tag color="#f50" className='tagAdmin'>Admin</Tag>
      case MemberStatus.Member:
        return <Text className='tagMember'>Member</Text>
      case MemberStatus.Waiting:
        return <Text style={{color: Cyan[700]}}>Waiting accept</Text>
      case MemberStatus.NotMember:
        return <Tag color="default" className='tagAdmin'>Not a member</Tag>
    }
  }

  const renderMemberAction = (status: MemberStatus, email: string) => {
    switch (status) {
      case MemberStatus.Member:
        return <Button color="danger" variant="text"
          onClick={() => {
            setIsOpenModalRemove(true)
            setProcessingEmail(email)
          }}
        >
          Remove
        </Button>
      case MemberStatus.Waiting:
        return <Button color="danger" variant="text" className='withdrawBtn'
          disabled={mutationWithdrawInvitationMember.isPending && processingEmail === email}
          onClick={() => handleWithdrawInvitationMember(email)}>Withdraw invitation</Button>
      case MemberStatus.NotMember:
        return <Button color="orange" variant="text"
          disabled={mutationAddMemberFolder.isPending && processingEmail === email}
          onClick={() => handleAddMember(email)}>Add</Button>
    }
  }

  const sendInvitationSuccessModal = () => {
    Modal.success({
      icon: null,
      content: <div style={{textAlign: "center"}}>
        <img src='/icons/Illustration.png' />
        <Title level={4}>Invitation sent!</Title>
        <Paragraph>The project invitation has been successfully sent.</Paragraph>
      </div>
    });
  };

  return (
    <>
      <Modal
          title="Team member"
          closable={{ 'aria-label': 'Custom Close Button' }}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          className={styles.addMemberModal}
          >
          <Search
            placeholder='Enter email to find member'
            value={email}
            onChange={(e) => handleOnChange(e)}
            loading={isLoading}
        />
      
        {
          email ? <>
          {data ? <Flex gap={15} align='center' justify='space-between' className="member">
            <Space size={'middle'}>
              <Avatar src={data.profileInfo.avatar} />
              <Flex vertical gap={3}>
                <Text strong>{data.profileInfo.email}</Text>
                {renderMemberStatus(findMemberStatus(data.profileInfo.email))}
              </Flex>
            </Space>
            {renderMemberAction(findMemberStatus(data.profileInfo.email), data.profileInfo.email)}
          </Flex> :
            <Flex justify='center' vertical align='center'>
              <MagnifyingGlassIcon width={50} style={{marginBlock: "20px"}}/>
              <Text>No found user</Text>
            </Flex>
          }
          </> : <>
              {
                memberStatuses.map(m => {
                  const { email, avatar } = m.profileInfo
                  const status = findMemberStatus(email)

                  return <Flex key={email} gap={15} align='center' justify='space-between' className="member">
                      <Space size={'middle'}>
                        <Avatar src={avatar} />
                        <Flex vertical gap={3} >
                          <Text strong>{email}</Text>
                          {renderMemberStatus(status)}
                        </Flex>
                    </Space>
                    {renderMemberAction(status, email)}
                    </Flex>
                })
              }
            </>
        }
      </Modal>
      
      <Modal
      title="Remove member"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isOpenModalRemove}
      onOk={() => handleRemoveMember(processingEmail)}
      onCancel={() => setIsOpenModalRemove(false)}
      >
        <p>Are you sure you want to remove this member?</p>
      </Modal>
    </>
  )
}

export default AddMemberModal
