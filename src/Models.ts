// Should folderize at some point

export type AppleMusicMeta = {
  total: number;
};

export type AppleMusicPageResponse<T> = {
  next: string;
  data: T[];
  meta: AppleMusicMeta;
};

export type AppleMusicListResponse<T> = {
  data: T[];
};

export type AppleMusicCatalogSearchResponse = {
  results: {
    songs: {
      data: AppleMusicSong[];
    };
  };
};

// Song
export type AppleMusicSongPreview = {
  url: string;
};

export type AppleMusicArtwork = {
  width: number;
  height: number;
  url: string;
  bgColor: string;
  textColor1: string;
  textColor2: string;
  textColor3: string;
  textColor4: string;
};

export type AppleMusicPlayParams = {
  id: string;
  kind: string;
};

export type AppleMusicSongAttributes = {
  previews: AppleMusicSongPreview[];
  artwork: AppleMusicArtwork;
  artistName: string;
  url: string;
  discNumber: number;
  genreNames: string[];
  durationInMillis: number;
  releaseDate: string;
  name: string;
  isrc: string;
  hasLyrics: boolean;
  albumName: string;
  playParams: AppleMusicPlayParams;
  trackNumber: number;
  composerName: string;
};

export type AppleMusicAlbum = {
  id: string;
  type: string;
  href: string;
};

export type AppleMusicAlbums = {
  href: string;
  data: AppleMusicAlbum[];
};

export type AppleMusicArtist = {
  id: string;
  type: string;
  href: string;
};

export type AppleMusicArtists = {
  href: string;
  data: AppleMusicArtist[];
};

export type AppleMusicRelationships = {
  albums: AppleMusicAlbums;
  artists: AppleMusicArtists;
};

export type AppleMusicSong = {
  id: string;
  type: string;
  href: string;
  attributes: AppleMusicSongAttributes;
  relationships: AppleMusicRelationships;
};
