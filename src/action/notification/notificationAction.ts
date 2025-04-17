import { get_All_notificationApi, read_notification_Api } from "@/services/user_side_api/notifications/route";
import { makeToastError } from "@/utils/toaster";

export const notificationAction = async (id:string) => {
  try {
    const response = await get_All_notificationApi(id);
    // console.log(response);
    if (response.status === 200 || response.status === 201) {
      return {
        data: response.data.notifications,
        message: response.data.message,
        status: response.status,
      };
    }
    if (response.status === 203) {
      return {
        data: [],
        message: response.data.message,
        status: response.status,
      };
    }
  } catch (error: any) {
    if (error) {
      console.log(error);

      makeToastError(error.response.data.message);
      return {
        data: [],
        status: 404,
        message: error.response.data.message || "Error Fetching Notifications",
      };
    }
  }
};

// 2.
export const readNotificationAction = async ({id,userId}:{id: string; userId: string}) => {
  try {
    const response = await read_notification_Api({id,userId});
    // console.log(response);
    if (response.status === 200 || response.status === 201) {
      return {
        data: response.data.notifications,
        message: response.data.message,
        status: response.status,
      };
    }
    if (response.status === 203) {
      return {
        data: [],
        message: response.data.message,
        status: response.status,
      };
    }
  } catch (error: any) {
    if (error) {
      console.log(error);

      // makeToastError(error.response.data.message);
      return {
        data: [],
        status: 404,
        message: error.response.data.message || "Error Fetching Notifications",
      };
    }
  }
};
