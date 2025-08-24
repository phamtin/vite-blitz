import { type UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from 'api/api';
import type { Ok } from 'types/response.type';

const useGetMyFolders = <TData, TError = Error>(
	options?: Omit<UseQueryOptions<TData, TError>, 'queryKey'>,
) => {
	return useQuery({
		queryKey: ['useGetMyFolders'],
		queryFn: async () => {
			const res = await api.get('folders/my-folders');

			return ((await res.json()) as Ok<TData>).data;
		},
		...options,
	});
};

const useGetFolderById = <TData, TError = Error>(
	folderId: string,
	options?: Omit<UseQueryOptions<TData, TError>, 'queryKey'>,
) => {
	return useQuery({
		queryKey: ['useGetFolderById', folderId],
		queryFn: async () => {
			const res = await api.get(`folders/${folderId}`);
			return ((await res.json()) as Ok<TData>).data;
		},
		...options,
	});
};

type DeleteFolderProps = {
  folderId: string
  onClose: () => void
}

const useDeleteFolder = (props: DeleteFolderProps) => {
  const queryClient = useQueryClient()

  const mutationDeleteProject = useMutation({
    mutationFn: () => {
      return api.delete(`folders/${props.folderId}`).json();
    },
    onSuccess: () => {
      props.onClose()
      queryClient.invalidateQueries({queryKey : ["useGetMyFolders"]})
    }
  })

  return { mutationDeleteProject } 
}

type removeMemberProjectRequest = {
  folderId: string,
  memberEmail: string
}

type UpdateMemberFolderProps = {
  folderId: string
}

const useRemoveMemberFolder = (props: UpdateMemberFolderProps) => {
  const queryClient = useQueryClient()
  
  const mutationRemoveMemberFolder = useMutation({
    mutationFn: (request: removeMemberProjectRequest) => {
      return api.post(`folders/invite/remove`, { json: request }).json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetFolderById", props.folderId] })
    }
  })

  return { mutationRemoveMemberFolder }
}

type addMemberProjectRequest = {
  folderId: string,
  emails: string[]
}

const useAddMemberFolder = (props: UpdateMemberFolderProps) => {
  const queryClient = useQueryClient()
  
  const mutationAddMemberFolder = useMutation({
    mutationFn: (request: addMemberProjectRequest) => {
      return api.post(`folders/invite`, { json: request }).json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetFolderById", props.folderId] })
    }
  })

  return { mutationAddMemberFolder }
}


type WithdrawInvitationMemberRequest = {
  folderId: string,
  inviteeEmail: string
}

const useWithdrawInvitationMember = (props: UpdateMemberFolderProps) => {
  const queryClient = useQueryClient()
  const mutationWithdrawInvitationMember = useMutation({
    mutationFn: (request: WithdrawInvitationMemberRequest) => { 
      return api.post(`folders/invite/withdraw`, {json: request}).json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetFolderById", props.folderId] })
    }
  })

  return { mutationWithdrawInvitationMember }
}

const FolderApi = {
  useGetMyFolders,
  useGetFolderById,
  useDeleteFolder,
  useRemoveMemberFolder,
  useAddMemberFolder,
  useWithdrawInvitationMember
};

export default FolderApi;
