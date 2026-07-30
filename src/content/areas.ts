import type { Area } from "./types";
import { image, official, trust } from "./shared";

export const areas: Area[] = [
  {
    id: "koenji",
    slug: "koenji",
    name: "高円寺",
    municipality: "杉並区",
    lead: "古着と音楽、商店街と生活の路地が隣り合う街。",
    description:
      "北口の商店街から南口のアーケードまで、歩く方向で表情が変わります。短時間でも寄り道が生まれやすい街です。",
    tags: ["古着", "商店街", "一人散歩"],
    stations: ["高円寺駅", "新高円寺駅"],
    durationLabel: "2〜4時間",
    budgetLabel: "1,000〜3,000円",
    mapQuery: "高円寺駅",
    publicationStatus: "published",
    image: image(
      "/images/areas/area-koenji.webp",
      "高円寺の商店街と路地を表現したイメージ",
      1200,
      800
    ),
    trust: trust("2026-07-27", null, [
      official("高円寺純情商店街", "https://www.kouenji.or.jp/"),
      official("高円寺氷川神社・気象神社", "https://koenji-hikawa.com/")
    ])
  },
  {
    id: "kichijoji",
    slug: "kichijoji",
    name: "吉祥寺",
    municipality: "武蔵野市",
    lead: "公園、水辺、商店街が近い距離にまとまる街。",
    description:
      "井の頭公園で緑を楽しんだ後、中道通りや駅前の商店街へ。自然と買い物を無理なく組み合わせられます。",
    tags: ["公園", "カフェ", "デート"],
    stations: ["吉祥寺駅"],
    durationLabel: "2〜5時間",
    budgetLabel: "1,500〜4,000円",
    mapQuery: "吉祥寺駅 井の頭恩賜公園",
    publicationStatus: "published",
    image: image(
      "/images/areas/area-kichijoji.webp",
      "吉祥寺の緑と水辺の街歩きを表現したイメージ",
      1200,
      800
    ),
    trust: trust("2026-07-27", null, [
      official(
        "井の頭恩賜公園",
        "https://www.kensetsu.metro.tokyo.lg.jp/jimusho/seibuk/inokashira/"
      ),
      official("武蔵野市立吉祥寺美術館", "https://www.musashino.or.jp/museum/")
    ])
  },
  {
    id: "asakusa",
    slug: "asakusa",
    name: "浅草",
    municipality: "台東区",
    lead: "門前町の歴史と、道具街・水辺まで楽しめる下町。",
    description:
      "雷門周辺だけで終わらせず、浅草寺の西側やかっぱ橋まで歩くと、観光地と生活の街の両方が見えてきます。",
    tags: ["歴史", "建築", "下町"],
    stations: ["浅草駅", "田原町駅"],
    durationLabel: "2〜5時間",
    budgetLabel: "1,000〜4,000円",
    mapQuery: "浅草寺 かっぱ橋道具街",
    publicationStatus: "published",
    image: image(
      "/images/areas/area-asakusa.webp",
      "浅草の門前町と下町の街並みを表現したイメージ",
      1200,
      800
    ),
    trust: trust("2026-07-27", null, [
      official("浅草寺", "https://www.senso-ji.jp/"),
      official("かっぱ橋道具街", "https://www.kappabashi.or.jp/")
    ])
  }
];
