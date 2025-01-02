export type SEOData = {
  supportLanguages: string[];
  fallbackLanguage: string;
  languages: Record<
    string,
    { title: string; description: string; image: string }
  >;
};

export const SEO_DATA: SEOData = {
  // TODO: Change to your own support languages
  supportLanguages: ["zh", "en", "ja"],
  fallbackLanguage: "en",
  // TODO: Change to your own SEO data
  languages: {
    zh: {
      title: "AI 视频创意素材站",
      description: "将任意素材转为有意思的视频",
      image: "/images/global/desc_zh.png",
    },
    en: {
      title: "AI Video Creative Material",
      description: "Turn any material into an interesting video",
      image: "/images/global/desc_en.png",
    },
    ja: {
      title: "AIポデオクリエイティブ素材",
      description: "あらゆる素材を興味深いビデオに変える",
      image: "/images/global/desc_ja.png",
    },
  },
};
