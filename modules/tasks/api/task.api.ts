import api from "../../../api/api";
import {
  useMutation,
  useQuery,
  type UseMutationOptions,
} from "@tanstack/react-query";

// const useMutationCreateTask = <TData, TError = Error>(
//   options?: Omit<UseMutationOptions<TData, TError>, "queryKey">
// ) => {
//   return useMutation({
//     // queryKey: ["useMutationCreateTask"],
//     queryFn: async () => {
//       const res = await api.post("tasks/create");
//       // biome-ignore lint/suspicious/noExplicitAny: <explanation>
//       return ((await res.json()) as any).data as TData;
//     },
//     ...options,
//   });
// };

// export { useMutationCreateTask };
