export type ButtonSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type ButtonShape = "square" | "round";

export const BUTTON_SIZE_TOKENS: Record<
  ButtonSize,
  {
    heightClass: string;
    radiusClass: string;
    textClass: string;
    paddingXClass: string;
  }
> = {
  "2xs": {
    heightClass: "h-[26px]",
    radiusClass: "rounded-small",
    textClass: "label-xlarge",
    paddingXClass: "px-[32px]",
  },
  xs: {
    heightClass: "h-[32px]",
    radiusClass: "rounded-small",
    textClass: "label-large",
    paddingXClass: "px-[32px]",
  },
  sm: {
    heightClass: "h-[36px]",
    radiusClass: "rounded-small",
    textClass: "label-xlarge",
    paddingXClass: "px-[32px]",
  },
  md: {
    heightClass: "h-[40px]",
    radiusClass: "rounded-medium",
    textClass: "label-xlarge",
    paddingXClass: "px-[32px]",
  },
  lg: {
    heightClass: "h-[44px]",
    radiusClass: "rounded-medium",
    textClass: "label-xxxlarge-emphasized",
    paddingXClass: "px-[32px]",
  },
  xl: {
    heightClass: "h-[52px]",
    radiusClass: "rounded-medium",
    textClass: "label-xlarge",
    paddingXClass: "px-[32px]",
  },
  "2xl": {
    heightClass: "h-[60px]",
    radiusClass: "rounded-small",
    textClass: "label-xxxlarge-emphasized",
    paddingXClass: "px-[32px]",
  },
};

export const getButtonRadiusClass = (
  size: ButtonSize,
  shape: ButtonShape,
) => (shape === "round" ? "rounded-full" : BUTTON_SIZE_TOKENS[size].radiusClass);
