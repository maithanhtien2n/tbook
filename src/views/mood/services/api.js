import { AxiosInstance } from "@/services/api.js";

class ApiMood {
  onApiGetListPostsMood = () => {
    return AxiosInstance.get("posts-list");
  };

  onApiLike = (param, data) => {
    return AxiosInstance.put(`posts-list/${param}`, {
      likedEmail: data,
    });
  };
}

export const API_MOOD = new ApiMood();
