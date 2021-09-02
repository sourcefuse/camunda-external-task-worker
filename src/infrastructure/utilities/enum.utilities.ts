const isEnumName = <T>(
  str: string,
  _enum: T
): str is Extract<keyof T, string> => str in _enum;

export const enumFromName = <T>(name: string, _enum: T) => {
  if (!isEnumName(name, _enum)) {
    throw Error(`Enum value does not exist for ${name}`);
  }
  return _enum[name];
};
