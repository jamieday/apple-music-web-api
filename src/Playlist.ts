export type AppleMusicPlaylistPlayParams = {
  id: string;
  kind: string;
  isLibrary: boolean;
};

export type AppleMusicPlaylistAttributes = {
  playParams: AppleMusicPlaylistPlayParams;
  canEdit: boolean;
  hasCatalog: boolean;
  dateAdded: Date;
  name: string;
};

export type AppleMusicPlaylist = {
  id: string;
  type: string;
  href: string;
  attributes: AppleMusicPlaylistAttributes;
};
