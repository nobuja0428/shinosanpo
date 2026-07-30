export type AreaId = "koenji" | "kichijoji" | "asakusa";
export type PublicationStatus = "published" | "archived" | "verification_pending";
export type EventStatus =
  | "scheduled"
  | "ongoing"
  | "ended"
  | "cancelled"
  | "postponed"
  | "verification_pending";

export interface Source {
  label: string;
  url: string;
  kind: "official" | "public-data";
}

export interface TrustInfo {
  updatedAt: string;
  verifiedAt: string | null;
  isFieldChecked: boolean;
  publicInfoBased: boolean;
  aiAssisted: boolean;
  sources: Source[];
}

export interface ImageDisclosure {
  src: string;
  alt: string;
  width: number;
  height: number;
  kind: "ai-image" | "photo";
  label: "イメージ" | "実景";
}

export interface Area {
  id: AreaId;
  slug: AreaId;
  name: string;
  municipality: string;
  lead: string;
  description: string;
  tags: string[];
  stations: string[];
  durationLabel: string;
  budgetLabel: string;
  mapQuery: string;
  publicationStatus: PublicationStatus;
  image: ImageDisclosure;
  trust: TrustInfo;
}

export interface PracticalItem {
  id: string;
  name: string;
  note: string;
  mapQuery: string;
  officialUrl: string;
  verifiedAt: string;
  status: "available" | "verification_pending";
}

export interface RouteStop {
  order: number;
  name: string;
  role: "start" | "stop" | "goal";
  mapQuery: string;
}

export interface WalkingRoute {
  id: string;
  slug: string;
  areaId: AreaId;
  title: string;
  summary: string;
  durationMin: number;
  distanceKm: number;
  budgetMinYen: number;
  budgetMaxYen: number;
  audience: string[];
  tags: string[];
  start: string;
  goal: string;
  escapeStations: string[];
  stops: RouteStop[];
  transit: PracticalItem[];
  foodBreaks: PracticalItem[];
  toilets: PracticalItem[];
  publicationStatus: PublicationStatus;
  image: ImageDisclosure;
  trust: TrustInfo;
}

export interface Spot {
  id: string;
  slug: string;
  areaId: AreaId;
  name: string;
  category: string;
  summary: string;
  tags: string[];
  mapQuery: string;
  officialUrl: string;
  publicationStatus: PublicationStatus;
  image: ImageDisclosure;
  trust: TrustInfo;
}

export interface StorySection {
  heading: string;
  body: string;
}

export interface Story {
  id: string;
  slug: string;
  areaId: AreaId;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  intro: string;
  sections: StorySection[];
  author: "おさんぽクラブ東京編集部";
  publicationStatus: PublicationStatus;
  image: ImageDisclosure;
  trust: TrustInfo;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  area: string;
  startAt: string;
  endAt: string;
  manualOverride: EventStatus | null;
  officialUrl: string;
  publicationStatus: PublicationStatus;
  trust: TrustInfo;
}

export type ContentType = "area" | "course" | "spot" | "story";
