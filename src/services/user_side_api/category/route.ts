
import { GET_CATEGORY_URL, GET_CATEGORY_WITH_SUB_URL } from "@/services/api/category-urlPath";
import { API } from "../auth/route_url";



export const get_Category_Api = async (admin: "admin"|"") =>
  await API.get(GET_CATEGORY_URL, {
    withCredentials: true,
    params: {
      admin,
    },
  });

export const get_Category_With_Sub_Api = async () =>
  await API.get(GET_CATEGORY_WITH_SUB_URL, { withCredentials: true });

