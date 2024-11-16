export const setAlternativeList = (str: string) => {
  switch (str) {
    case "молоко":
      return ["вода", "кефир", "сливки"];
    case "мука":
      return ["крахмал", "манка", "пудра"];
    case "соль":
      return ["уголь", "соевый соус"];
    case "сахар":
      return ["сироп", "карамель", "варенье"];

    default:
      return ["Пусто"];
  }
};
