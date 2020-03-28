import axios from "axios";
import { Song, ListResponse } from "./Song";
import { PageResponse, Playlist } from "./Playlist";

type CallApiOptions = {
  method: "GET" | "POST";
  userToken: string;
  data?: any;
};

export const initializeAppleMusicApi = (
  developerToken: string
): AppleMusicApiInterface => {
  const callApi = async <T>(
    endpoint: string,
    options?: CallApiOptions
  ): Promise<T> => {
    const response = await axios.request({
      url: `https://api.music.apple.com${endpoint}`,
      method: options?.method ?? "GET",
      data: options?.data,
      headers: {
        Authorization: `Bearer ${developerToken}`,
        ...(options?.userToken && { "Music-User-Token": options.userToken })
      }
    });
    return response.data;
  };
  const pageApi = async function*<T>(
    endpoint: string,
    options?: CallApiOptions
  ) {
    let page;
    do {
      page = await callApi<PageResponse<T>>(endpoint, options);
      endpoint = page.next;
      yield* page.data;
    } while (page.next);
  };

  return appleMusicApi(callApi, pageApi);
};

const storefront = "us";

type TrackPayload = { id: string; type: string };

type AppleMusicApiInterface = {
  fetchSong: (id: string) => Promise<Song>;
  fetchSongs: (ids: string[]) => Promise<ListResponse<Song>>;

  fetchLibraryPlaylists: (userToken: string) => AsyncIterableIterator<Playlist>;
  createPlaylist: (
    userToken: string,
    attributes: {
      name: string;
      description: string;
    },
    initialTracks: TrackPayload[]
  ) => Promise<void>;
  addTracksToPlaylist: (
    userToken: string,
    playlistId: string,
    tracks: TrackPayload[]
  ) => Promise<ListResponse<any>>;
  //     /v1/me/library/playlists/{id}/tracks
};

const appleMusicApi = (
  callApi: <T>(endpoint: string, options?: CallApiOptions) => Promise<T>,
  pageApi: <T>(
    endpoint: string,
    options?: CallApiOptions
  ) => AsyncIterableIterator<T>
): AppleMusicApiInterface => ({
  fetchSong: id => callApi(`/v1/catalog/${storefront}/songs/${id}`),
  fetchSongs: ids =>
    callApi(
      `/v1/catalog/${storefront}/songs?ids=${ids
        .map(encodeURIComponent)
        .join(",")}`
    ),
  fetchLibraryPlaylists: userToken =>
    pageApi("/v1/me/library/playlists", { method: "GET", userToken }),
  createPlaylist: (userToken, attributes, initialTracks) =>
    callApi("/v1/me/library/playlists", {
      method: "POST",
      userToken,
      data: {
        attributes,
        relationships: {
          tracks: {
            data: initialTracks
          }
        }
      }
    }),
  addTracksToPlaylist: (userToken, playlistId, tracks) =>
    callApi(
      `/v1/me/library/playlists/${encodeURIComponent(playlistId)}/tracks`,
      {
        method: "POST",
        userToken,
        data: {
          data: tracks.map(({ id, type }) => ({ id, type }))
        }
      }
    )
});
