import { makeToast, makeToastError } from "@/utils/toaster";
import {
  MutationFunction,
  MutationKey,
  useMutation,
  useMutationState,
  useQueryClient,
} from "@tanstack/react-query";

// import { toast } from "sonner";

export const useMutationData = (
  mutationKey: MutationKey,
  mutationFn: MutationFunction<any, any>,
  queryKey?: string,
  // onSuccess?: () => void,
  onSuccess?: (data: any) => void,
  setHaveError?: (value: boolean) => void
) => {
  // console.log("useMutationData");
  // const { toast } = useToast();
  const client = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess(data) {
      console.log(data, "data mutation");

      if (onSuccess) onSuccess(data); // Reset form only if success

      if (
        data?.status !== 200 &&
        data?.status !== 201 &&
        data?.status !== 304
      ) {
        if (setHaveError) setHaveError(true);
      } else {
        if (setHaveError) setHaveError(false);
      }

      if( data?.status === 200 || data?.status === 201 || data?.status === 304){
        return makeToast(data?.message)
      }else{
        return makeToastError(data?.message)
      }

      // return toast({
      //   title:
      //     data?.status === 200 || data?.status === 201 || data?.status === 304
      //       ? `Success`
      //       : `Error`,
      //   description: data?.message,
      //   variant:
      //     data?.status === 200 || data?.status === 201 || data?.status === 304
      //       ? "success"
      //       : "destructive",
      //   duration: 1000,
      // });

      // return toast.error(
      // data?.status === 200 || data?.status === 201 || data?.status === 304
      //   ? `Success`
      //   : `Error`,
      //   {
      //     description: data?.message||"Your Request was successfully completed",
      //   }
      // );
    },
    onError(error) {
      console.error("❌ Mutation error:", error);
      // toast("Error", {
      //   description: "Something went wrong. Please try again.",
      // });
    },
    onSettled: async () => {
      return await client.invalidateQueries({
        queryKey: [queryKey],
        exact: true,
      });
    },
  });

  return { mutate, isPending };
};

export const useMutationDataState = (mutationKey: MutationKey) => {
  const data = useMutationState({
    filters: { mutationKey },
    select: (mutation) => {
      return {
        variables: mutation.state.variables as any,
        status: mutation.state.status,
      };
    },
  });

  const latestVariables = data[data.length - 1];
  return { latestVariables };
};
