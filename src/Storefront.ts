export type AppleMusicStorefrontAttributes = {
  supportedLanguageTags: string[];
  defaultLanguageTag: string;
  explicitContentPolicy: string;
  name: string;
};

export type AppleMusicStorefront = {
  id: string;
  type: string;
  href: string;
  attributes: AppleMusicStorefrontAttributes;
};
