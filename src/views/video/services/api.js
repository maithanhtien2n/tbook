import { AxiosInstance } from "@/services/api.js";

class ApiVideo {
  onApiGetListPostsVideo = () => {
    return AxiosInstance.get("posts-list");
  };

  onApiLike = (param, data) => {
    return AxiosInstance.put(`posts-list/${param}`, {
      likedEmail: data,
    });
  };
}

export const API_VIDEO = new ApiVideo();
