import type { Story } from "./types";
import { image, official, trust } from "./shared";

export const stories: Story[] = [
  {
    id: "koenji-shopping-streets",
    slug: "koenji-shopping-streets",
    areaId: "koenji",
    title: "高円寺は、商店街を一本に決めないほうが面白い。",
    category: "街の読み物",
    readTime: "約4分",
    summary: "純情商店街からパル、ルックへ。駅の北と南をつなぎ、街の切り替わりを読む短いガイドです。",
    intro: "高円寺の面白さは、一つの有名スポットを目指すことより、商店街の切り替わりを歩いて確かめることにあります。",
    sections: [
      { heading: "北口は、散歩の速度を落としやすい", body: "駅を出て純情商店街へ入ると、飲食店や生活に近い店が短い間隔で並びます。目的を一つに絞らず、気になった通りを一本だけ横へ入る歩き方があります。" },
      { heading: "南口では、アーケードが街をつなぐ", body: "氷川神社を経由して南へ回ると、パル商店街とルック商店街が連続します。雨や強い日差しを避けやすい区間もあります。" },
      { heading: "二つの駅を結ぶ", body: "新高円寺駅をゴールにすると同じ道を引き返さずに済みます。現地未確認のため、歩きやすさと混雑は当日にご確認ください。" }
    ],
    author: "おさんぽクラブ東京編集部",
    publicationStatus: "published",
    image: image("/images/stories/story-koenji-shopping-streets.webp", "高円寺の複数の商店街と路地を歩き継ぐ読み物を表現したイメージ"),
    trust: trust("2026-07-27", null, [official("高円寺純情商店街", "https://www.kouenji.or.jp/")])
  },
  {
    id: "inokashira-short-walk",
    slug: "inokashira-short-walk",
    areaId: "kichijoji",
    title: "井の頭公園は、一周しなくても十分に深い。",
    category: "公園の読み物",
    readTime: "約4分",
    summary: "七井橋、井の頭池、弁財天。駅から近い公園を短く歩き、街へ戻る流れを考えるガイドです。",
    intro: "井の頭公園は広いからこそ、全部を見るより、橋・水辺・木陰を一つずつ選ぶ歩き方もできます。",
    sections: [
      { heading: "最初に七井橋で景色をつかむ", body: "公園へ下りたら、橋の上から池の広がりを確認します。歩く範囲を決める目印にもなります。" },
      { heading: "池を一周しない選択", body: "混雑や暑さが気になる日は、弁財天周辺までに絞り、木陰で過ごす時間を増やす選択もあります。" },
      { heading: "街へ戻る道も散歩に含める", body: "御殿山や中道通りを経由すれば、公園の緑から小さな店が続く街へ切り替わります。営業情報は各公式情報をご確認ください。" }
    ],
    author: "おさんぽクラブ東京編集部",
    publicationStatus: "published",
    image: image("/images/stories/story-inokashira-short-walk.webp", "井の頭公園の橋、水辺、木陰を短く巡る読み物を表現したイメージ"),
    trust: trust("2026-07-27", null, [official("井の頭恩賜公園", "https://www.kensetsu.metro.tokyo.lg.jp/jimusho/seibuk/inokashira/")])
  },
  {
    id: "asakusa-first-hour",
    slug: "asakusa-first-hour",
    areaId: "asakusa",
    title: "浅草の最初の1時間は、雷門の向かいから始める。",
    category: "街の読み物",
    readTime: "約4分",
    summary: "浅草文化観光センターで当日の案内を確認してから、門前町とかっぱ橋方面へ進むためのガイドです。",
    intro: "浅草は人の流れに入る前に、地図と当日の案内を確認しておくと進路を変えやすくなります。",
    sections: [
      { heading: "最初に情報を集める", body: "浅草文化観光センターで地図や当日の案内を確認しておくと、雷門周辺の混雑に合わせて進路を変えやすくなります。" },
      { heading: "仲見世は通過点にもできる", body: "仲見世を抜けて浅草寺へ進んだ後、西側の通りへ回ると、門前町の異なる表情が見えてきます。" },
      { heading: "最後は道具街へ", body: "かっぱ橋まで歩くと、寺社中心の景色から専門店の街へ変化します。店舗営業は各公式情報をご確認ください。" }
    ],
    author: "おさんぽクラブ東京編集部",
    publicationStatus: "published",
    image: image("/images/stories/story-asakusa-first-hour.webp", "浅草の街を見渡してから門前町へ入る読み物を表現したイメージ"),
    trust: trust("2026-07-27", null, [
      official("浅草文化観光センター", "https://www.city.taito.lg.jp/bunka_kanko/kankoinfo/info/oyakudachi/kankocenter/a-tic-gaiyo.html"),
      official("浅草寺", "https://www.senso-ji.jp/")
    ])
  }
];
