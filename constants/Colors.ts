const Colors = {
    lightGreen: "#d2ebe2",
    darkGreen: "#087c5c",
    lightSuccessGreen: "#e9f9ee",
    successGreen: "#28a745",
    lightFailureRed: "#f8d7da",
    failureRed: "#dc3545",
    white: "#ffffff",
    darkWhite: "#f2f2f2",
    lighterGray: "#f5f5f5",
    lightGray: "#e5e5e5",
    gray: "#9f9f9f",
    darkGray: "#555555",
    transparentBlack: "rgba(0, 0, 0, 0.4)",
    black: "#1a1a1a"
}

export type Color = typeof Colors[keyof typeof Colors]

export default Colors;