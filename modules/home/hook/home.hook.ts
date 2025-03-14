import { useQuery } from "@tanstack/react-query";

const getMyTasks = () => {
  return useQuery({
    queryKey: ["myTasks"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      const data = await response.json();
      return data;
    },
  });
};

export { getMyTasks };
