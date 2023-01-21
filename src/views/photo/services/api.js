import { AxiosInstance } from "@/services/api.js";

class ApiPhoto {
  onApiGetListPostsPhoto = () => {
    return AxiosInstance.get("posts-list");
  };

  onApiLike = (param, data) => {
    return AxiosInstance.put(`posts-list/${param}`, {
      likedEmail: data,
    });
  };
}

export const API_PHOTO = new ApiPhoto();
