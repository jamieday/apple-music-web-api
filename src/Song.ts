export type Preview = {
  url: string;
};

export type Artwork = {
  width: number;
  height: number;
  url: string;
  bgColor: string;
  textColor1: string;
  textColor2: string;
  textColor3: string;
  textColor4: string;
};

export type PlayParams = {
  id: string;
  kind: string;
};

export type Attributes = {
  previews: Preview[];
  artwork: Artwork;
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
  playParams: PlayParams;
  trackNumber: number;
  composerName: string;
};

export type Album = {
  id: string;
  type: string;
  href: string;
};

export type Albums = {
  href: string;
  data: Album[];
};

export type Artist = {
  id: string;
  type: string;
  href: string;
};

export type Artists = {
  href: string;
  data: Artist[];
};

export type Relationships = {
  albums: Albums;
  artists: Artists;
};

export type Song = {
  id: string;
  type: string;
  href: string;
  attributes: Attributes;
  relationships: Relationships;
};

export type ListResponse<T> = {
  data: T[];
};

export type SongSearchResponse = {
  results: {
    songs: {
      data: Song[];
    };
  };
};
