import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../../services/apiUserData";

export function useUserData() {
  const {
    isLoading,
    error,
    data: user,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserData,
  });

  return { isLoading, error, user };
}
