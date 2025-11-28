
export enum ZodErrorMessages {
  // Generic
  REQUIRED = "Поле обязательно",
  INVALID_TYPE = "Неверный тип данных",

  // String-specific
  INVALID_STRING = "Неверная строка",
  NONEMPTY = "Не должно быть пустым",
  MIN = "Слишком короткое значение",
  MAX = "Слишком длинное значение",
  REGEX = "Значение не соответствует формату",

  // Number-specific
  INVALID_NUMBER = "Неверное число",
  TOO_SMALL = "Значение слишком маленькое",
  TOO_BIG = "Значение слишком большое",
  INT = "Должно быть целым числом",
  POSITIVE = "Должно быть положительным",
  NONNEGATIVE = "Должно быть неотрицательным",

  // Date/Boolean
  INVALID_DATE = "Неверная дата",
  INVALID_BOOLEAN = "Неверное логическое значение",

  // Common formats
  INVALID_EMAIL = "Неверный email",
  INVALID_URL = "Неверный URL",
  INVALID_UUID = "Неверный UUID",

  // Arrays/Enums
  ARRAY_MIN = "Слишком мало элементов",
  ARRAY_MAX = "Слишком много элементов",
  INVALID_ARRAY_VALUES = "Недопустимые элементы в массиве",
  ENUM = "Недопустимое значение",

  // Custom/refine
  REFINE = "Некорректное значение",
}
