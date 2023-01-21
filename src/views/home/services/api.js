import { AxiosInstance } from "@/services/api.js";

class ApiHome {
  onApiGetListAccount = () => {
    return AxiosInstance.get("account");
  };

  onApiGetListPosts = () => {
    return AxiosInstance.get("posts-list");
  };

  onApiLike = (param, data) => {
    return AxiosInstance.put(`posts-list/${param}`, {
      likedEmail: data,
    });
  };

  onApiUploadPosts = (data) => {
    return AxiosInstance.post("posts-list", data);
  };
}

export const API_HOME = new ApiHome();
