// Chat room wallpapers. Everything but "classic" is generated purely with
// CSS gradients (no image assets), layered as background-image so callers
// can keep their own background-color underneath.
const PURPLE = "rgba(122, 61, 219,";
const PURPLE_DEEP = "rgba(74, 0, 224,";

export const WALLPAPERS = [
    {
        id: "classic",
        name: "Classic Doodle",
        image: null, // resolved at render time based on light/dark theme
        size: "auto",
        position: "0 0",
    },
    {
        id: "solid",
        name: "Plain",
        image: "none",
        size: "auto",
        position: "0 0",
    },
    {
        id: "dots",
        name: "Dot Grid",
        image: `radial-gradient(circle at 1px 1px, ${PURPLE}0.35) 1.5px, transparent 1.5px)`,
        size: "26px 26px",
        position: "0 0",
    },
    {
        id: "diagonal",
        name: "Diagonal Lines",
        image: `repeating-linear-gradient(45deg, ${PURPLE}0.18), ${PURPLE}0.18) 2px, transparent 2px, transparent 18px)`,
        size: "auto",
        position: "0 0",
    },
    {
        id: "graph",
        name: "Graph Paper",
        image: `repeating-linear-gradient(0deg, ${PURPLE}0.15), ${PURPLE}0.15) 1px, transparent 1px, transparent 28px), repeating-linear-gradient(90deg, ${PURPLE}0.15), ${PURPLE}0.15) 1px, transparent 1px, transparent 28px)`,
        size: "auto",
        position: "0 0",
    },
    {
        id: "diamonds",
        name: "Diamond Weave",
        image: `repeating-linear-gradient(45deg, ${PURPLE}0.14) 0 2px, transparent 2px 22px), repeating-linear-gradient(-45deg, ${PURPLE}0.14) 0 2px, transparent 2px 22px)`,
        size: "auto",
        position: "0 0",
    },
    {
        id: "chevron",
        name: "Chevron",
        image: `linear-gradient(135deg, ${PURPLE}0.16) 25%, transparent 25%), linear-gradient(225deg, ${PURPLE}0.16) 25%, transparent 25%), linear-gradient(315deg, ${PURPLE}0.16) 25%, transparent 25%), linear-gradient(45deg, ${PURPLE}0.16) 25%, transparent 25%)`,
        size: "40px 40px",
        position: "0 0, 0 0, 20px 0, 20px 0",
    },
    {
        id: "bubbles",
        name: "Bubbles",
        image: `radial-gradient(circle at 20% 30%, ${PURPLE}0.3) 3px, transparent 3px), radial-gradient(circle at 70% 60%, ${PURPLE_DEEP}0.25) 4px, transparent 4px), radial-gradient(circle at 40% 80%, ${PURPLE}0.2) 2px, transparent 2px), radial-gradient(circle at 85% 15%, ${PURPLE_DEEP}0.2) 2.5px, transparent 2.5px)`,
        size: "80px 80px",
        position: "0 0",
    },
    {
        id: "plaid",
        name: "Windowpane Plaid",
        image: `repeating-linear-gradient(0deg, ${PURPLE}0.12) 0 3px, transparent 3px 40px), repeating-linear-gradient(90deg, ${PURPLE}0.12) 0 3px, transparent 3px 40px), repeating-linear-gradient(0deg, ${PURPLE_DEEP}0.08) 0 1px, transparent 1px 20px), repeating-linear-gradient(90deg, ${PURPLE_DEEP}0.08) 0 1px, transparent 1px 20px)`,
        size: "auto",
        position: "0 0",
    },
];

export const DEFAULT_WALLPAPER_ID = "classic";

export const getWallpaper = (id, themeType) => {
    const wallpaper = WALLPAPERS.find((w) => w.id === id) || WALLPAPERS[0];
    if (wallpaper.id === "classic") {
        return {
            ...wallpaper,
            image: `url(${themeType === "light" ? "/lightBg.svg" : "/darkBg.svg"})`,
        };
    }
    return wallpaper;
};
