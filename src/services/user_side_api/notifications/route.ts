import { GET_NOTIFICATIONS_URL, READ_NOTIFICATION_URL } from "@/services/api/notification-urlPth";
import { API } from "../auth/route_url";

export const get_All_notificationApi = async (id:string) =>
  await API.get(`${GET_NOTIFICATIONS_URL}/${id}`, { withCredentials: true });




export const read_notification_Api = async ({id,userId}:{id: string; userId: string}) =>
    await API.put(`${READ_NOTIFICATION_URL}/${id}/${userId}`,{}, { withCredentials: true });
  
  
  