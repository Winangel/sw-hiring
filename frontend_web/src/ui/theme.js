import preset from "@rebass/preset";
export const theme = {
  ...preset,
  fonts: { body: "Inter", heading: "Inter" },
  colors: {
    ...preset.colors,
    primary: "#fd746c",
    lightgrey: "#F0F0F0",
  },
  styles: {
    root: {
      // uses the theme values provided above
      fontFamily: "body",
      fontWeight: "body",
    },
  },
};
