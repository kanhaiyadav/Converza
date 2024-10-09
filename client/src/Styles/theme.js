const commonTheme = {
    fonts: {
        primary: "'Poppins', sans-serif",
        secondary: "Open Sans, sans-serif",
        handwriting1: "Playwrite PE",
        handwriting2: "Playwrite AU TAS",
    },
    fontSizes: {
        xxs: "0.6rem",
        xs: "0.8rem",
        sm: "0.9rem",
        md: "1rem",
        lg: "1.1rem",
        xl: "1.2rem",
        xxl: "1.3rem",
        xxxl: "1.5rem",
    },
    fontWeights: {
        normal: 400,
        medium: 600,
        bold: 700,
        black: 900,
    },
    lineHeights: {
        normal: "normal",
        none: "1",
        shorter: "1.25",
        short: "1.375",
        base: "1.5",
        tall: "1.625",
        taller: "2",
    },
    letterSpacings: {
        normal: "normal",
        caps: "0.2em",
    },
    radii: {
        sm: "5px",
        md: "10px",
        lg: "15px",
        xl: "20px",
        full: "9999px",
        circle: "50%",
    },
    shadows: {
        sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        outline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
        none: "none",
    },
    space: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "32px",
        xl: "64px",
        xxl: "128px",
        xxxl: "256px",
        base: (n = 1) => `${5 * n}px`,
    },
    breakpoints: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1536px",
    },
}

export const lightTheme = {
    ...commonTheme,
    type: "light",
    colors: {
        primary: "#932ef9",
        secondary: "white",
        tertiary: "#f5eefc",
        quaternary: "#f6efff",
        active: '#00984e',
        inactive: '#ff0a0a',
        quinary: "#f5f5f5",
        senary: "#e2e2e2",
        white: "#ffffff",
        black: "#000000",
        error: "#ff0000",
        success: "#00ff00",
        warning: "#ffcc00",
        info: "#00ccff",
        transparent: "transparent",
    },
    textColors: {
        primary: "#2a2a2a",
        secondary: "#ffffff",
        tertiary: "#c7c7c7",
        quaternary: "#ededed",
        quinary: "#f5f5f5",
        senary: "#e2e2e2",
        white: "#ffffff",
        black: "#000000",
        error: "#ff0000",
        success: "#00ff00",
        warning: "#ffcc00",
        info: "#00ccff",
        transparent: "transparent",
    },
    shadows: {
        sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        inner: "inset 0px 0px 5px #ccc",
        outer: "0px 0px 3px rgba(0,0,0,0.6)",
        outline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
        none: "none",
    },
}

export const darkTheme = {
    ...commonTheme,
    type: "dark",
    colors: {
        primary: "#932ef9",
        secondary: "#252532",
        tertiary: "#a04df3",
        quaternary: "#2f3142",
        active: '#00984e',
        inactive: '#ff0a0a',
        quinary: "#8b8b8b",
        senary: "#e2e2e2",
        white: "#ffffff",
        black: "#000000",
        error: "#ff0000",
        success: "#00ff00",
        warning: "#ffcc00",
        info: "#00ccff",
        transparent: "transparent",
    },
    textColors: {
        primary: "#bcbcbc",
        secondary: "#000000",
        tertiary: "#c7c7c7",
        quaternary: "#ededed",
        quinary: "#8b8b8b",
        senary: "#e2e2e2",
        white: "#ffffff",
        black: "#000000",
        error: "#ff0000",
        success: "#00ff00",
        warning: "#ffcc00",
        info: "#00ccff",
        transparent: "transparent",
    },
    shadows: {
        sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        inner: "inset 0px 0px 4px rgb(0,0,0)",
        outer: "0px 0px 4px rgb(0,0,0)",
        outerxl: "0px 0px 10px rgba(0,0,0,0.6)",
        outline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
        none: "none",
    },
}