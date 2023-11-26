import { fakeTagSpData } from "@/modules/project/fakedata/tagSp.js";

// Определение разных цветов для графиков
const colors = ["#516b91", "#9bca63", "#e76e6e"];

export const barChartSpTagsOptions = {
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "value",
    name: "Значение суммы SP",
    nameLocation: "middle",
    nameGap: 10,
    splitLine: { show: false },
  },
  yAxis: {
    type: "category",
    data: fakeTagSpData.yAxis.data,
    name: "Категории",
    axisLabel: {
      interval: 0,
    },
  },
  series: [
    {
      name: "< 30 sp",
      type: "bar",
      stack: "total",
      label: {
        show: true,
      },
      emphasis: {
        focus: "series",
      },
      data: fakeTagSpData.data[0],
      color: colors[0], // Используем первый цвет для первого графика
    },
    {
      name: "30 - 50 sp",
      type: "bar",
      stack: "total",
      label: {
        show: true,
      },
      emphasis: {
        focus: "series",
      },
      data: fakeTagSpData.data[1],
      color: colors[1], // Используем второй цвет для второго графика
    },
    {
      name: "50 - 100 sp",
      type: "bar",
      stack: "total",
      label: {
        show: true,
      },
      emphasis: {
        focus: "series",
      },
      data: fakeTagSpData.data[2],
      color: colors[2], // Используем третий цвет для третьего графика
    },
  ],
  title: {
    text: "График задач по категориям",
    left: "center",
    top: "5%",
  },
};
