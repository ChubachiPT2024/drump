// 参考: https://typescriptbook.jp/reference/values-types-variables/enum/enum-problems-and-alternatives-to-enums#%E5%88%97%E6%8C%99%E5%9E%8B%E3%81%AE%E4%BB%A3%E6%9B%BF%E6%A1%882-%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%83%AA%E3%83%86%E3%83%A9%E3%83%AB
export const Rank = {
  Ace: 'A',
  Two: '2',
  Three: '3',
  Four: '4',
  Five: '5',
  Six: '6',
  Seven: '7',
  Eight: '8',
  Nine: '9',
  Ten: '10',
  Jack: 'J',
  Queen: 'Q',
  King: 'K'
} as const;

export type Rank = (typeof Rank)[keyof typeof Rank];
