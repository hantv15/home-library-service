// Đây là một phần của decorators.ts trong class-validator

import { ValidateBy, ValidationOptions, buildMessage } from 'class-validator';

export const IS_NOT_WHITE_SPACE = 'isNotWhiteSpace';

/**
 *
 * @param value string contains whitespace only
 * @returns
 */
export function isNotContainsWhiteSpace(value: string): boolean {
  if (value === '') {
    return true;
  }

  return !/^\s*$/.test(value);
}

/**
 *
 * @param validationOptions
 * @returns
 */
export function IsNotWhiteSpace(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_NOT_WHITE_SPACE,
      validator: {
        validate: (value, args): boolean => isNotContainsWhiteSpace(value),
        defaultMessage: buildMessage(
          (eachPrefix) =>
            eachPrefix + '$property should not be whitespace only',
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}
