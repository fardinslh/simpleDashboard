export const regex = {
  fullPersianPhoneNumber: /^(?:0\d{10}|\+98\d{10}|0098\d{10})$/,
  partialPersianPhoneNumber:
    /^(?:0\d{0,10}|\+(?:9(?:8\d{0,10})?)?|00(?:9(?:8\d{0,10})?)?)?$/,
};
