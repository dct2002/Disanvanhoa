export type HeritageType = "tangible" | "intangible" | "documentary";

export type Region = "bac-bo" | "trung-bo" | "tay-nguyen" | "nam-bo";

export type Era = "co-dai" | "trung-dai" | "can-dai" | "hien-dai";

export interface Coordinates {
  lat: number;
  lng: number;
}

/** Position on the stylized SVG map, expressed as percentages (0-100). */
export interface MapPosition {
  x: number;
  y: number;
}

export interface Heritage {
  id: string;
  name: string;
  type: HeritageType;
  location: string;
  region: Region;
  era: Era;
  year?: number;
  unescoYear?: number;
  description: string;
  longDescription: string;
  image: string;
  gallery?: string[];
  model3D?: string;
  unesco?: boolean;
  coordinates?: Coordinates;
  mapPosition?: MapPosition;
  tags?: string[];
  audio?: string;
  video?: string;
  practitioners?: string;
  culturalSpace?: string;
  significance?: string;
  material?: string;
  origin?: string;
  pattern?: string;
}

export interface TimelineEvent {
  id: string;
  year: number;
  yearLabel: string;
  title: string;
  description: string;
  relatedHeritageIds?: string[];
  image: string;
}

export interface RegionInfo {
  id: string;
  name: string;
  region: Region;
  heritageCount: number;
  image: string;
  mapPosition: MapPosition;
  description: string;
}

export interface UnescoStat {
  id: string;
  value: number;
  suffix?: string;
  label: string;
}

export const heritageTypeLabels: Record<HeritageType, string> = {
  tangible: "Di sản vật thể",
  intangible: "Di sản phi vật thể",
  documentary: "Di sản tư liệu",
};

export const regionLabels: Record<Region, string> = {
  "bac-bo": "Bắc Bộ",
  "trung-bo": "Trung Bộ",
  "tay-nguyen": "Tây Nguyên",
  "nam-bo": "Nam Bộ",
};

export const eraLabels: Record<Era, string> = {
  "co-dai": "Cổ đại",
  "trung-dai": "Trung đại",
  "can-dai": "Cận đại",
  "hien-dai": "Hiện đại",
};
