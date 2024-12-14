// 参考: https://typescriptbook.jp/reference/values-types-variables/enum/enum-problems-and-alternatives-to-enums#%E5%88%97%E6%8C%99%E5%9E%8B%E3%81%AE%E4%BB%A3%E6%9B%BF%E6%A1%882-%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%83%AA%E3%83%86%E3%83%A9%E3%83%AB
export const Suit = {
  Spade: "spade",
  Heart: "heart",
  Diamond: "diamond",
  Club: "club",
} as const;

export type Suit = (typeof Suit)[keyof typeof Suit];
