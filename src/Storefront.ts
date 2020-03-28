export type Attributes = {
  supportedLanguageTags: string[];
  defaultLanguageTag: string;
  explicitContentPolicy: string;
  name: string;
};

export type Storefront = {
  id: string;
  type: string;
  href: string;
  attributes: Attributes;
};
