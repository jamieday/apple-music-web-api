export type PlayParams = {
  id: string;
  kind: string;
  isLibrary: boolean;
};

export type Attributes = {
  playParams: PlayParams;
  canEdit: boolean;
  hasCatalog: boolean;
  dateAdded: Date;
  name: string;
};

export type Playlist = {
  id: string;
  type: string;
  href: string;
  attributes: Attributes;
};

export type Meta = {
  total: number;
};

export type PageResponse<T> = {
  next: string;
  data: T[];
  meta: Meta;
};
