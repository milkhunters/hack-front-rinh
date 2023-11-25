export const toSnakeCase = anyToCase(stringToSnakeCase);

export const toCamelCase = anyToCase(stringToCamelCase);

function stringToSnakeCase(x) {
  return x
    .replace(/\W+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join("_");
}

function stringToCamelCase(x) {
  return x
    .split("_")
    .map((word, i) => (i === 0 && word.length >= 1 ? word : word[0].toUpperCase() + word.slice(1)))
    .join("");
}

function objectToCase(x, toCase) {
  const result = Object.entries(x).map(([key, value]) => [toCase(key), anyToCase(toCase)(value)]);
  return Object.fromEntries(result);
}

function anyToCase(toCase) {
  return (x) => {
    if (Array.isArray(x)) return x.map((value) => anyToCase(toCase)(value));
    if (typeof x === "object" && x !== null) return objectToCase(x, toCase);
    return x;
  };
}
