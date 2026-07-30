import type { Spot } from "./types";
import { image, official, trust } from "./shared";

export const spots: Spot[] = [
  {
    id: "koenji-junjo",
    slug: "koenji-junjo",
    areaId: "koenji",
    name: "高円寺純情商店街",
    category: "商店街",
    summary: "高円寺駅北口から始まる商店街。北側散歩の導入に組み込みやすい場所です。",
    tags: ["商店街", "一人向け", "食事・休憩"],
    mapQuery: "高円寺純情商店街",
    officialUrl: "https://www.kouenji.or.jp/",
    publicationStatus: "published",
    image: image("/images/spots/spot-koenji-junjo.webp", "高円寺の低層商店街と路地を表現したイメージ"),
    trust: trust("2026-07-27", "2026-07-28", [
      official("高円寺純情商店街", "https://www.kouenji.or.jp/")
    ])
  },
  {
    id: "koenji-hikawa",
    slug: "koenji-hikawa",
    areaId: "koenji",
    name: "高円寺氷川神社・気象神社",
    category: "神社",
    summary: "高円寺駅南側で、商店街歩きに歴史の立ち寄りを加えられる場所です。",
    tags: ["歴史", "一人向け"],
    mapQuery: "高円寺氷川神社 気象神社",
    officialUrl: "https://koenji-hikawa.com/",
    publicationStatus: "published",
    image: image("/images/spots/spot-koenji-hikawa.webp", "高円寺氷川神社の鳥居と境内を表現したイメージ"),
    trust: trust("2026-07-27", "2026-07-28", [
      official("高円寺氷川神社・気象神社", "https://koenji-hikawa.com/")
    ])
  },
  {
    id: "inokashira-park",
    slug: "inokashira-park",
    areaId: "kichijoji",
    name: "井の頭恩賜公園",
    category: "公園",
    summary: "池、水辺、木陰を楽しめる吉祥寺散歩の中心。歩く範囲を調整しやすい公園です。",
    tags: ["公園", "一人向け", "デート", "家族"],
    mapQuery: "井の頭恩賜公園",
    officialUrl: "https://www.kensetsu.metro.tokyo.lg.jp/jimusho/seibuk/inokashira/",
    publicationStatus: "published",
    image: image("/images/spots/spot-inokashira-park.webp", "井の頭恩賜公園の緑と水辺を表現したイメージ"),
    trust: trust("2026-07-27", "2026-07-28", [
      official(
        "井の頭恩賜公園",
        "https://www.kensetsu.metro.tokyo.lg.jp/jimusho/seibuk/inokashira/"
      )
    ])
  },
  {
    id: "kichijoji-art-museum",
    slug: "kichijoji-art-museum",
    areaId: "kichijoji",
    name: "武蔵野市立吉祥寺美術館",
    category: "文化施設",
    summary: "駅近くで雨天時にも組み込みやすい文化施設。開館状況は公式情報をご確認ください。",
    tags: ["雨の日候補", "文化", "一人向け"],
    mapQuery: "武蔵野市立吉祥寺美術館",
    officialUrl: "https://www.musashino.or.jp/museum/",
    publicationStatus: "published",
    image: image("/images/spots/spot-kichijoji-art-museum.webp", "吉祥寺の都市型美術館を表現したイメージ"),
    trust: trust("2026-07-27", "2026-07-28", [
      official("武蔵野市立吉祥寺美術館", "https://www.musashino.or.jp/museum/")
    ])
  },
  {
    id: "sensoji",
    slug: "sensoji",
    areaId: "asakusa",
    name: "浅草寺周辺",
    category: "寺社・歴史",
    summary: "浅草の歴史散歩の中心。周辺の混雑状況に合わせて歩く範囲を調整できます。",
    tags: ["歴史", "一人向け", "家族"],
    mapQuery: "浅草寺",
    officialUrl: "https://www.senso-ji.jp/",
    publicationStatus: "published",
    image: image("/images/spots/spot-sensoji.webp", "浅草寺周辺の門前町と寺院建築を表現したイメージ"),
    trust: trust("2026-07-27", "2026-07-28", [
      official("浅草寺", "https://www.senso-ji.jp/")
    ])
  },
  {
    id: "kappabashi",
    slug: "kappabashi",
    areaId: "asakusa",
    name: "かっぱ橋道具街",
    category: "商店街",
    summary: "調理道具や器の専門店が続く通り。営業状況は各店の公式情報をご確認ください。",
    tags: ["商店街", "買い物", "一人向け"],
    mapQuery: "かっぱ橋道具街",
    officialUrl: "https://www.kappabashi.or.jp/",
    publicationStatus: "published",
    image: image("/images/spots/spot-kappabashi.webp", "かっぱ橋道具街の調理器具店が並ぶ通りを表現したイメージ"),
    trust: trust("2026-07-27", "2026-07-28", [
      official("かっぱ橋道具街", "https://www.kappabashi.or.jp/")
    ])
  }
];
