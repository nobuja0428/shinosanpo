import type { PracticalItem, WalkingRoute } from "./types";
import { image, official, publicData, trust } from "./shared";

const practical = (
  id: string,
  name: string,
  note: string,
  mapQuery: string,
  officialUrl: string,
  status: PracticalItem["status"] = "available"
): PracticalItem => ({
  id,
  name,
  note,
  mapQuery,
  officialUrl,
  verifiedAt: "2026-07-28",
  status
});

export const courses: WalkingRoute[] = [
  {
    id: "koenji-first",
    slug: "koenji-first",
    areaId: "koenji",
    title: "初めての高円寺：商店街と路地を2時間で歩く",
    summary: "北口の純情商店街から気象神社を経て、南口の商店街を歩き、新高円寺駅へ抜ける入門コース。",
    durationMin: 120,
    distanceKm: 1.8,
    budgetMinYen: 1000,
    budgetMaxYen: 2500,
    audience: ["一人", "友人"],
    tags: ["2時間以内", "予算2,500円以内", "一人で", "商店街", "歴史"],
    start: "JR高円寺駅 北口",
    goal: "新高円寺駅",
    escapeStations: ["高円寺駅", "新高円寺駅"],
    stops: [
      { order: 1, name: "JR高円寺駅 北口", role: "start", mapQuery: "JR高円寺駅 北口" },
      { order: 2, name: "高円寺純情商店街", role: "stop", mapQuery: "高円寺純情商店街" },
      { order: 3, name: "小杉湯", role: "stop", mapQuery: "小杉湯 高円寺" },
      { order: 4, name: "高円寺氷川神社・気象神社", role: "stop", mapQuery: "高円寺氷川神社 気象神社" },
      { order: 5, name: "高円寺パル商店街", role: "stop", mapQuery: "高円寺パル商店街" },
      { order: 6, name: "高円寺ルック商店街", role: "stop", mapQuery: "高円寺ルック商店街" },
      { order: 7, name: "新高円寺駅", role: "goal", mapQuery: "新高円寺駅" }
    ],
    transit: [
      practical("koenji-arrival", "高円寺駅", "STARTは北口です。出口は現地案内でご確認ください。", "JR高円寺駅", "https://www.jreast.co.jp/estation/station/info.aspx?StationCd=663"),
      practical("koenji-return", "新高円寺駅", "GOALから丸ノ内線へ移動できます。", "新高円寺駅", "https://www.tokyometro.jp/station/shin-koenji/index.html")
    ],
    foodBreaks: [
      practical("koenji-suzuya", "すず舎", "コース2番付近の食事候補。営業状況は公式ページをご確認ください。", "すず舎 高円寺", "https://www.kouenji.or.jp/shop/food/suzuya.html"),
      practical("koenji-trianon", "トリアノン洋菓子店 高円寺本店", "コース4番付近の休憩・持ち帰り候補。", "トリアノン 高円寺本店", "https://trianon.co.jp/shop/")
    ],
    toilets: [
      practical("koenji-chuo-public-toilet", "高円寺中央公衆便所", "コース4番付近。現地の利用可否をご確認ください。", "高円寺中央公衆便所", "https://www.city.suginami.tokyo.jp/s100/shisetsu/14703.html")
    ],
    publicationStatus: "published",
    image: image("/images/courses/course-koenji.webp", "高円寺駅北口から南口へ続く商店街と路地を表現したイメージ"),
    trust: trust("2026-07-28", "2026-07-28", [
      official("JR東日本 高円寺駅", "https://www.jreast.co.jp/estation/station/info.aspx?StationCd=663"),
      official("高円寺純情商店街", "https://www.kouenji.or.jp/"),
      publicData("杉並区 公衆便所", "https://www.city.suginami.tokyo.jp/s100/shisetsu/14703.html")
    ])
  },
  {
    id: "kichijoji-park",
    slug: "kichijoji-park",
    areaId: "kichijoji",
    title: "吉祥寺：井の頭公園と商店街を半日でつなぐ",
    summary: "公園の水辺を短く歩き、御殿山から中道通り、ハモニカ横丁へ戻る半日コース。",
    durationMin: 180,
    distanceKm: 3.2,
    budgetMinYen: 1500,
    budgetMaxYen: 4000,
    audience: ["一人", "デート"],
    tags: ["半日", "一人で", "デート", "公園", "カフェ"],
    start: "吉祥寺駅 公園口",
    goal: "ハモニカ横丁",
    escapeStations: ["吉祥寺駅"],
    stops: [
      { order: 1, name: "吉祥寺駅 公園口", role: "start", mapQuery: "吉祥寺駅 公園口" },
      { order: 2, name: "七井橋", role: "stop", mapQuery: "七井橋 井の頭公園" },
      { order: 3, name: "井の頭弁財天", role: "stop", mapQuery: "井の頭弁財天" },
      { order: 4, name: "御殿山通り", role: "stop", mapQuery: "御殿山通り 吉祥寺" },
      { order: 5, name: "中道通り", role: "stop", mapQuery: "中道通り 吉祥寺" },
      { order: 6, name: "武蔵野市立吉祥寺美術館", role: "stop", mapQuery: "武蔵野市立吉祥寺美術館" },
      { order: 7, name: "ハモニカ横丁", role: "goal", mapQuery: "ハモニカ横丁" }
    ],
    transit: [
      practical("kichijoji-arrival", "吉祥寺駅", "STARTは公園口です。出口は現地案内でご確認ください。", "吉祥寺駅 公園口", "https://www.jreast.co.jp/estation/stations/596.html")
    ],
    foodBreaks: [
      practical("kichijoji-chai-break", "chai break", "公園へ向かう前半の休憩候補。", "chai break 吉祥寺", "https://www.chai-break.com/"),
      practical("kichijoji-tsukada-suisan", "塚田水産", "GOAL付近の持ち帰り候補。", "塚田水産 吉祥寺", "https://tsukada-satsuma.com/")
    ],
    toilets: [
      practical("kichijoji-south-exit-public-toilet", "吉祥寺駅南口公衆トイレ", "START付近。現地の利用可否をご確認ください。", "吉祥寺駅南口公衆トイレ", "https://www.city.musashino.lg.jp/gomi_kankyo/gomi/bunbetsu_kaishu_torikumi/event_gomisogotaisaku/1045612.html")
    ],
    publicationStatus: "published",
    image: image("/images/courses/course-kichijoji.webp", "井の頭公園の水辺と街を巡る吉祥寺コースを表現したイメージ"),
    trust: trust("2026-07-28", "2026-07-28", [
      official("JR東日本 吉祥寺駅", "https://www.jreast.co.jp/estation/stations/596.html"),
      official("井の頭恩賜公園", "https://www.kensetsu.metro.tokyo.lg.jp/jimusho/seibuk/inokashira/"),
      official("武蔵野市立吉祥寺美術館", "https://www.musashino.or.jp/museum/")
    ])
  },
  {
    id: "asakusa-history",
    slug: "asakusa-history",
    areaId: "asakusa",
    title: "浅草：雷門からかっぱ橋へ、門前町の歴史を歩く",
    summary: "雷門・仲見世・浅草寺を押さえ、西側の商店街とかっぱ橋道具街を経て田原町駅へ抜けます。",
    durationMin: 150,
    distanceKm: 2.4,
    budgetMinYen: 1000,
    budgetMaxYen: 3500,
    audience: ["一人", "家族", "観光"],
    tags: ["半日", "一人で", "家族", "歴史", "商店街"],
    start: "浅草文化観光センター",
    goal: "田原町駅",
    escapeStations: ["浅草駅", "田原町駅"],
    stops: [
      { order: 1, name: "浅草文化観光センター", role: "start", mapQuery: "浅草文化観光センター" },
      { order: 2, name: "雷門", role: "stop", mapQuery: "雷門" },
      { order: 3, name: "仲見世通り", role: "stop", mapQuery: "仲見世通り" },
      { order: 4, name: "浅草寺", role: "stop", mapQuery: "浅草寺" },
      { order: 5, name: "西参道商店街", role: "stop", mapQuery: "浅草西参道商店街" },
      { order: 6, name: "かっぱ橋本通り", role: "stop", mapQuery: "かっぱ橋本通り" },
      { order: 7, name: "かっぱ橋道具街", role: "stop", mapQuery: "かっぱ橋道具街" },
      { order: 8, name: "田原町駅", role: "goal", mapQuery: "田原町駅" }
    ],
    transit: [
      practical("asakusa-arrival", "東京メトロ浅草駅", "浅草文化観光センターへ向かう起点です。", "東京メトロ 浅草駅", "https://www.tokyometro.jp/station/asakusa/index.html"),
      practical("asakusa-return", "田原町駅", "GOALから銀座線へ移動できます。", "田原町駅", "https://www.tokyometro.jp/station/tawaramachi/index.html")
    ],
    foodBreaks: [
      practical("asakusa-funawa-cafe", "ふなわかふぇ 浅草店", "START付近の短い休憩候補。", "ふなわかふぇ 浅草店", "https://funawa.jp/fr/40"),
      practical("asakusa-pelican-cafe", "ペリカンカフェ", "GOAL付近の休憩候補。", "ペリカンカフェ", "https://pelicancafe.jp/")
    ],
    toilets: [
      practical("komagatabashi-public-toilet", "駒形橋際公衆トイレ", "START付近。資料上の位置情報で、現地確認は未実施です。", "駒形橋際公衆トイレ", "https://www.city.taito.lg.jp/kenchiku/toshikeikaku/keikaku/toshikeikaku/shiryo.files/toshidukurinotamenokisosiryou_chapter5.pdf", "verification_pending")
    ],
    publicationStatus: "published",
    image: image("/images/courses/course-asakusa.webp", "浅草の門前町と寺社を巡る散歩コースを表現したイメージ"),
    trust: trust("2026-07-28", "2026-07-28", [
      official("浅草寺", "https://www.senso-ji.jp/"),
      official("かっぱ橋道具街", "https://www.kappabashi.or.jp/"),
      official("東京メトロ 浅草駅", "https://www.tokyometro.jp/station/asakusa/index.html")
    ])
  }
];
