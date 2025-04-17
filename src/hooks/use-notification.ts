import { readNotificationAction } from "@/action/notification/notificationAction";
import { useMutationData } from "./useMutationData";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateNotificationStatus = () => {
  const client = useQueryClient();
  const { mutate } = useMutationData(
    ["read-notification"], // Ensure unique mutation key per product
    ({ id, userId }: { id: string; userId: string }) => readNotificationAction({id,userId}), // Pass newStatus
    "notification-status",
    (data) => {
      if (data.status === 200 || data.status === 201) {
        client.invalidateQueries({ queryKey: ["all-notifications"] });
      }
      //
    }
  );

  const onReadNotification = ({ id, userId }: { id: string; userId: string }) => {
    mutate({ id, userId });
  };

  return { onReadNotification };
};
