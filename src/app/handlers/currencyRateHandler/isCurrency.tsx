export interface currencyTypes {
  name1: string;
  name2: string;
  persianName1: string;
  persianName2: string;
  code: string;
  command: string;
  urlName: string;
}
export const isCurrency = (input: string) => {
  const currencies: currencyTypes[] = [
    {
      name1: "United States Dollar",
      name2: "Dollar",
      persianName1: "دلار آمریکا",
      persianName2: "دلار",
      code: "USD",
      command: "/USD",
      urlName: "usd",
    },
    {
      name1: "Euro",
      name2: "",
      persianName1: "یورو",
      persianName2: "یورو",
      code: "EUR",
      command: "/EUR",
      urlName: "eur",
    },
    {
      name1: "British Pound Sterling",
      name2: "Pound",
      persianName1: "پوند بریتانیا",
      persianName2: "پوند",
      urlName: "gbp",
      code: "GBP",
      command: "/GBP",
    },

    {
      name1: "Turkish Lira",
      name2: "Lira",
      persianName1: "لیر ترکیه",
      persianName2: "لیر ترکیه",
      code: "TRY",
      command: "/TRY",
      urlName: "try",
    },
    {
      name1: "Japanese Yen",
      name2: "Yen",
      persianName1: "ین ژاپن",
      persianName2: "ین",
      code: "JPY",
      command: "/JPY",
      urlName: "jpy",
    },
    {
      name1: "United Arab Emirates Dirham",
      name2: "Dirham",
      persianName1: "درهم امارات متحده عربی",
      persianName2: "درهم",
      code: "AED",
      command: "/AED",
      urlName: "aed",
    },
    {
      name1: "Tether (USDT)",
      name2: "Tether",
      persianName1: "تتر",
      persianName2: "",
      code: "USDT",
      command: "/USDT",
      urlName: "usd_usdt",
    },
    {
      name1: "Bitcoin (BTC)",
      name2: "Bitcoin",
      persianName1: "بیت‌کوین",
      persianName2: "بیتکوین",
      code: "BTC",
      command: "/BTC",
      urlName: "usd_btc",
    },
  ];
  const currency = currencies.find(
    (currency) =>
      currency.name1.toLowerCase() === input ||
      currency.name2.toLowerCase() === input ||
      currency.persianName2.toLowerCase() === input ||
      currency.persianName1.toLowerCase() === input ||
      currency.command.toLowerCase() === input ||
      currency.code.toLowerCase() === input
  );
  return currency ? currency : null;
};
