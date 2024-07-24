import { MODEL, MONEY } from "@/components/constants/config";
import { formatToCount, parseToMoney } from "@/components/helper/component";

export const ERROR = {
  FIELD: {
    REQUIRED: "This field is required",
    TOO_LONG: `Max character is ${MODEL.STRING.LIMIT.MAX}`,
    MONEY: {
      MIN: `This must be greater than or equal to ${parseToMoney(MONEY.LIMIT.MIN)}`,
      MAX: `This must be less than or equal to ${parseToMoney(MONEY.LIMIT.MAX)}`,
    },
    COUNT: {
      MIN: `This must be greater than or equal to ${formatToCount(MODEL.COUNT.LIMIT.MIN)}`,
      MAX: `This must be less than or equal to ${formatToCount(MODEL.COUNT.LIMIT.MAX)}`,
    },
  },
} as const;
