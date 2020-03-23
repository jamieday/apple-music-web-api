import axios from "axios";
import { Song, ListResponse } from "./Song";

export const initializeAppleMusicApi = (
  developerToken: string
): AppleMusicApiInterface => {
  const callApi = async <T>(endpoint: string): Promise<T> => {
    const response = await axios.get(`https://api.music.apple.com${endpoint}`, {
      headers: { Authorization: `Bearer ${developerToken}` }
    });
    return response.data;
  };

  return appleMusicApi(callApi);
};

const storefront = "us";

type AppleMusicApiInterface = {
  fetchSong: (id: string) => Promise<Song>;
  fetchSongs: (ids: string[]) => Promise<ListResponse<Song>>;
};

const appleMusicApi = (
  callApi: <T>(endpoint: string) => Promise<T>
): AppleMusicApiInterface => ({
  fetchSong: id => callApi(`/v1/catalog/${storefront}/songs/${id}`),
  fetchSongs: ids =>
    callApi(
      `/v1/catalog/${storefront}/songs?ids=${ids
        .map(encodeURIComponent)
        .join(",")}`
    )
});
