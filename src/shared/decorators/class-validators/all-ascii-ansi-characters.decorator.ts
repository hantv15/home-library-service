// // Đây là một phần của decorators.ts trong class-validator

// import { ValidateBy, ValidationOptions, buildMessage } from 'class-validator';

// export const IS_NOT_ASCII_ANSI = 'isNotASCIIANSI';

// function isASCII(str: string) {
//   if (!/^[\x00-\xFF]*$/.test(str)) {
//     return false;
//   }
//   return true;
// }
// export function IsNotASCIIANSI(
//   validationOptions?: ValidationOptions,
// ): PropertyDecorator {
//   return ValidateBy(
//     {
//       name: IS_NOT_ASCII_ANSI,
//       validator: {
//         validate: (value, args): boolean => isASCII(value),
//         defaultMessage: buildMessage(
//           (eachPrefix) => eachPrefix + '$property should not be ASCII/ANSI',
//           validationOptions,
//         ),
//       },
//     },
//     validationOptions,
//   );
// }
