import axios from "axios";
import { Song, ListResponse, CatalogSearchResponse } from "./Models";
import { PageResponse, Playlist } from "./Playlist";
import { Storefront } from "./Storefront";

type CallApiOptions = {
  method: "GET" | "POST";
  userToken: string;
  data?: any;
};

// weird, should do something more node-js-module-idiomatic
export const initializeAppleMusicApi = (developerToken: string) => {
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
        ...(options?.userToken && { "Music-User-Token": options.userToken }),
      },
    });
    return response.data;
  };
  const pageApi = async function* <T>(
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

type TrackPayload = { id: string; type: string };

const appleMusicApi = (
  callApi: <T>(endpoint: string, options?: CallApiOptions) => Promise<T>,
  pageApi: <T>(
    endpoint: string,
    options?: CallApiOptions
  ) => AsyncIterableIterator<T>
) => {
  const getMyStorefront = (
    userToken: string
  ): Promise<ListResponse<Storefront>> =>
    callApi("/v1/me/storefront", {
      method: "GET",
      userToken,
    });
  const getSong = (storefront: string, id: string): Promise<Song | undefined> =>
    callApi<ListResponse<Song>>(
      `/v1/catalog/${encodeURIComponent(storefront)}/songs/${encodeURIComponent(
        id
      )}`
    ).then((songs) => (songs.data.length > 0 ? songs.data[0] : undefined));
  const getSongs = (
    storefront: string,
    ids: string[]
  ): Promise<ListResponse<Song>> =>
    callApi(
      `/v1/catalog/${encodeURIComponent(storefront)}/songs?ids=${ids
        .map(encodeURIComponent)
        .join(",")}`
    );
  const getSongsByIsrc = (
    storefront: string,
    isrc: string
  ): Promise<ListResponse<Song>> =>
    callApi(
      `/v1/catalog/${encodeURIComponent(
        storefront
      )}/songs?filter[isrc]=${encodeURIComponent(isrc)}`
    );
  const searchSongs = (
    storefront: string,
    { query, limit }: { query: string; limit: number }
  ): Promise<CatalogSearchResponse> =>
    callApi(
      `/v1/catalog/${encodeURIComponent(
        storefront
      )}/search?term=${encodeURIComponent(query)}&limit=${limit}&types=songs`
    );
  const getMyPlaylists = (userToken: string): AsyncIterableIterator<Playlist> =>
    pageApi("/v1/me/library/playlists", { method: "GET", userToken });
  const createPlaylist = (
    userToken: string,
    attributes: {
      name: string;
      description: string;
    },
    initialTracks: TrackPayload[]
  ): Promise<void> =>
    callApi("/v1/me/library/playlists", {
      method: "POST",
      userToken,
      data: {
        attributes,
        relationships: {
          tracks: {
            data: initialTracks,
          },
        },
      },
    });
  const addTracksToPlaylist = (
    userToken: string,
    playlistId: string,
    tracks: TrackPayload[]
  ): Promise<ListResponse<any>> =>
    callApi(
      `/v1/me/library/playlists/${encodeURIComponent(playlistId)}/tracks`,
      {
        method: "POST",
        userToken,
        data: {
          data: tracks.map(({ id, type }) => ({ id, type })),
        },
      }
    );
  return {
    // Storefront
    getMyStorefront,

    // Songs
    getSong,
    getSongs,
    getSongsByIsrc,
    searchSongs,

    // Playlists
    getMyPlaylists,
    createPlaylist,
    addTracksToPlaylist,
  };
};
