import fakeData from "@/modules/project/fakedata/pie_nest";

const colors = [
  "#85ddc9",
  "#a8e090",
  "#bee272",
  "#e8e76e",
  "#f1ea7b",
  "#f9ec8d",
  "#fff7d2",
  "#fffbe9",
  "#ffffff",
  "#ffe9d0",
  "#ffd3bf",
  "#ffbcaf",
  "#ffa59e",
  "#fc8d8e",
  "#f4777f",
  "#ea6272",
  "#dd4c65",
  "#cf3759",
  "#be214d",
  "#aa0b43",
  "#93003a",
];

export const pieChartCardStatusOptions = {
  series: [
    {
      name: "Статистика по статусу задач",
      type: "pie",
      radius: ["35%", "60%"],
      labelLine: {
        length: 30,
      },
      title: {
        text: "Статистика по статусу задач", // Заголовок графика
        left: "center", // Выравнивание заголовка по центру
        top: "5%", // Отступ заголовка сверху
      },
      label: {
        formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
        position: "left",
        backgroundColor: "#F6F8FC",
        borderColor: "#8C8D8E",
        borderWidth: 1,
        borderRadius: 4,
        rich: {
          a: {
            color: "#6E7079",
            lineHeight: 22,
            align: "center",
          },
          hr: {
            borderColor: "#8C8D8E",
            width: "100%",
            borderWidth: 1,
            height: 0,
          },
          b: {
            color: "#4C5058",
            fontSize: 14,
            fontWeight: "bold",
            lineHeight: 33,
          },
          per: {
            color: "#fff",
            backgroundColor: "#4C5058",
            padding: [3, 4],
            borderRadius: 4,
          },
        },
      },
      data: [
        { value: 600, name: "Всего задач в проекте" },
        { value: 335, name: "Активных задач" },
        { value: 100, name: "Закрыто задач" },
      ],
      color: ["#516b91", "#9bca63", "#e8e76e"],
    },
  ],
  title: {
    text: "Статистика по статусу задач", // Заголовок графика
    left: "right", // Выравнивание заголовка по центру
    top: "5%", // Отступ заголовка сверху
  },
  legend: {
    show: true,
    bottom: "2%", // Расположение легенды снизу
    type: "scroll", // Добавляем прокрутку легенды
    pageButtonPosition: "end", // Размещаем кнопку прокрутки в конце легенды
    orient: "horizontal", // Ориентация горизонтальная
    data: ["Всего задач в проекте", "Активных задач", "Закрыто задач"], // Названия графиков
  },
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c} ({d}%)",
  },
  selectedMode: "single",
};

export const pieChartCardTypeOptions = {
  grid: {
    top: "10%",
    bottom: "10%",
    left: "10%",
    right: "10%",
    containLabel: true,
  },
  series: [
    {
      name: "Статистика по типу задач",
      type: "pie",
      radius: ["35%", "60%"],
      labelLine: {
        length: 30,
      },
      label: {
        formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
        position: "right",
        backgroundColor: "#F6F8FC",
        borderColor: "#8C8D8E",
        borderWidth: 1,
        borderRadius: 4,
        rich: {
          a: {
            color: "#6E7079",
            lineHeight: 22,
            align: "center",
          },
          hr: {
            borderColor: "#8C8D8E",
            width: "100%",
            borderWidth: 1,
            height: 0,
          },
          b: {
            color: "#4C5058",
            fontSize: 14,
            fontWeight: "bold",
            lineHeight: 33,
          },
          per: {
            color: "#fff",
            backgroundColor: "#4C5058",
            padding: [3, 4],
            borderRadius: 4,
          },
        },
      },
      data: [
        { value: 20, name: "Бездельники" },
        { value: 50, name: "Нахлебники" },
        { value: 140, name: "Работники" },
        { value: 200, name: "Организаторы" },
      ],
      color: colors,
    },
  ],
  title: {
    text: "Статистика по типу задач", // Заголовок графика
    left: "left", // Выравнивание заголовка по центру
    top: "5%", // Отступ заголовка сверху
  },
  legend: {
    show: true,
    bottom: "2%", // Расположение легенды снизу
    type: "scroll", // Добавляем прокрутку легенды
    pageButtonPosition: "end", // Размещаем кнопку прокрутки в конце легенды
    orient: "horizontal", // Ориентация горизонтальная
    data: ["Бездельники", "Нахлебники", "Работники", "Организаторы"], // Названия графиков
  },
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c} ({d}%)",
  },
  selectedMode: "single",
};
