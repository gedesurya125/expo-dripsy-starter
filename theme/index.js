import { makeTheme } from "dripsy";

const space = {
  // recommended: set 0 first, then double for consistent nested spacing
  $0: 0,
  $1: 4,
  $2: 8,
  $3: 16,
  $4: 32,
  $5: 64,
  $6: 128,
  $7: 256,
};
const fontSizes = {
  $0: 12,
  $1: 14,
  $2: 16,
  $3: 18,
  $4: 24,
  $5: 28,
  $6: 32,
};

const text = {
  h1: {
    fontSize: "$2", // 16px, from `fontSizes` above
  },
  p: {
    fontSize: "$0", // 12px from `fontSizes`
    mb: "$3", // 16px from `space`
  },
};

const textShadows = {
  onImage: {
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    textShadowColor: "#00000099",
  },
};

const shadows = {
  md: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

const linearGradients = {
  sunny: ["red", "orange"],
};

export const themeDark = makeTheme({
  colors: {
    $text: "#000",
    $background: "#fff",
    $primary: "tomato",
  },
  space,
  fontSizes,
  text,
  textShadows,
  shadows,
  linearGradients,
});

export const themeLight = makeTheme({
  colors: {
    $text: "#000",
    $background: "#fff",
    $primary: "tomato",
  },
  space,
  fontSizes,
  text,
  textShadows,
  shadows,
  linearGradients,
});
