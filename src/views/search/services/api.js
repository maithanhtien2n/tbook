import { AxiosInstance } from "@/services/api.js";

class ApiSearch {
  onApiGetListPostsSearch = () => {
    return AxiosInstance.get("posts-list");
  };

  onApiLike = (param, data) => {
    return AxiosInstance.put(`posts-list/${param}`, {
      likedEmail: data,
    });
  };

  onApiGetListAccount = () => {
    return AxiosInstance.get("account");
  };
}

export const API_SEARCH = new ApiSearch();
